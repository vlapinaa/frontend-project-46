import path from 'node:path';
import { readFileSync } from 'node:fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

export const parseFile = (filepath) => {
  const absolutePath1 = path.resolve(process.cwd(), '__fixtures__', filepath);
  const file = readFileSync(absolutePath1, { encoding: 'utf8' });
  let objFile;
  if (path.extname(filepath) === '.yaml' || path.extname(filepath) === '.yml') {
    objFile = yaml.load(file);
  } else if (path.extname(filepath) === '.json') {
    objFile = JSON.parse(file);
  }

  return objFile;
};

export const compareFiles = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const sortedKeys = keysFile1.sort();

  const keysFile2 = Object.keys(file2);
  const sortedKeys2 = keysFile2.sort();
  const comparing = {};

  sortedKeys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(file2, key)) {
      if (file1[key] === file2[key]) {
        comparing[key] = file1[key];
        sortedKeys2.splice(sortedKeys2.indexOf(key), 1);
      } else {
        const key1 = `- ${key}`;
        const key2 = `+ ${key}`;
        comparing[key1] = file1[key];
        comparing[key2] = file2[key];
        sortedKeys2.splice(sortedKeys2.indexOf(key), 1);
      }
    } else {
      const key1 = `- ${key}`;
      comparing[key1] = file1[key];
    }
  });
  sortedKeys2.forEach((key) => {
    const key2 = `+ ${key}`;
    comparing[key2] = file2[key];
  });

  const arrayComparing = Object.entries(comparing).map((arr) => arr.join(': '));

  const resultString = ['{', ...arrayComparing, '}'].join('\n');
  return resultString;
};
