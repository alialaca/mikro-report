import fs from 'fs';
import path from 'path';

export const loadSqlQuery = (fileName: string): string => {
  const filePath = path.join(__dirname, '..', 'queries', `${fileName}.sql`);
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    throw new Error(`SQL dosyası okunamadı: ${fileName}.sql`);
  }
}; 