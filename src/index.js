import path from 'node:path';
import { readFileSync } from 'node:fs';
import compareObjects from './comparing.js';
import parseFile from './parsing.js';
import selectFormatter from './formatters/index.js';

const createAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getContent = (filepath) => {
  const content = readFileSync(createAbsolutePath(filepath), { encoding: 'utf8' });
  return parseFile(content, path.extname(filepath));
};

const calculateDifference = (filepath1, filepath2, type = 'stylish') => {
  const content1 = getContent(filepath1);
  const content2 = getContent(filepath2);
  const filesDifferences = compareObjects(content1, content2);
  const formatter = selectFormatter(type);
  return formatter(filesDifferences);
};

export default calculateDifference;
