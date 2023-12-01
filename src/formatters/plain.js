import { isObject } from '../helpers.js';

const createPlainFormat = (array) => {
  const createLine = (object, relativePath = '') => {
    const path = relativePath ? `${relativePath}.${object.key}` : object.key;

    const defineValue = (type) => {
      if (isObject(type)) {
        return '[complex value]';
      }
      return typeof type === 'string' ? `'${type}'` : type;
    };

    switch (object.type) {
      case 'deleted':
        return `Property '${path}' was removed`;

      case 'added':
        return `Property '${path}' was added with value: ${defineValue(
          object.value
        )}`;

      case 'changed':
        return `Property '${path}' was updated. From ${defineValue(
          object.valueFrom
        )} to ${defineValue(object.valueTo)}`;
      default:
        return '';
    }
  };

  const createPath = (object, relativePath = '') => {
    if (object.type === 'object') {
      return object.value.reduce((acc, objectChild) => {
        return [
          ...acc,
          ...createPath(
            objectChild,
            relativePath ? `${relativePath}.${object.key}` : object.key
          ),
        ];
      }, []);
    }

    const line = createLine(object, relativePath);
    return line.length === 0 ? [] : [line];
  };

  return array
    .reduce((result, object) => {
      return [...result, ...createPath(object, '')];
    }, [])
    .join(`\n`);
};

export default createPlainFormat;
