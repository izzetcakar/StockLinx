import { call, put, takeEvery } from "redux-saga/effects";
import { fieldSetCustomFieldActions } from "./actions";
import { IFieldSetCustomField } from "../../interfaces/interfaces";
import { fieldSetCustomFieldConst } from "./constant";
import {
  CreateFieldSetCustomFieldRequest,
  CreateRangeFieldSetCustomFieldRequest,
  FetchFieldSetCustomFieldRequest,
  RemoveFieldSetCustomFieldRequest,
  RemoveRangeFieldSetCustomFieldRequest,
  SynchronizeFieldSetCustomFieldRequest,
  UpdateFieldSetCustomFieldRequest,
} from "./type";
import { fieldSetCustomFieldRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: IFieldSetCustomField[] | IFieldSetCustomField | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchFieldSetCustomFieldsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      fieldSetCustomFieldRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        fieldSetCustomFieldActions.getAllSuccess({
          fieldSetCustomFields: data as IFieldSetCustomField[],
        })
      );
    }
  } catch (e) {
    openNotificationError("FieldSetCustomField", (e as Error).message);
    yield put(fieldSetCustomFieldActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchFieldSetCustomFieldSaga(
  action: FetchFieldSetCustomFieldRequest
) {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      fieldSetCustomFieldRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        fieldSetCustomFieldActions.getSuccess({
          fieldSetCustomField: data as IFieldSetCustomField,
        })
      );
    }
  } catch (e) {
    openNotificationError("FieldSetCustomField", (e as Error).message);
    yield put(fieldSetCustomFieldActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createFieldSetCustomFieldSaga(
  action: CreateFieldSetCustomFieldRequest
) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      fieldSetCustomFieldRequests.create,
      action.payload.fieldSetCustomField
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("FieldSetCustomField Created");
      yield put(fieldSetCustomFieldActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("FieldSetCustomField", (e as Error).message);
    yield put(fieldSetCustomFieldActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* createRangeFieldSetCustomFieldSaga(
  action: CreateRangeFieldSetCustomFieldRequest
) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      fieldSetCustomFieldRequests.createRange,
      action.payload.fieldSetCustomFields
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("FieldSetCustomFields Created");
      yield put(fieldSetCustomFieldActions.createRangeSuccess());
    }
  } catch (e) {
    openNotificationError("FieldSetCustomField", (e as Error).message);
    yield put(fieldSetCustomFieldActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateFieldSetCustomFieldSaga(
  action: UpdateFieldSetCustomFieldRequest
) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      fieldSetCustomFieldRequests.update,
      action.payload.fieldSetCustomField
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("FieldSetCustomField Updated");
      yield put(fieldSetCustomFieldActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("FieldSetCustomField", (e as Error).message);
    yield put(fieldSetCustomFieldActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeFieldSetCustomFieldSaga(
  action: RemoveFieldSetCustomFieldRequest
) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      fieldSetCustomFieldRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("FieldSetCustomField Removed");
      yield put(
        fieldSetCustomFieldActions.removeSuccess({ id: action.payload.id })
      );
    }
  } catch (e) {
    openNotificationError("FieldSetCustomField", (e as Error).message);
    yield put(fieldSetCustomFieldActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* removeRangeFieldSetCustomFieldSaga(
  action: RemoveRangeFieldSetCustomFieldRequest
) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      fieldSetCustomFieldRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("FieldSetCustomFields Removed");
      yield put(
        fieldSetCustomFieldActions.removeRangeSuccess({
          ids: action.payload.ids,
        })
      );
    }
  } catch (e) {
    openNotificationError("FieldSetCustomField", (e as Error).message);
    yield put(fieldSetCustomFieldActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}
function* scnyronizeFieldSetCustomFieldsSaga(
  action: SynchronizeFieldSetCustomFieldRequest
) {
  yield put(genericActions.increaseLoading());
  try {
    const { message, success }: IResponse = yield call(
      fieldSetCustomFieldRequests.synchronize,
      action.payload.fieldSetCustomFields
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      openNotificationSuccess("FieldSetCustomFields Synchronized");
      yield put(fieldSetCustomFieldActions.synchronizeSuccess());
    }
  } catch (e) {
    openNotificationError("FieldSetCustomField", (e as Error).message);
    yield put(fieldSetCustomFieldActions.synchronizeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fieldSetCustomFieldSaga() {
  // yield all([
  //   takeLatest(fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_REQUEST, fetchFieldSetCustomFieldsSaga),
  // ]);
  yield takeEvery(
    fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELDS_REQUEST,
    fetchFieldSetCustomFieldsSaga
  );
  yield takeEvery(
    fieldSetCustomFieldConst.FETCH_FIELDSETCUSTOMFIELD_REQUEST,
    fetchFieldSetCustomFieldSaga
  );
  yield takeEvery(
    fieldSetCustomFieldConst.CREATE_FIELDSETCUSTOMFIELD_REQUEST,
    createFieldSetCustomFieldSaga
  );
  yield takeEvery(
    fieldSetCustomFieldConst.CREATE_RANGE_FIELDSETCUSTOMFIELD_REQUEST,
    createRangeFieldSetCustomFieldSaga
  );
  yield takeEvery(
    fieldSetCustomFieldConst.UPDATE_FIELDSETCUSTOMFIELD_REQUEST,
    updateFieldSetCustomFieldSaga
  );
  yield takeEvery(
    fieldSetCustomFieldConst.REMOVE_FIELDSETCUSTOMFIELD_REQUEST,
    removeFieldSetCustomFieldSaga
  );
  yield takeEvery(
    fieldSetCustomFieldConst.REMOVE_RANGE_FIELDSETCUSTOMFIELD_REQUEST,
    removeRangeFieldSetCustomFieldSaga
  );
  yield takeEvery(
    fieldSetCustomFieldConst.SYNCHRONIZE_FIELDSETCUSTOMFIELD_REQUEST,
    scnyronizeFieldSetCustomFieldsSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default fieldSetCustomFieldSaga;
