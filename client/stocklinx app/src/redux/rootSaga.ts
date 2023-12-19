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
import productSaga from "./product/sagas";
import productStatusSaga from "./productStatus/sagas";
import branchSaga from "./branch/sagas";
import fieldSetsaga from "./fieldSet/sagas";
import customFieldSaga from "./customField/sagas";
import fieldSetCustomFieldSaga from "./fieldSetCustomField/sagas";
import modelFieldDataSaga from "./modelFieldData/sagas";
import deployedProductSaga from "./deployedProduct/sagas";
import permissionSaga from "./permission/sagas";

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
    fork(fieldSetsaga),
    fork(customFieldSaga),
    fork(fieldSetCustomFieldSaga),
    fork(modelFieldDataSaga),
    fork(supplierSaga),
    fork(userSaga),
    fork(productSaga),
    fork(productStatusSaga),
    fork(branchSaga),
    fork(deployedProductSaga),
    fork(permissionSaga),
  ]);
}
