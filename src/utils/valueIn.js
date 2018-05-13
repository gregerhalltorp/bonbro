export const valueIn = (target, path) => {
  if (typeof target === 'undefined' || target === null) {
    return undefined;
  }

  const pathArr = path.split('.');
  if (!pathArr.length) {
    return target;
  }

  let ptr = target;
  while (pathArr.length) {
    if (ptr === undefined || ptr === null) {
      return undefined;
    }

    ptr = ptr[pathArr.shift()];
  }

  return typeof ptr === 'undefined' || ptr === null ? undefined : ptr;
};

export default valueIn;
