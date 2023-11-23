import { isObject } from "./helpers.js";

const compareObjects = (object1, object2) => {
  const keys = Object.keys(object1).concat(Object.keys(object2));
  const keysSort = keys.sort();
  const comparing = {};

  keysSort.forEach((key) => {
    const existenceInObj1 = Object.prototype.hasOwnProperty.call(object1, key);
    const existenceInObj2 = Object.prototype.hasOwnProperty.call(object2, key);

    if (isObject(object1[key]) && isObject(object2[key])) {
      comparing[key] = {
        object: compareObjects(object1[key], object2[key]),
        type: "unchanged",
      };
      return;
    }

    if (existenceInObj2 && existenceInObj1) {
      if (object1[key] === object2[key]) {
        comparing[key] = { object: object1[key], type: "unchanged" };
      } else {
        comparing[key] = {
          objectFrom: object1[key],
          objectTo: object2[key],
          type: "changed",
          option: "+-",
        };
      }
    } else if (!existenceInObj2 && existenceInObj2) {
      comparing[key] = { object: object1[key], type: "deleted", option: "-" };
    } else if (existenceInObj2 && !existenceInObj1) {
      comparing[key] = { object: object2[key], type: "added", option: "+" };
    }
  });

  return comparing;
};

export default compareObjects;
