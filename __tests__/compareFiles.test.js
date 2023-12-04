import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import calculateDifference from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectStylish = readFile('resultStylish.txt');
const expectPlain = readFile('resultPlain.txt');

test.each([
  {
    filepath1: '__fixtures__/file1.json',
    filepath2: '__fixtures__/file2.yml',
    formatter: 'plain',
    expected: expectPlain,
  },
  {
    filepath1: '__fixtures__/file1.json',
    filepath2: '__fixtures__/file2.json',
    formatter: 'stylish',
    expected: expectStylish,
  },
])('function testing calculateDifference', ({
 filepath1, filepath2, formatter, expected 
}) => {
  expect(calculateDifference(filepath1, filepath2, formatter)).toBe(expected);
});
