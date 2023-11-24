import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getFieldSetCustomFields = (state: RootState) => state.fieldSetCustomField.fieldSetCustomFields;

export const getFieldSetCustomFieldsSelector = createSelector(
  getFieldSetCustomFields,
  (fieldSetCustomFields) => fieldSetCustomFields
);
