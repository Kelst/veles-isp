import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://veles.cv.ua';
  
  // Core pages
  const staticPages = [
    '',
    '/about',
    '/tariffs',
    '/services',
    '/payments',
    '/contacts',
    '/abonent',
    '/optimization',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
  
  
  
  
  return [...staticPages];
}