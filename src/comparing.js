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
        value: compareObjects(object1[key], object2[key]),
        type: 'object',
      };
    }

    if (hasKeyInObject2 && hasKeyInObject1) {
      if (object1[key] === object2[key]) {
        return { key, value: object1[key], type: 'unchanged' };
      }
      return {
        key,
        valueFrom: object1[key],
        valueTo: object2[key],
        type: 'changed',
      };
    }

    if (hasKeyInObject1) {
      return { key, value: object1[key], type: 'deleted' };
    }

    if (hasKeyInObject2) {
      return { key, value: object2[key], type: 'added' };
    }

    return {};
  });
};

export default compareObjects;
