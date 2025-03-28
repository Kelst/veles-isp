'use client';

import { useState, useEffect } from 'react';
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import ContactForm from "../../../../components/admin/ContactForm";

interface Contact {
  _id: string;
  type: 'address' | 'phone' | 'email' | 'social';
  value: string;
  label?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/contacts');
      if (!response.ok) {
        throw new Error('Помилка завантаження контактів');
      }
      const data = await response.json();
      setContacts(data.contacts || []);
      setError(null);
    } catch (err) {
      setError('Не вдалося завантажити контакти. Спробуйте пізніше.');
      console.error('Помилка завантаження контактів:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = () => {
    setCurrentContact(null);
    setIsFormOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setCurrentContact(contact);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentContact(null);
  };

  const handleSubmitForm = async (data: any) => {
    try {
      let response;
      
      if (data._id) {
        // Оновлення контакту
        response = await fetch(`/api/admin/contacts/${data._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        // Створення нового контакту
        response = await fetch('/api/admin/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
      
      if (!response.ok) {
        throw new Error('Помилка збереження контакту');
      }
      
      fetchContacts();
      handleCloseForm();
    } catch (err) {
      console.error('Помилка збереження контакту:', err);
      setError('Не вдалося зберегти контакт. Спробуйте пізніше.');
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!window.confirm('Ви дійсно хочете видалити цей контакт?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Помилка видалення контакту');
      }
      
      fetchContacts();
    } catch (err) {
      console.error('Помилка видалення контакту:', err);
      setError('Не вдалося видалити контакт. Спробуйте пізніше.');
    }
  };

  const getContactTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      'address': 'Адреса',
      'phone': 'Телефон',
      'email': 'Email',
      'social': 'Соц. мережа'
    };
    return types[type] || type;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Управління контактами</h1>
        <Button variant="primary" onClick={handleAddContact}>Додати контакт</Button>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {isFormOpen ? (
        <Card>
          <h2 className="text-xl font-semibold mb-4">
            {currentContact ? 'Редагувати контакт' : 'Додати новий контакт'}
          </h2>
          <ContactForm
            initialData={currentContact || undefined}
            onSubmit={handleSubmitForm}
            onCancel={handleCloseForm}
          />
        </Card>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6">
              <p className="text-gray-500">Завантаження контактів...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="p-6">
              <p className="text-gray-500">Ще немає контактів для відображення.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Тип
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Значення
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Мітка
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Порядок
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дії
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {getContactTypeLabel(contact.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{contact.value}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{contact.label || '—'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{contact.order}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          contact.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {contact.isActive ? 'Активний' : 'Неактивний'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Редагувати
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Видалити
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}