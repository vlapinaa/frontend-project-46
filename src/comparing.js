import { isObject } from "./helpers.js";

const compareObjects = (object1, object2) => {
  const keys1 = Object.keys(object1).sort();
  const keys2 = Object.keys(object2).sort();
  const comparing = {};

  keys1.forEach((key) => {
    if (isObject(object1[key]) && isObject(object2[key])) {
      comparing[key] = {
        object: compareObjects(object1[key], object2[key]),
        type: "unchanged",
      };
      keys2.splice(keys2.indexOf(key), 1);
      return;
    }

    if (Object.prototype.hasOwnProperty.call(object2, key)) {
      if (object1[key] === object2[key]) {
        comparing[key] = { object: object1[key], type: "unchanged" };
        keys2.splice(keys2.indexOf(key), 1);
      } else {
        comparing[key] = {
          objectFrom: object1[key],
          objectTo: object2[key],
          type: "changed",
          option: "+-",
        };
        keys2.splice(keys2.indexOf(key), 1);
      }
    } else {
      comparing[key] = { object: object1[key], type: "deleted", option: "-" };
    }
  });

  keys2.forEach((key) => {
    comparing[key] = { object: object2[key], type: "added", option: "+" };
  });

  return comparing;
};

export default compareObjects;
