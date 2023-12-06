import _ from 'lodash';

const compareObjects = (object1, object2) => {
  const keys = [...Object.keys(object1), ...Object.keys(object2)];
  const keysSortedUniq = _.sortBy(_.uniq(keys));

  return keysSortedUniq.map((key) => {
    const hasKeyInObject1 = Object.prototype.hasOwnProperty.call(object1, key);
    const hasKeyInObject2 = Object.prototype.hasOwnProperty.call(object2, key);

    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return {
        key,
        children: compareObjects(object1[key], object2[key]),
        type: 'nested',
      };
    }

    if (!hasKeyInObject2) {
      return { key, value: object1[key], type: 'deleted' };
    }

    if (!hasKeyInObject1) {
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
