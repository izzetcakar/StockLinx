export const getLanguage = () => {
  const language = localStorage.getItem("language");
  if (language === null) return "";
  return JSON.parse(language);
};
