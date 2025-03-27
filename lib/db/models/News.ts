import mongoose, { Schema, models, model } from 'mongoose';

export interface INews {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<INews>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: { type: String },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Перевіряємо, чи модель вже існує, щоб уникнути помилок при гарячому перезавантаженні
export const News = models.News || model<INews>('News', newsSchema);