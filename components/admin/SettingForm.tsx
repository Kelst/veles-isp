import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface SettingFormProps {
  initialData?: {
    _id?: string;
    key: string;
    value: string;
    description?: string;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const SettingForm: React.FC<SettingFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    key: initialData?.key || '',
    value: initialData?.value || '',
    description: initialData?.description || ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Очищаємо помилку поля при редагуванні
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.key) {
      newErrors.key = 'Ключ налаштування є обов\'язковим';
    }
    
    if (!formData.value) {
      newErrors.value = 'Значення налаштування є обов\'язковим';
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
      <Input
        label="Ключ налаштування"
        name="key"
        value={formData.key}
        onChange={handleChange}
        error={errors.key}
        fullWidth
        readOnly={!!initialData?._id} // Робимо ключ тільки для читання при редагуванні
      />
      
      <Input
        label="Значення"
        name="value"
        value={formData.value}
        onChange={handleChange}
        error={errors.value}
        fullWidth
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Опис (необов'язково)
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Скасувати
        </Button>
        <Button type="submit" variant="primary">
          {initialData?._id ? 'Зберегти зміни' : 'Створити налаштування'}
        </Button>
      </div>
    </form>
  );
};

export default SettingForm;