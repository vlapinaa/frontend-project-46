const flatObject = (obj, target, flatKey) => {
  const keys = Object.keys(obj);
  const result = target;
  keys.forEach((key) => {
    let keySlice;
    let newKey;
    let valueObj = {};

    if (key.startsWith("+") || key.startsWith("-")) {
      keySlice = key.slice(2);
      if (typeof obj[key] === "object") {
        if (key.startsWith("+")) {
          valueObj["+"] = "[complex value]";
        } else {
          valueObj["-"] = "[complex value]";
        }
      } else if (key.startsWith("+")) {
        valueObj["+"] = `'${obj[key]}'`;
      } else {
        valueObj["-"] = `'${obj[key]}'`;
      }

      if (flatKey === undefined) {
        newKey = keySlice;
      } else {
        newKey = `${flatKey}.${keySlice}`;
      }
    } else if (flatKey === undefined) {
      newKey = key;
    } else {
      newKey = `${flatKey}.${key}`;
    }

    const value = obj[key];

    if (key.startsWith("+") || key.startsWith("-")) {
      if (Object.prototype.hasOwnProperty.call(result, newKey)) {
        valueObj = result[newKey];
        if (key.startsWith("+")) {
          valueObj["+"] = `'${obj[key]}'`;
        } else {
          valueObj["-"] = `'${obj[key]}'`;
        }
      }
      result[newKey] = valueObj;
    } else if (typeof value === "object" && value !== null) {
      flatObject(value, result, newKey);
    }
  });
};

const flattening = (obj) => {
  const flat = {};
  flatObject(obj, flat);
  return flat;
};

export default flattening;
