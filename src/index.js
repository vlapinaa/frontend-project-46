import compareObjects from './comparing.js';
import { readFile } from './parsing.js';
import selectFormatter from './formatters/index.js';

const calculateDifference = (filepath1, filepath2, type = 'stylish') => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);
  const filesDifferences = compareObjects(content1, content2);
  const formatter = selectFormatter(type);
  return formatter(filesDifferences);
};

export default calculateDifference;
