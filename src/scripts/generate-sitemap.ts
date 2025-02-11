import { writeFileSync } from 'fs';
import { getCities, getKeywords } from '../utils/data';
import { formatCityName } from '../utils/format';

const BASE_URL = 'https://heavyhireaustralia.com';

async function generateSitemapAndRobots() {
  const [cities, keywords] = await Promise.all([getCities(), getKeywords()]);

  // Generate sitemap.xml
  const staticPaths = [
    '',
    '/cities',
    '/about-us',
    '/contact',
  ];

  const cityPaths = cities.map(city => `/cities/${formatCityName(city.City).toLowerCase()}`);
  const locationPaths = cities.map(city => `/location/${formatCityName(city.City).toLowerCase()}`);

  const searchPaths = cities.flatMap(city => 
    keywords.map(keyword => 
      `/search/${formatCityName(city.City).toLowerCase()}/${encodeURIComponent(keyword.term.toLowerCase())}`
    )
  );

  const allPaths = [...staticPaths, ...cityPaths, ...locationPaths, ...searchPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths.map(path => `
    <url>
      <loc>${BASE_URL}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${path.startsWith('/search/') ? 'weekly' : 'daily'}</changefreq>
      <priority>${getPriority(path)}</priority>
    </url>
  `).join('')}
</urlset>`;

  // Generate robots.txt
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow paths
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow specific paths
Allow: /cities
Allow: /search/
Allow: /about-us
Allow: /contact
`;

  // Write files
  writeFileSync('public/sitemap.xml', sitemap);
  writeFileSync('public/robots.txt', robotsTxt);
  
  console.log('Sitemap generated successfully!');
  console.log(`Total URLs generated: ${allPaths.length}`);
  console.log('Robots.txt generated successfully!');
}

function getPriority(path: string): string {
  if (path === '') return '1.0';
  if (path === '/cities') return '0.9';
  if (path.startsWith('/cities/')) return '0.8';
  if (path.startsWith('/search/')) return '0.7';
  return '0.5';
}

generateSitemapAndRobots().catch(console.error); 