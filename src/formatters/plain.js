import flattening from "../helpers.js";

const plain = (obj) => {
  const flatObject = flattening(obj);
  const keys = Object.keys(flatObject);
  let result = "";

  keys.forEach((path) => {
    let action = "";
    const value = flatObject[path];
    if (
      Object.prototype.hasOwnProperty.call(value, "-") &&
      Object.prototype.hasOwnProperty.call(value, "+")
    ) {
      action = `updated. From ${value["-"]} to ${value["+"]}`;
    } else if (Object.prototype.hasOwnProperty.call(value, "-")) {
      action = `removed`;
    } else if (Object.prototype.hasOwnProperty.call(value, "+")) {
      action = `added with value: ${value["+"]}`;
    }

    result += `Property '${path}' was ${action}\n`;
  });
  return result;
};

export default plain;
