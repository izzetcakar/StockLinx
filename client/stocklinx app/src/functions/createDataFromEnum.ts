export const createDataFromEnum = (enumObj: { [s: number]: string }) => {
  const data = [];
  for (const key in enumObj) {
    if (!isNaN(Number(key))) {
      continue;
    }
    data.push({ value: enumObj[key], id: key });
  }
  return data;
};
