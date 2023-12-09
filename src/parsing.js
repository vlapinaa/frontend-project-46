import yaml from 'js-yaml';

const parseFile = (content, extention) => {
  switch (extention) {
    case '.yaml':
    case '.yml':
      return yaml.load(content);
    case '.json':
      return JSON.parse(content);
    default:
      throw new Error(`Wrong extention: '${extention}'!`);
  }
};

export default parseFile;
