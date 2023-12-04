import { isObject } from './helpers.js';

const compareObjects = (object1, object2) => {
  const keys = [...Object.keys(object1), ...Object.keys(object2)];
  const keysSortedUniq = [...new Set(keys.toSorted())];

  return keysSortedUniq.map((key) => {
    const hasKeyInObject1 = Object.prototype.hasOwnProperty.call(object1, key);
    const hasKeyInObject2 = Object.prototype.hasOwnProperty.call(object2, key);

    if (isObject(object1[key]) && isObject(object2[key])) {
      return {
        key,
        children: compareObjects(object1[key], object2[key]),
        type: 'nested',
      };
    }

    if (hasKeyInObject1 && !hasKeyInObject2) {
      return { key, value: object1[key], type: 'deleted' };
    }

    if (hasKeyInObject2 && !hasKeyInObject1) {
      return { key, value: object2[key], type: 'added' };
    }

    if (object1[key] === object2[key]) {
      return { key, value: object1[key], type: 'unchanged' };
    }

    return {
      key,
      value1: object1[key],
      value2: object2[key],
      type: 'changed',
    };
  });
};

export default compareObjects;
