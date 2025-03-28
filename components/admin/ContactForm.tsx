import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ContactFormProps {
  initialData?: {
    _id?: string;
    type: 'address' | 'phone' | 'email' | 'social';
    value: string;
    label?: string;
    isActive: boolean;
    order?: number;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    type: initialData?.type || 'phone',
    value: initialData?.value || '',
    label: initialData?.label || '',
    isActive: initialData?.isActive ?? true,
    order: initialData?.order || 0
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.type) {
      newErrors.type = 'Тип контакту є обов\'язковим';
    }
    
    if (!formData.value) {
      newErrors.value = 'Значення контакту є обов\'язковим';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        ...formData,
        ...(initialData?._id ? { _id: initialData._id } : {})
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Тип контакту
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errors.type ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="address">Адреса</option>
          <option value="phone">Телефон</option>
          <option value="email">Email</option>
          <option value="social">Соціальна мережа</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type}</p>
        )}
      </div>
      
      <Input
        label="Значення"
        name="value"
        value={formData.value}
        onChange={handleChange}
        error={errors.value}
        fullWidth
      />
      
      <Input
        label="Мітка (необов'язково)"
        name="label"
        value={formData.label}
        onChange={handleChange}
        fullWidth
      />
      
      <Input
        label="Порядок відображення"
        name="order"
        type="number"
        value={formData.order.toString()}
        onChange={handleChange}
        fullWidth
      />
      
      <div className="flex items-center">
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          checked={formData.isActive}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
          Активний
        </label>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Скасувати
        </Button>
        <Button type="submit" variant="primary">
          {initialData?._id ? 'Зберегти зміни' : 'Створити контакт'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;