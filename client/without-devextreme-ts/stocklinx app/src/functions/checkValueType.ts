export const checkValueType = (
  e: React.ChangeEvent<HTMLInputElement>,
  obj: any
): any => {
  const { name, value } = e.target;
  let newValue: any;

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

export const checkDevExValueType = (
  name: string,
  value: any,
  obj: any
): any => {
  let newValue: any;

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
