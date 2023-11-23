import { isObject } from "./helpers.js";

const compareObjects = (object1, object2) => {
  const keys = [...Object.keys(object1), ...Object.keys(object2)];
  const keysSorted = keys.sort();
  const comparing = {};

  keysSorted.forEach((key) => {
    const hasKeyInObject1 = Object.prototype.hasOwnProperty.call(object1, key);
    const hasKeyInObject2 = Object.prototype.hasOwnProperty.call(object2, key);

    if (Object.prototype.hasOwnProperty.call(comparing, key)) {
      return;
    }

    if (isObject(object1[key]) && isObject(object2[key])) {
      comparing[key] = {
        object: compareObjects(object1[key], object2[key]),
        type: "unchanged",
      };
      return;
    }

    if (hasKeyInObject2 && hasKeyInObject1) {
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
    } else if (hasKeyInObject1) {
      comparing[key] = { object: object1[key], type: "deleted", option: "-" };
    } else if (hasKeyInObject2) {
      comparing[key] = { object: object2[key], type: "added", option: "+" };
    }
  });

  return comparing;
};

export default compareObjects;
