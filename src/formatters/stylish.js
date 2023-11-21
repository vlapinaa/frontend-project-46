import { isObject } from "../helpers.js";

const objectToStringIndented = (obj, startLevel = 1) => {
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

    const styledValue = isObject(value)
      ? `{\n${objectToStringIndented(value, level + 1)}${indent}}`
      : value;

    const indentForKey = val.type !== "unchanged" ? indentDif : indent;

    if (val.option !== undefined && val.type !== "changed") {
      result += `${indentForKey}${val.option} ${key}: ${styledValue}\n`;
    } else if (val.type === "changed") {
      result += `${indentForKey}- ${key}: ${JSON.stringify(value1)}\n`;
      result += `${indentForKey}+ ${key}: ${JSON.stringify(value2)}\n`;
    } else {
      result += `${indentForKey}${key}: ${styledValue}\n`;
    }
    return result;
  });
  return result;
};

export default (object) => `{\n${objectToStringIndented(object)}\n}`;
