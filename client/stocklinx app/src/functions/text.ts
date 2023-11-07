export const handleEmptyString = (
  str: string | number | boolean | null,
  empty: string
): string => {
  if (str === null || str === undefined) {
    return empty.toString();
  }
  return str as string;
};
