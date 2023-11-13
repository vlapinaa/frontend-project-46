const objectToStringIndented = (obj, startLevel = 1) => {
  const space = ' ';
  let result = '';
  const level = startLevel;
  const indent = space.repeat(level * 4);
  const indentDif = space.repeat(level * 4 - 2);
  // console.log("level", level, indent);

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    const styledValue = typeof value === 'object' && value !== null
      ? `{\n${objectToStringIndented(value, level + 1)}${indent}}`
      : value;

    const indentForKey = key.startsWith('+') || key.startsWith('-') ? indentDif : indent;
    result += `${indentForKey}${key}: ${styledValue}\n`;
  });

  return result;
};

export default (object) => `{\n${objectToStringIndented(object)}\n}`;
