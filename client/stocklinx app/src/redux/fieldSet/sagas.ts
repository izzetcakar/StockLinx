import { call, put, takeEvery } from "redux-saga/effects";
import { fieldSetActions } from "./actions";
import { IFieldSet } from "../../interfaces/interfaces";
import { fieldSetConst } from "./constant";
import {
  CreateFieldSetRequest,
  CreateRangeFieldSetRequest,
  FetchFieldSetRequest,
  RemoveFieldSetRequest,
  RemoveRangeFieldSetRequest,
  UpdateFieldSetRequest,
} from "./type";
import { fieldSetRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../notification/Notification";

interface IResponse {
  data: IFieldSet[] | IFieldSet | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchFieldSetsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
      fieldSetRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        fieldSetActions.getAllSuccess({
          fieldSets: data as IFieldSet[],
        })
      );
    }
  } catch (e) {
    openNotificationError("FieldSet", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchFieldSetSaga(action: FetchFieldSetRequest) {
  try {
    const { data, message, success }: IResponse = yield call(
      fieldSetRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        fieldSetActions.getSuccess({
          fieldSet: data as IFieldSet,
        })
      );
    }
  } catch (e) {
    openNotificationError("FieldSet", (e as Error).message);
  }
}
function* createFieldSetSaga(action: CreateFieldSetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      fieldSetRequests.create,
      action.payload.fieldSet
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(fieldSetActions.createSuccess());
      openNotificationSuccess("FieldSet Created");
    }
  } catch (e) {
    openNotificationError("FieldSet", (e as Error).message);
  }
}
function* createRangeFieldSetSaga(action: CreateRangeFieldSetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      fieldSetRequests.createRange,
      action.payload.fieldSets
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(fieldSetActions.createRangeSuccess());
      openNotificationSuccess("FieldSets Created");
    }
  } catch (e) {
    openNotificationError("FieldSet", (e as Error).message);
  }
}

function* updateFieldSetSaga(action: UpdateFieldSetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      fieldSetRequests.update,
      action.payload.fieldSet
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(fieldSetActions.updateSuccess());
      openNotificationSuccess("FieldSet Updated");
    }
  } catch (e) {
    openNotificationError("FieldSet", (e as Error).message);
  }
}
function* removeFieldSetSaga(action: RemoveFieldSetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      fieldSetRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(fieldSetActions.removeSuccess({ id: action.payload.id }));
      openNotificationSuccess("FieldSet Removed");
    }
  } catch (e) {
    openNotificationError("FieldSet", (e as Error).message);
  }
}
function* removeRangeFieldSetSaga(action: RemoveRangeFieldSetRequest) {
  try {
    const { message, success }: IResponse = yield call(
      fieldSetRequests.removeRange,
      action.payload.ids
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(fieldSetActions.removeRangeSuccess({ ids: action.payload.ids }));
      openNotificationSuccess("FieldSets Removed");
    }
  } catch (e) {
    openNotificationError("FieldSet", (e as Error).message);
  }
}

function* fieldSetsaga() {
  // yield all([
  //   takeLatest(fieldSetConst.FETCH_FIELDSETS_REQUEST, fetchFieldSetsSaga),
  // ]);
  yield takeEvery(fieldSetConst.FETCH_FIELDSETS_REQUEST, fetchFieldSetsSaga);
  yield takeEvery(fieldSetConst.FETCH_FIELDSET_REQUEST, fetchFieldSetSaga);
  yield takeEvery(fieldSetConst.CREATE_FIELDSET_REQUEST, createFieldSetSaga);
  yield takeEvery(
    fieldSetConst.CREATE_RANGE_FIELDSET_REQUEST,
    createRangeFieldSetSaga
  );
  yield takeEvery(fieldSetConst.UPDATE_FIELDSET_REQUEST, updateFieldSetSaga);
  yield takeEvery(fieldSetConst.REMOVE_FIELDSET_REQUEST, removeFieldSetSaga);
  yield takeEvery(
    fieldSetConst.REMOVE_RANGE_FIELDSET_REQUEST,
    removeRangeFieldSetSaga
  );
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default fieldSetsaga;
