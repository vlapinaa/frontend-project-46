import stylish from './stylish.js';
import plain from './plain.js';
import formatToJson from './json.js';

const selectFormatter = (type) => {
  switch (type) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return formatToJson;
    default:
      throw new Error('Wrong format');
  }
};

export default selectFormatter;
