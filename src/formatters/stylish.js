import _ from 'lodash';

const calculateIndent = (level, type) => {
  const space = ' ';
  const indent = space.repeat(level * 4);
  const indentDif = space.repeat(level * 4 - 2);
  const indentForKey = type !== 'unchanged' && type !== 'nested' ? indentDif : indent;
  return indentForKey;
};

const stringifyObject = (value, level) => {
  if (!_.isObject(value)) {
    return `${value}\n`;
  }

  const keys = Object.keys(value);
  const space = ' ';
  const indent = space.repeat(level * 4);

  const string = keys.reduce((result, key) => {
    if (_.isObject(value[key])) {
      return `${result}${indent}${key}: ${stringifyObject(value[key], level + 1)}`;
    }

    return `${result}${indent}${key}: ${value[key]}\n`;
  }, '');

  return `{\n${string}${space.repeat((level - 1) * 4)}}\n`;
};
// prettier-ignore
const createStylishFormat = (arr, level = 1) => arr.map((obj) => {
  const { key } = obj;
  const indent = calculateIndent(level, obj.type);

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

export default (object) => `{\n${createStylishFormat(object).join('')}}`;
