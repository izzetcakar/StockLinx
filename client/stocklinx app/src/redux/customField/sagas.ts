import { call, put, takeEvery } from "redux-saga/effects";
import { customFieldActions } from "./actions";
import { ICustomField } from "../../interfaces/interfaces";
import { customFieldConst } from "./constant";
import {
  CreateCustomFieldRequest,
  CreateRangeCustomFieldRequest,
  FetchCustomFieldRequest,
  RemoveCustomFieldRequest,
  RemoveRangeCustomFieldRequest,
  UpdateCustomFieldRequest,
} from "./type";
import { customFieldRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: ICustomField[] | ICustomField | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchCustomFieldsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      customFieldRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        customFieldActions.getAllSuccess({
          customFields: data as ICustomField[],
        })
      );
    }
  } catch (e) {
    openNotificationError("CustomField", (e as Error).message);
    yield put(customFieldActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchCustomFieldSaga(action: FetchCustomFieldRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      customFieldRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        customFieldActions.getSuccess({
          customField: data as ICustomField,
        })
      );
    }
  } catch (e) {
    openNotificationError("CustomField", (e as Error).message);
    yield put(customFieldActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createCustomFieldSaga(action: CreateCustomFieldRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      customFieldRequests.create,
      action.payload.customField
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("CustomField Created");
      yield put(customFieldActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("CustomField", (e as Error).message);
    yield put(customFieldActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createRangeCustomFieldSaga(action: CreateRangeCustomFieldRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      customFieldRequests.createRange,
      action.payload.customFields
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("CustomFields Created");
      yield put(customFieldActions.createRangeSuccess());
    }
  } catch (e) {
    openNotificationError("CustomField", (e as Error).message);
    yield put(customFieldActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateCustomFieldSaga(action: UpdateCustomFieldRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      customFieldRequests.update,
      action.payload.customField
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("CustomField Updated");
      yield put(customFieldActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("CustomField", (e as Error).message);
    yield put(customFieldActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeCustomFieldSaga(action: RemoveCustomFieldRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      customFieldRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("CustomField Removed");
      yield put(customFieldActions.removeSuccess({ id: action.payload.id }));
    }
  } catch (e) {
    openNotificationError("CustomField", (e as Error).message);
    yield put(customFieldActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeCustomFieldSaga(action: RemoveRangeCustomFieldRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      customFieldRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("CustomFields Removed");
      yield put(
        customFieldActions.removeRangeSuccess({ ids: action.payload.ids })
      );
    }
  } catch (e) {
    openNotificationError("CustomField", (e as Error).message);
    yield put(customFieldActions.removeRangeFailure());
  }
}

function* customFieldsaga() {
  // yield all([
  //   takeLatest(customFieldConst.FETCH_CUSTOMFIELDS_REQUEST, fetchCustomFieldsSaga),
  // ]);
  yield takeEvery(
    customFieldConst.FETCH_CUSTOMFIELDS_REQUEST,
    fetchCustomFieldsSaga
  );
  yield takeEvery(
    customFieldConst.FETCH_CUSTOMFIELD_REQUEST,
    fetchCustomFieldSaga
  );
  yield takeEvery(
    customFieldConst.CREATE_CUSTOMFIELD_REQUEST,
    createCustomFieldSaga
  );
  yield takeEvery(
    customFieldConst.CREATE_RANGE_CUSTOMFIELD_REQUEST,
    createRangeCustomFieldSaga
  );
  yield takeEvery(
    customFieldConst.UPDATE_CUSTOMFIELD_REQUEST,
    updateCustomFieldSaga
  );
  yield takeEvery(
    customFieldConst.REMOVE_CUSTOMFIELD_REQUEST,
    removeCustomFieldSaga
  );
  yield takeEvery(
    customFieldConst.REMOVE_RANGE_CUSTOMFIELD_REQUEST,
    removeRangeCustomFieldSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default customFieldsaga;
