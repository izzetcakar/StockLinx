import { lngTypes } from "../components/baseData/data";
export const btnVisibleHandler = (titles) => {
  if (titles !== undefined) {
    for (let i = 0; i < lngTypes.length; i++) {
      if (!titles.includes(lngTypes[i].id)) {
        return true;
      }
    }
  }
  return false;
};
