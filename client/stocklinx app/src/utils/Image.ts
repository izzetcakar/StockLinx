export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
export const getImage = (path?: string | null) => {
  const imageUrl = import.meta.env.VITE_REACT_APP_BASE_URL + "Image/";
  return path ? imageUrl + path.replace("/", "%5C") : null;
};
