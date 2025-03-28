// scripts/seed.js - скрипт для заповнення бази даних початковими даними
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Конфігурація підключення до MongoDB
const MONGODB_URI = 'mongodb://mongoAdmin:45199trv@194.8.147.138:27017/mydatabase?authSource=admin';
const DB_NAME = 'veles';

async function seed() {
  try {
    // Підключення до бази даних
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB підключено успішно!');
    
    // Вибір бази даних
    mongoose.connection.useDb(DB_NAME);
    
    // Визначення схем і моделей (дублювання, оскільки не можемо імпортувати TS файли)
    // Тарифи
    const tariffSchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        speed: { type: String, required: true },
        features: [{ type: String }],
        isActive: { type: Boolean, default: true },
      },
      { timestamps: true }
    );
    const Tariff = mongoose.model('Tariff', tariffSchema);
    
    // Новини
    const newsSchema = new mongoose.Schema(
      {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        image: { type: String },
        isPublished: { type: Boolean, default: true },
      },
      { timestamps: true }
    );
    const News = mongoose.model('News', newsSchema);
    
    // Контакти
    const contactSchema = new mongoose.Schema(
      {
        type: { 
          type: String, 
          required: true, 
          enum: ['address', 'phone', 'email', 'social'] 
        },
        value: { type: String, required: true },
        label: { type: String },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
      },
      { timestamps: true }
    );
    const Contact = mongoose.model('Contact', contactSchema);
    
    // Користувачі
    const userSchema = new mongoose.Schema(
      {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { 
          type: String, 
          enum: ['admin', 'editor'], 
          default: 'editor' 
        },
        isActive: { type: Boolean, default: true },
      },
      { timestamps: true }
    );
    const User = mongoose.model('User', userSchema);
    
    // Очищення колекцій перед заповненням
    await Tariff.deleteMany({});
    await News.deleteMany({});
    await Contact.deleteMany({});
    
    // Заповнення тарифів
    const tariffs = [
      {
        name: 'Стандарт',
        description: 'Базовий тариф для стабільного інтернету',
        price: 200,
        speed: '100/100 Мбіт/с',
        features: ['Необмежений трафік', 'Цілодобова технічна підтримка', 'Безкоштовне підключення'],
        isActive: true
      },
      {
        name: 'Турбо',
        description: 'Високошвидкісний інтернет для активних користувачів',
        price: 240,
        speed: '300/300 Мбіт/с',
        features: ['Необмежений трафік', 'Цілодобова технічна підтримка', 'Безкоштовне підключення', 'Пріоритетна підтримка'],
        isActive: true
      },
      {
        name: 'Люкс',
        description: 'Преміальний тариф з високою швидкістю',
        price: 270,
        speed: '500/500 Мбіт/с',
        features: ['Необмежений трафік', 'Цілодобова технічна підтримка', 'Безкоштовне підключення', 'VIP підтримка', 'Статична IP-адреса'],
        isActive: true
      },
      {
        name: 'Преміум',
        description: 'Максимальна швидкість для найвимогливіших користувачів та бізнесу',
        price: 400,
        speed: '1/1 Гбіт/с',
        features: ['Необмежений трафік', 'Цілодобова технічна підтримка', 'Безкоштовне підключення', 'VIP підтримка', 'Статична IP-адреса', 'Пріоритетний трафік'],
        isActive: true
      }
    ];
    
    await Tariff.insertMany(tariffs);
    console.log('Тарифи створено!');
    
    // Заповнення новин
    const news = [
      {
        title: 'Зміна тарифів з 01.03.2025',
        slug: 'zmina-taryfiv-01-03-2025',
        content: 'Шановні абонети ТОВ «Велес ІСП» !\n\nІнформуємо Вас, що з метою покращення та підтримки на належному рівні якості послуг доступу до всесвітньої мережі Інтернет, з 01.03.2025р. відбудеться зміна тарифів, що наведені нижче.\n\nДетальнішу інформацію можна отримати на нашому сайті у розділі "Тарифи" або зателефонувавши до служби підтримки.',
        isPublished: true
      },
      {
        title: 'Перехід на нові тарифи з 01.11.2024',
        slug: 'perehid-na-novi-taryfy-01-11-2024',
        content: 'Шановні абонети ТОВ «Велес ІСП» !\n\nІнформуємо Вас, що з метою покращення та підтримки на належному рівні якості послуг доступу до всесвітньої мережі Інтернет, з 01.11.2024р. відбудеться перехід на нові тарифи, що наведені нижче.\n\nДетальнішу інформацію можна отримати на нашому сайті у розділі "Тарифи" або зателефонувавши до служби підтримки.',
        isPublished: true
      },
      {
        title: 'До уваги абонентам! Надаємо зв\'язок!',
        slug: 'do-uvagy-abonentam-nadaemo-zvyazok',
        content: 'До уваги абонентам! Надаємо зв\'язок!\n\nІнтернет сервіс провайдер Велес надає доступ до мережі Інтернет усім абонентам, в яких по різних причинах не було можливості вчасно здійснити оплату.\n\nЗберігаємо спокій!\n\nПо питанням, просимо звертатися за номерами: +38 (097) 22 44 227, +38 (099) 22 44 227',
        isPublished: true
      },
      {
        title: 'Тепер ми і в районі Південно-Кільцевої',
        slug: 'teper-my-i-v-rajoni-pivdenno-kiltsevoi',
        content: 'Тепер ми і в районі Південно-Кільцевої\n\nРаді повідомити, що наша мережа розширилася. Тепер Ви можете отримати швидкісний інтернет від інтернет провайдера "Veles" в районі Південно-Кільцевої. За детальнішою інформацією перегляньте карту підключень, або зв\'яжіться з нами.',
        isPublished: true
      },
      {
        title: 'Розширено спектр можливих варіантів оплати послуг',
        slug: 'rozshyreno-spektr-variantiv-oplaty',
        content: 'Розширено спектр можливих варіантів оплати послуг\n\nМи розуміємо, що Ваш час дуже важливий, тому тепер Ви можете розрахуватися за послуги інтернету в будь-якому терміналі "ПриватБанку" або City24.',
        isPublished: true
      }
    ];
    
    await News.insertMany(news);
    console.log('Новини створено!');
    
    // Заповнення контактів
    const contacts = [
      {
        type: 'address',
        value: 'м. Чернівці, вул. Пилипа Орлика 9А',
        label: 'Головний офіс',
        isActive: true,
        order: 1
      },
      {
        type: 'phone',
        value: '+38 (099) 22 44 227',
        label: 'Телефон підтримки',
        isActive: true,
        order: 2
      },
      {
        type: 'phone',
        value: '+38 (097) 22 44 227',
        label: 'Телефон підтримки',
        isActive: true,
        order: 3
      },
      {
        type: 'email',
        value: 'veles.cv@gmail.com',
        label: 'Електронна пошта',
        isActive: true,
        order: 4
      }
    ];
    
    await Contact.insertMany(contacts);
    console.log('Контакти створено!');
    
    // Створення адміністративного користувача
    const existingAdmin = await User.findOne({ username: 'admin' });
    
    if (!existingAdmin) {
      // Хешування пароля
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const admin = new User({
        username: 'admin',
        email: 'admin@veles.example.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });
      
      await admin.save();
      console.log('Адміністратора створено!');
    }
    
    console.log('База даних успішно заповнена!');
  } catch (error) {
    console.error('Помилка під час заповнення бази даних:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Відключено від MongoDB');
  }
}

seed();