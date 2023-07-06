export const getLanguage = () => {
  var language = localStorage.getItem("language");
  if (language === null) return "";
  var lng = JSON.parse(language);
  return lng;
};
