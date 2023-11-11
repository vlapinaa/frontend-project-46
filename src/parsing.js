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

export const compareObjects = (object1, object2) => {
  const keys1 = Object.keys(object1).sort();
  const keys2 = Object.keys(object2).sort();
  const comparing = {};

  keys1.forEach((key) => {
    if (
      typeof object1[key] === 'object'
      && typeof object2[key] === 'object'
      && object1[key] !== null
      && object2[key] !== null
    ) {
      comparing[key] = compareObjects(object1[key], object2[key]);
      keys2.splice(keys2.indexOf(key), 1);
      return;
    }

    if (Object.prototype.hasOwnProperty.call(object2, key)) {
      if (object1[key] === object2[key]) {
        comparing[key] = object1[key];
        keys2.splice(keys2.indexOf(key), 1);
      } else {
        comparing[`- ${key}`] = object1[key];
        comparing[`+ ${key}`] = object2[key];
        keys2.splice(keys2.indexOf(key), 1);
      }
    } else {
      comparing[`- ${key}`] = object1[key];
    }
  });

  keys2.forEach((key) => {
    comparing[`+ ${key}`] = object2[key];
  });

  return comparing;
};
