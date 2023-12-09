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

const filePathYml1 = getFixturePath('file1.yml');
const filePathYml2 = getFixturePath('file2.yml');

const filePathJson1 = getFixturePath('file1.yml');
const filePathJson2 = getFixturePath('file2.yml');

test.each([
  {
    filepath1: filePathYml1,
    filepath2: filePathYml2,
    formatter: 'plain',
    expected: expectPlain,
  },
  {
    filepath1: filePathYml1,
    filepath2: filePathYml2,
    formatter: 'stylish',
    expected: expectStylish,
  },
  {
    filepath1: filePathYml1,
    filepath2: filePathYml2,
    expected: expectStylish,
  },
  {
    filepath1: filePathJson1,
    filepath2: filePathJson2,
    formatter: 'stylish',
    expected: expectStylish,
  },
  {
    filepath1: filePathJson1,
    filepath2: filePathJson2,
    expected: expectStylish,
  },
  {
    filepath1: filePathJson1,
    filepath2: filePathJson2,
    formatter: 'plain',
    expected: expectPlain,
  },
])('function testing calculateDifference', ({
  filepath1, filepath2, formatter, expected,
}) => {
  expect(calculateDifference(filepath1, filepath2, formatter)).toBe(expected);
});
