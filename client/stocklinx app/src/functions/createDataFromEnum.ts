export const createDataFromEnum = (enumObj: { [s: number]: string }) => {
  const data = [];
  for (const key in enumObj) {
    if (!isNaN(Number(key))) {
      continue;
    }
    data.push({ id: enumObj[key], value: key });
  }
  return data;
};
