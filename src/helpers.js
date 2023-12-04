export const isObject = (value) => {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return true;
  }
  return false;
};

export const stringifyObject = (value, level) => {
  if (!isObject(value)) {
    return `${value}\n`;
  }

  const keys = Object.keys(value);
  const space = ' ';
  const indent = space.repeat(level * 4);

  const string = keys.reduce((result, key) => {
    if (isObject(value[key])) {
      return `${result}${indent}${key}: ${stringifyObject(value[key], level + 1)}`;
    }

    return `${result}${indent}${key}: ${value[key]}\n`;
  }, '');

  return `{\n${string}${space.repeat((level - 1) * 4)}}\n`;
};
