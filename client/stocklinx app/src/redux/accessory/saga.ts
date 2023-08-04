import { call, put, takeEvery } from "redux-saga/effects";
import { accessoryActions } from "./actions";
import { IAccessory } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { accessoryConst } from "./constant";
const requestUrl = "Accessory/";

const fetchAccessories = () => {
  return request<IAccessory>({ requestUrl: requestUrl, apiType: "get" });
};
const fetchAccessory = () => {
  return request<IAccessory>({
    requestUrl: requestUrl,
    apiType: "get",
  });
};

function* fetchAccessoriesSaga() {
  try {
    const { data, errors }: BackendResponse<IAccessory> = yield call(
      fetchAccessories
    );
    if (errors && checkEmpty(errors)) {
      throw new Error(errors[0]);
    } else {
      yield put(
        accessoryActions.getAllSuccess({
          accessories: data as IAccessory[],
        })
      );
    }
  } catch (e) {
    yield put(
      accessoryActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchAccessorySaga(action: any) {
  try {
    const { data, errors }: BackendResponse<IAccessory> = yield call(
      fetchAccessory
    );
    if (errors && checkEmpty(errors)) {
      throw new Error(errors[0]);
    } else {
      yield put(
        accessoryActions.getSuccess({
          accessory: data as IAccessory,
        })
      );
    }
  } catch (e) {
    yield put(
      accessoryActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}

function* accessorySaga() {
  // yield all([
  //   takeLatest(accessoryConst.FETCH_ACCESSORIES_REQUEST, fetchAccessoriesSaga),
  // ]);
  yield takeEvery(
    accessoryConst.FETCH_ACCESSORIES_REQUEST,
    fetchAccessoriesSaga
  );
  yield takeEvery(accessoryConst.FETCH_ACCESSORY_REQUEST, fetchAccessorySaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default accessorySaga;
