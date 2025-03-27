import mongoose, { Schema, models, model } from 'mongoose';

export interface IContact {
  _id?: string;
  type: 'address' | 'phone' | 'email' | 'social';
  value: string;
  label?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
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
  {
    timestamps: true,
  }
);

// Перевіряємо, чи модель вже існує, щоб уникнути помилок при гарячому перезавантаженні
export const Contact = models.Contact || model<IContact>('Contact', contactSchema);