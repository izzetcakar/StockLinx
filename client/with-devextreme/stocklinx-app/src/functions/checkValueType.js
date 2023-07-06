export const checkValueType = (e, obj) => {
  const { name, value } = e.target;
  let newValue;

  switch (typeof obj[name]) {
    case "number":
      newValue = Number(value);
      break;
    case "boolean":
      newValue = value === "true";
      break;
    default:
      newValue = value;
  }
  return newValue;
};
export const checkDevExValueType = (name, value, obj) => {
  let newValue;

  switch (typeof obj[name]) {
    case "number":
      newValue = Number(value);
      break;
    case "boolean":
      newValue = value === "true";
      break;
    default:
      newValue = value;
  }
  return newValue;
};
