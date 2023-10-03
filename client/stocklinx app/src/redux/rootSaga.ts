import { all, fork } from "redux-saga/effects";
import accessorySaga from "./accessory/sagas";
import assetSaga from "./asset/sagas";
import categorySaga from "./category/sagas";
import companySaga from "./company/sagas";
import componentSaga from "./component/sagas";
import consumableSaga from "./consumable/sagas";
import departmentSaga from "./department/sagas";
import licenseSaga from "./license/sagas";
import locationSaga from "./location/sagas";
import manufacturerSaga from "./manufacturer/sagas";
import modelSaga from "./model/sagas";
import supplierSaga from "./supplier/sagas";
import userSaga from "./user/sagas";

export function* rootSaga() {
  yield all([
    fork(accessorySaga),
    fork(assetSaga),
    fork(categorySaga),
    fork(companySaga),
    fork(componentSaga),
    fork(consumableSaga),
    fork(departmentSaga),
    fork(licenseSaga),
    fork(locationSaga),
    fork(manufacturerSaga),
    fork(modelSaga),
    fork(supplierSaga),
    fork(userSaga),
  ]);
}
