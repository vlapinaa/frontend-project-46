import compareObjects from './comparing.js';
import { parseFile } from './parsing.js';
import selectFormatter from './formatters/index.js';

const calculateDifference = (filepath1, filepath2, type = 'stylish') => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const filesDifferences = compareObjects(file1, file2);
  const formatter = selectFormatter(type);
  return formatter(filesDifferences);
};

export default calculateDifference;
