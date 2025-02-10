import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

interface City {
  City: string;
  State: string;
  Region: string;
}

interface Keyword {
  Term: string;
  Category: string;
  Type: string;
}

const BASE_URL = 'https://heavyhire.com.au'; // Update this to your domain

async function generateSitemap() {
  // Read cities and keywords
  const citiesCsv = fs.readFileSync(path.join(process.cwd(), 'cities.csv'), 'utf-8');
  const keywordsCsv = fs.readFileSync(path.join(process.cwd(), 'keywords.csv'), 'utf-8');

  const cities = parse(citiesCsv, {
    columns: true,
    skip_empty_lines: true
  }) as City[];

  const keywords = parse(keywordsCsv, {
    columns: true,
    skip_empty_lines: true
  }) as Keyword[];

  // Start XML string
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${BASE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/cities</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}/categories</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- City Pages -->
  ${cities.map(city => `
  <url>
    <loc>${BASE_URL}/cities/${encodeURIComponent(city.City.toLowerCase())}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}

  <!-- Search Pages -->
  ${cities.map(city => 
    keywords.map(keyword => `
  <url>
    <loc>${BASE_URL}/search/${encodeURIComponent(city.City.toLowerCase())}/${encodeURIComponent(keyword.Term.toLowerCase())}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('')
  ).join('')}
</urlset>`;

  // Write sitemap to public directory
  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error); 