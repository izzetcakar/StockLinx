import { all, fork } from "redux-saga/effects";
import accessorySaga from "./accessory/saga";

export function* rootSaga() {
  yield all([fork(accessorySaga)]);
}
