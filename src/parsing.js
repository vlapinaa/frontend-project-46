import path from 'node:path';
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import { Error } from 'node:console';

export const createAbsolutePath = (filepath) => {
  return path.resolve(process.cwd(), filepath);
};

export const parseFile = (filepath) => {
  const file = readFileSync(createAbsolutePath(filepath), { encoding: 'utf8' });
  if (path.extname(filepath) === '.yaml' || path.extname(filepath) === '.yml') {
    return yaml.load(file);
  }
  if (path.extname(filepath) === '.json') {
    return JSON.parse(file);
  }
  return new Error(['Error format']);
};
