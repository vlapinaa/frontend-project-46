export const isObject = (value) => {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return true;
  }
  return false;
};

export const createFlatObject = (obj, flat, flatKey) => {
  const keys = Object.keys(obj);
  const newObject = flat;

  keys.forEach((key) => {
    let newKey;

    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (flatKey === undefined) {
        newKey = key;
      } else {
        newKey = `${flatKey}.${key}`;
      }

      const value = obj[key];
      if (isObject(value.object) && value.type === "unchanged") {
        createFlatObject(value.object, newObject, newKey);
      } else {
        newObject[newKey] = value;
      }
    }
  });
  return newObject;
};

export const stringifyObject = (object, level) => {
  const keys = Object.keys(object);
  let value;
  const space = " ";
  const indent = space.repeat(level * 4);
  const indentAdd = space.repeat(4)
  let result = "";

  if (keys.length > 1) {
    keys.forEach((key) => {
      value = object[key];
      const stringValue = isObject(value)
        ? `{\n${stringifyObject(value, level + 1)}${indent}}`
        : value;

      result += `${indent}${key}: ${stringValue}\n`;
    });
  } else {
    value = object[keys];
    const stringValue1 = isObject(value)
      ? `{\n${stringifyObject(value, level + 1)}${indent}}`
      : value;

    result = `{\n${indent}${indentAdd}${keys}: ${stringValue1}\n${indent}}`;
  }

  return result;
};
