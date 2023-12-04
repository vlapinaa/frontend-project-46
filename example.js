const object1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const object2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const isObject = (value) => {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return true;
  }
  return false;
};

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

const comparing = compareObjects(object1, object2);
console.log(JSON.stringify(comparing));
