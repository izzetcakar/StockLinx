interface ItemWithIdAndName {
  id: string;
  name: string;
}

export const getNameFromArray = <T extends ItemWithIdAndName>(
  array: T[],
  id: string
): string => {
  const item = array.find((item) => item?.id === id);
  return item?.name || "";
};
