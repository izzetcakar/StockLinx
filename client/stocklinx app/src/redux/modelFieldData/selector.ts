import { createSelector } from "reselect";
import { RootState } from "../rootReducer";

const getModelFieldDatas = (state: RootState) => state.modelFieldData.modelFieldDatas;

export const getModelFieldDatasSelector = createSelector(
  getModelFieldDatas,
  (modelFieldDatas) => modelFieldDatas
);
