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
