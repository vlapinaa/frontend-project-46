import { isObject, createFlatObject } from "../helpers.js";

const plain = (obj) => {
  const flatObject = createFlatObject(obj, {});
  const keys = Object.keys(flatObject);
  let result = "";

  keys.forEach((path) => {
    let action = "";
    const parameters = flatObject[path];

    const defineValue = (type) => {
      const typeValue = typeof type === "string" ? `'${type}'` : type;
      let resultValue = typeValue;
      if (isObject(type)) {
        resultValue = "[complex value]";
      }
      return resultValue;
    };

    switch (parameters.type) {
      case "deleted":
        action = "removed";
        break;
      case "added":
        action = `added with value: ${defineValue(parameters.object)}`;
        break;
      case "changed":
        action = `updated. From ${defineValue(
          parameters.objectFrom
        )} to ${defineValue(parameters.objectTo)}`;
        break;
      default:
        return;
    }

    result += `Property '${path}' was ${action}\n`;
  });
  return result;
};

export default plain;
