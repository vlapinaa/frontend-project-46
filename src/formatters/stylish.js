import { isObject, stringifyObject } from "../helpers.js";

const stylish = (obj, startLevel = 1) => {
  const space = " ";
  let result = "";
  const level = startLevel;
  const indent = space.repeat(level * 4);
  const indentDif = space.repeat(level * 4 - 2);

  Object.keys(obj).map((key) => {
    const val = obj[key];
    let value;
    let value1;
    let value2;

    if (val.type !== "changed" && val.object !== undefined) {
      value = val.object;
    } else if (val.type === "changed") {
      value1 = val.objectFrom;
      value2 = val.objectTo;
    } else {
      value = obj[key];
    }

    let styledValue;

    const indentForKey = val.type !== "unchanged" ? indentDif : indent;

    if (val.option !== undefined && val.type !== "changed") {
      styledValue = isObject(value)
        ? `{\n${stylish(value, level + 1.5)}${indent}}`
        : value;
      result += `${indentForKey}${val.option} ${key}: ${styledValue}\n`;
    } else if (val.type === "changed") {
      result += `${indentForKey}- ${key}: ${
        isObject(value1) ? stringifyObject(value1, level) : value1
      }\n`;
      result += `${indentForKey}+ ${key}: ${
        isObject(value2) ? stringifyObject(value2, level) : value2
      }\n`;
    } else {
      styledValue = isObject(value)
        ? `{\n${stylish(value, level + 1)}${indent}}`
        : value;
      result += `${indentForKey}${key}: ${styledValue}\n`;
    }
    return result;
  });
  return result;
};

export default (object) => `{\n${stylish(object)}\n}`;
