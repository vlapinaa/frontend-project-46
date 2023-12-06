export default (value) => {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return true;
  }
  return false;
};
