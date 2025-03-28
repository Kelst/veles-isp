import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface TariffFormProps {
  initialData?: {
    _id?: string;
    name: string;
    description: string;
    price: number;
    speed: string;
    features: string[];
    isActive: boolean;
    category?: 'home' | 'business';
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const TariffForm: React.FC<TariffFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    speed: initialData?.speed || '',
    features: initialData?.features || [''],
    isActive: initialData?.isActive ?? true,
    category: initialData?.category || 'home'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name) {
      newErrors.name = 'Назва тарифу є обов\'язковою';
    }
    
    if (!formData.description) {
      newErrors.description = 'Опис тарифу є обов\'язковим';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Вартість має бути більше нуля';
    }
    
    if (!formData.speed) {
      newErrors.speed = 'Швидкість інтернету є обов\'язковою';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const cleanedFeatures = formData.features.filter(f => f.trim() !== '');
      
      onSubmit({
        ...formData,
        features: cleanedFeatures,
        ...(initialData?._id ? { _id: initialData._id } : {})
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Назва тарифу"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        fullWidth
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Опис
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Категорія тарифу
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
        >
          <option value="home">Для дому</option>
          <option value="business">Для бізнесу</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Вартість (грн/міс)"
          name="price"
          type="number"
          value={formData.price.toString()}
          onChange={handleChange}
          error={errors.price}
          fullWidth
        />
        
        <Input
          label="Швидкість"
          name="speed"
          value={formData.speed}
          onChange={handleChange}
          error={errors.speed}
          placeholder="100 Мбіт/с"
          fullWidth
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Особливості тарифу
        </label>
        
        {formData.features.map((feature, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              placeholder={`Особливість ${index + 1}`}
              fullWidth
            />
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addFeature}
          className="mt-2"
        >
          Додати особливість
        </Button>
      </div>
      
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
          {initialData?._id ? 'Зберегти зміни' : 'Створити тариф'}
        </Button>
      </div>
    </form>
  );
};

export default TariffForm;