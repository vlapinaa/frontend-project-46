export const isObject = (value) => {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return true;
  }
  return false;
};

export const stringifyObject = (object, level) => {
  const keys = Object.keys(object);
  const space = ' ';
  const indent = space.repeat(level * 4);

  return keys.reduce((result, key) => {
    if (isObject(object[key])) {
      return `${result}${indent}${key}: {\n${stringifyObject(
        object[key],
        level + 1,
      )}${indent}}\n`;
    }

    return `${result}${indent}${key}: ${object[key]}\n`;
  }, '');
};
