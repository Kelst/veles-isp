import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface NewsFormProps {
  initialData?: {
    _id?: string;
    title: string;
    slug?: string;
    content: string;
    image?: string;
    isPublished: boolean;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    image: initialData?.image || '',
    isPublished: initialData?.isPublished ?? true
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\wа-яіїєґ\s]/gi, '')
        .replace(/\s+/g, '-')
        .replace(/[іїєґ]/g, char => {
          const translitMap: Record<string, string> = {
            'і': 'i',
            'ї': 'yi',
            'є': 'ye',
            'ґ': 'g'
          };
          return translitMap[char] || char;
        })
        .replace(/[а-я]/g, char => {
          const translitMap: Record<string, string> = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e',
            'ж': 'zh', 'з': 'z', 'и': 'y', 'й': 'i', 'к': 'k', 'л': 'l',
            'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's',
            'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
            'ш': 'sh', 'щ': 'sch', 'ь': '', 'ю': 'yu', 'я': 'ya'
          };
          return translitMap[char] || char;
        });
      
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title) {
      newErrors.title = 'Заголовок є обов\'язковим';
    }
    
    if (!formData.content) {
      newErrors.content = 'Зміст є обов\'язковим';
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
        label="Заголовок"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        fullWidth
      />
      
      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <Input
            label="URL (slug)"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="url-novyny"
            fullWidth
          />
        </div>
        <Button 
          type="button" 
          variant="secondary" 
          size="sm"
          onClick={generateSlug}
        >
          Генерувати
        </Button>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Зміст
        </label>
        <textarea
          name="content"
          rows={8}
          value={formData.content}
          onChange={handleChange}
          className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errors.content ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
      </div>
      
      <Input
        label="URL зображення (необов'язково)"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
        fullWidth
      />
      
      <div className="flex items-center">
        <input
          id="isPublished"
          name="isPublished"
          type="checkbox"
          checked={formData.isPublished}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
          Опубліковано
        </label>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Скасувати
        </Button>
        <Button type="submit" variant="primary">
          {initialData?._id ? 'Зберегти зміни' : 'Створити новину'}
        </Button>
      </div>
    </form>
  );
};

export default NewsForm;