const calculateIndent = (level, type) => {
  const space = ' ';
  const indent = space.repeat(level * 4);
  const indentDif = space.repeat(level * 4 - 2);
  const indentForKey = type !== 'unchanged' && type !== 'nested' ? indentDif : indent;
  return indentForKey;
};

const stringifyObject = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const space = ' ';
  const indent = space.repeat(depth * 4);
  const string = Object.keys(value).map((key) => {
    return `${indent}${key}: ${stringifyObject(value[key], depth + 1)}`;
  });
  return ['{', ...string, `${space.repeat((depth - 1) * 4)}}`].join('\n');
};
// prettier-ignore
const createStylishFormat = (arr, level = 1) => arr.map((obj) => {
  const { key } = obj;
  const indent = calculateIndent(level, obj.type);

  switch (obj.type) {
    case 'nested':
      return `${indent}${key}: {\n${createStylishFormat(obj.children, level + 1).join('\n')}\n${indent}}`;

    case 'deleted':
      return `${indent}- ${key}: ${stringifyObject(obj.value, level + 1)}`;

    case 'added':
      return `${indent}+ ${key}: ${stringifyObject(obj.value, level + 1)}`;

    case 'changed':
      return `${indent}- ${key}: ${stringifyObject(obj.value1, level + 1)}\n${indent}+ ${key}: ${stringifyObject(obj.value2, level + 1)}`;

    case 'unchanged':
      return `${indent}${key}: ${obj.value}`;

    default:
      throw new Error(`Unknow type: '${obj.type}'!`);
  }
});

export default (object) => `{\n${createStylishFormat(object).join('\n')}\n}`;
