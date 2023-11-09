import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { compareFiles } from '../src/parsing.js';
import result from '../__fixtures__/compareFiles.expect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const file1Read = readFile('file1.json');
const file1 = JSON.parse(file1Read);
const file2Read = readFile('file2.json');
const file2 = JSON.parse(file2Read);

test('compare files', () => {
  expect(compareFiles(file1, file2)).toBe(result);
});
