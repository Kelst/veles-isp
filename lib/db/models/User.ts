import mongoose, { Schema, models, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'editor';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
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
  {
    timestamps: true,
  }
);

// Хешування пароля перед збереженням
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Метод для порівняння паролів
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Перевіряємо, чи модель вже існує, щоб уникнути помилок при гарячому перезавантаженні
export const User = models.User || model<IUser>('User', userSchema);