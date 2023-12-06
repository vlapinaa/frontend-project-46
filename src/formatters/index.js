import stylish from './stylish.js';
import plain from './plain.js';

const selectFormatter = (type) => {
  switch (type) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return JSON.stringify;
    default:
      throw new Error('Wrong format');
  }
};

export default selectFormatter;
