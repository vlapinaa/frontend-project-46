import path from 'node:path';
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

export const createAbsolutePath = (filepath) => {
  return path.resolve(process.cwd(), filepath);
};

export const parseFile = (filepath) => {
  const file = readFileSync(createAbsolutePath(filepath), { encoding: 'utf8' });
  let objFile;
  if (path.extname(filepath) === '.yaml' || path.extname(filepath) === '.yml') {
    objFile = yaml.load(file);
  } else if (path.extname(filepath) === '.json') {
    objFile = JSON.parse(file);
  }

  return objFile;
};
