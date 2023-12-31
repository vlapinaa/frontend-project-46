import _ from 'lodash';

const defineValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

// prettier-ignore
const createPlainFormat = (comparing) => {
  const createStringArray = (array, relativePath = '') => array.flatMap((obj) => {
    const path = relativePath ? `${relativePath}.${obj.key}` : obj.key;

    switch (obj.type) {
      case 'deleted':
        return `Property '${path}' was removed`;

      case 'added':
        return `Property '${path}' was added with value: ${defineValue(obj.value)}`;

      case 'changed':
        return `Property '${path}' was updated. From ${defineValue(obj.value1)} to ${defineValue(obj.value2)}`;

      case 'nested':
        return createStringArray(obj.children, path);

      case 'unchanged':
        return [];

      default:
        throw new Error(`Unknow type: '${obj.type}'!`);
    }
  });

  return createStringArray(comparing).join('\n');
};

export default createPlainFormat;
