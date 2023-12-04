import path from 'node:path';
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

export const createAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

export const parseFile = (content, extention) => {
  switch (extention) {
    case '.yaml':
    case '.yml':
      return yaml.load(content);
    case '.json':
      return JSON.parse(content);
    default:
      throw new Error(`Wrong extention: '${extention}'!`);
  }
};

export const readFile = (filepath) => {
  const content = readFileSync(createAbsolutePath(filepath), { encoding: 'utf8' });
  return parseFile(content, path.extname(filepath));
};
