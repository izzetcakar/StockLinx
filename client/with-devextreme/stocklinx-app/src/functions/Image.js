export const compareImages = async (before, after) => {
  const filter = after.filter((item) => {
    return !before.includes(item);
  });
  return filter;
};

export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
