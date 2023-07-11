export const compareImages = async (
  before: any[],
  after: any[]
): Promise<string[]> => {
  const filter = after.filter((item) => {
    return !before.includes(item);
  });
  return filter;
};

export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
