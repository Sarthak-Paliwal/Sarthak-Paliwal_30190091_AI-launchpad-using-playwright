import fs from 'node:fs';
import path from 'node:path';

export class JsonReader {
  static read<T>(relativePath: string): T {
    const filePath = path.resolve(process.cwd(), relativePath);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
  }
}
