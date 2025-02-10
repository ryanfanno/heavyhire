import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Ensure directory exists
const dataDir = path.join(process.cwd(), 'public/data');
fs.mkdirSync(dataDir, { recursive: true });

// Convert cities CSV to JSON
const citiesCsvPath = path.join(process.cwd(), 'cities.csv');
const citiesJsonPath = path.join(dataDir, 'cities.json');

const citiesCsv = fs.readFileSync(citiesCsvPath, 'utf-8');
const cities = parse(citiesCsv, {
  columns: true,
  skip_empty_lines: true
});

// Write cities JSON
fs.writeFileSync(citiesJsonPath, JSON.stringify(cities, null, 2));

// Convert keywords CSV to JSON
const keywordsCsvPath = path.join(process.cwd(), 'keywords.csv');
const keywordsJsonPath = path.join(dataDir, 'keywords.json');

const keywordsCsv = fs.readFileSync(keywordsCsvPath, 'utf-8');

// Create a Map to store unique keywords
const uniqueKeywords = new Map();

keywordsCsv
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .forEach(term => {
    const normalizedTerm = term.toLowerCase();
    // Only add if we haven't seen this term before
    if (!uniqueKeywords.has(normalizedTerm)) {
      uniqueKeywords.set(normalizedTerm, {
        id: normalizedTerm.replace(/\s+/g, '-'),
        term: `${term} hire`,
        category: 'Equipment',
        type: 'Service'
      });
    }
  });

const keywords = Array.from(uniqueKeywords.values());

// Write keywords JSON
fs.writeFileSync(keywordsJsonPath, JSON.stringify(keywords, null, 2));

// Log some stats
console.log('CSV files successfully converted to JSON');
console.log(`Cities JSON written to: ${citiesJsonPath}`);
console.log(`Keywords JSON written to: ${keywordsJsonPath}`);
console.log(`Total unique keywords: ${keywords.length}`); 