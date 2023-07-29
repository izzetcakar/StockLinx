export const checkEmpty = (
  obj: object | Array<object>
): boolean | object | Array<object> => {
  if (Array.isArray(obj)) {
    return obj.length > 0 ? obj : false;
  }

  return obj !== null && obj !== undefined && Object.keys(obj).length > 0
    ? obj
    : false;
};
