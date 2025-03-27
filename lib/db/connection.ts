import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://mongoAdmin:45199trv@194.8.147.138:27017/mydatabase?authSource=admin';
const DB_NAME = 'veles';

// Глобальна змінна для кешування підключення
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
    console.log('MongoDB підключено успішно!');
  } catch (e) {
    cached.promise = null;
    console.error('Помилка підключення до MongoDB:', e);
    throw e;
  }

  // Явно вказуємо, яку базу даних використовувати
  const db = mongoose.connection.useDb(DB_NAME);
  
  return cached.conn;
}

export default dbConnect;