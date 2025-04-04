import mongoose, { Schema, models, model } from 'mongoose';

export interface ISetting {
  _id?: string;
  key: string;
  value: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const settingSchema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

// Перевіряємо, чи модель вже існує, щоб уникнути помилок при гарячому перезавантаженні
export const Setting = models.Setting || model<ISetting>('Setting', settingSchema);