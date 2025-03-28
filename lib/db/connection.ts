import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongoAdmin:45199trv@194.8.147.138:27017/mydatabase?authSource=admin';
const DB_NAME = process.env.DB_NAME || 'veles';

// Оголошення типу для глобального об'єкта
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

// Глобальна змінна для кешування підключення
const cached = global.mongoose || { conn: null, promise: null };

// Зберігаємо підключення в глобальному об'єкті
if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect() {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    cached.conn = await cached.promise;
    console.log('MongoDB підключено успішно!');
    
    // Явно вказуємо, яку базу даних використовувати
    mongoose.connection.useDb(DB_NAME);
    
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('Помилка підключення до MongoDB:', error);
    throw error;
  }
}

export default dbConnect;