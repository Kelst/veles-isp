/**
 * Форматує дату у локальному форматі
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }
  
  /**
   * Форматує дату і час у локальному форматі
   */
  export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }
  
  /**
   * Обрізає текст до певної довжини
   */
  export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }
  
  /**
   * Генерує slug для URL з тексту
   */
  export function generateSlug(text: string): string {
    return text
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
  }
  
  /**
   * Форматує число як валюту
   */
  export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  
  /**
   * Генерує рандомну строку заданої довжини
   */
  export function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }