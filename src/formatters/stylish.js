import { stringifyObject } from '../helpers.js';

const calculateIndent = (level, type) => {
  const space = ' ';
  const indent = space.repeat(level * 4);
  const indentDif = space.repeat(level * 4 - 2);
  const indentForKey = type !== 'unchanged' && type !== 'nested' ? indentDif : indent;
  return indentForKey;
};

const createStylishFormat = (arr, startLevel = 1) => {
  return arr.map((obj) => {
    const { key } = obj;
    const indent = calculateIndent(startLevel, obj.type);
    const level = startLevel;

    switch (obj.type) {
      case 'nested':
        return `${indent}${key}: {\n${createStylishFormat(obj.children, level + 1).join('')}${indent}}\n`;

      case 'deleted':
        return `${indent}- ${key}: ${stringifyObject(obj.value, level + 1)}`;

      case 'added':
        return `${indent}+ ${key}: ${stringifyObject(obj.value, level + 1)}`;

      case 'changed':
        return `${indent}- ${key}: ${stringifyObject(obj.value1, level + 1)}${indent}+ ${key}: ${stringifyObject(obj.value2, level + 1)}`;

      case 'unchanged':
        return `${indent}${key}: ${obj.value}\n`;

      default:
        throw new Error(`Unknow type: '${obj.type}'!`);
    }
  });
};

export default (object) => `{\n${createStylishFormat(object).join('')}}`;
