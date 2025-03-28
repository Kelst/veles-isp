import mongoose, { Schema, models, model } from 'mongoose';

export interface ITariff {
  _id?: string;
  name: string;
  description: string;
  price: number;
  speed: string;
  features: string[];
  isActive: boolean;
  category: 'home' | 'business'; // Нове поле
  createdAt: Date;
  updatedAt: Date;
}

const tariffSchema = new Schema<ITariff>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    speed: { type: String, required: true },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
    category: { type: String, enum: ['home', 'business'], default: 'home' }, // Додаємо поле категорії
  },
  {
    timestamps: true,
  }
);

// Перевіряємо, чи модель вже існує, щоб уникнути помилок при гарячому перезавантаженні
export const Tariff = models.Tariff || model<ITariff>('Tariff', tariffSchema);