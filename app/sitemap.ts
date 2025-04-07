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
    '/news',
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
  
  // Fetch dynamic news pages
  const newsResponse = await fetch(`${baseUrl}/api/public/news`);
  let newsPages: MetadataRoute.Sitemap = [];
  
  if (newsResponse.ok) {
    const newsData = await newsResponse.json();
    newsPages = (newsData.news || []).map((news: any) => ({
      url: `${baseUrl}/news/${news.slug}`,
      lastModified: new Date(news.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  }
  
  return [...staticPages, ...newsPages];
}