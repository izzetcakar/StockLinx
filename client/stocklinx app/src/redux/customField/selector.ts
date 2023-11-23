import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getCustomFields = (state: RootState) => state.customField.customFields;

export const getCustomFieldsSelector = createSelector(
  getCustomFields,
  (customFields) => customFields
);
