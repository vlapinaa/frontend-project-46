import { isObject, stringifyObject } from '../helpers.js';

const createStylishFormat = (arr, startLevel = 1) => {
  const space = ' ';
  const level = startLevel;
  const indent = space.repeat(level * 4);
  const indentDif = space.repeat(level * 4 - 2);

  return arr.reduce((result, obj) => {
    const { key } = obj;
    const type = obj.type !== 'unchanged' && obj.type !== 'object';
    const indentForKey = type ? indentDif : indent;

    if (obj.type === 'object') {
      return `${result}${indentForKey}${key}: {\n${createStylishFormat(
        obj.value,
        level + 1
      )}${indent}}\n`;
    }
    if (obj.type === 'deleted') {
      return `${result}${indentForKey}- ${key}: ${
        isObject(obj.value)
          ? `{\n${stringifyObject(obj.value, level + 1)}${indentForKey}  }`
          : obj.value
      }\n`;
    }
    if (obj.type === 'added') {
      return `${result}${indentForKey}+ ${key}: ${
        isObject(obj.value)
          ? `{\n${stringifyObject(obj.value, level + 1)}${indentForKey}  }`
          : obj.value
      }\n`;
    }
    if (obj.type === 'changed') {
      return `${result}${indentForKey}- ${key}: ${
        isObject(obj.valueFrom)
          ? `{\n${stringifyObject(obj.valueFrom, level + 1)}${indentForKey}  }`
          : obj.valueFrom
      }\n${indentForKey}+ ${key}: ${
        isObject(obj.valueTo)
          ? `{\n${stringifyObject(obj.valueTo, level + 1)}${indentForKey}  }`
          : obj.valueTo
      }\n`;
    }
    if (obj.type === 'unchanged') {
      return `${result}${indentForKey}${key}: ${obj.value}\n`;
    }

    return result;
  }, '');
};

export default (object) => `{\n${createStylishFormat(object)}}`;
