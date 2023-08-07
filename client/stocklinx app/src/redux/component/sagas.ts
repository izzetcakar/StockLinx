import { call, put, takeEvery } from "redux-saga/effects";
import { componentActions } from "./actions";
import { IComponent } from "../../interfaces/interfaces";
import { BackendResponse, request } from "../../server/api";
import { checkEmpty } from "../../functions/checkEmpty";
import { componentConst } from "./constant";
import { FetchComponentRequest, UpdateComponentRequest } from "./type";
import { componentRequests } from "./requests";

interface IResponse {
  data: IComponent[] | IComponent | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchComponentsSaga() {
  try {
    const { data, message, success, status }: IResponse = yield call(
      componentRequests.getAll
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        componentActions.getAllSuccess({
          components: data as IComponent[],
        })
      );
    }
  } catch (e) {
    yield put(
      componentActions.getAllFailure({
        error: e.message as string,
      })
    );
  }
}
function* fetchComponentSaga(action: FetchComponentRequest) {
  try {
    const { data, message, success, status }: IResponse = yield call(
      componentRequests.get,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(
        componentActions.getSuccess({
          component: data as IComponent,
        })
      );
    }
  } catch (e) {
    yield put(
      componentActions.getFailure({
        error: e.message as string,
      })
    );
  }
}
function* createComponentSaga(action: UpdateComponentRequest) {
  try {
    const { data, message, success, status }: IResponse = yield call(
      componentRequests.create,
      action.payload.component
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(componentActions.createSuccess());
    }
  } catch (e) {
    yield put(
      componentActions.createFailure({
        error: e.message as string,
      })
    );
  }
}
function* updateComponentSaga(action: UpdateComponentRequest) {
  try {
    const { data, message, success, status }: IResponse = yield call(
      componentRequests.update,
      action.payload.component
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(componentActions.updateSuccess());
    }
  } catch (e) {
    yield put(
      componentActions.updateFailure({
        error: e.message as string,
      })
    );
  }
}
function* removeComponentSaga(action: FetchComponentRequest) {
  try {
    const { data, message, success, status }: IResponse = yield call(
      componentRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(componentActions.removeSuccess());
    }
  } catch (e) {
    yield put(
      componentActions.removeFailure({
        error: e.message as string,
      })
    );
  }
}

function* componentsaga() {
  // yield all([
  //   takeLatest(componentConst.FETCH_COMPONENTS_REQUEST, fetchComponentsSaga),
  // ]);
  yield takeEvery(componentConst.FETCH_COMPONENTS_REQUEST, fetchComponentsSaga);
  yield takeEvery(componentConst.FETCH_COMPONENT_REQUEST, fetchComponentSaga);
  yield takeEvery(componentConst.CREATE_COMPONENT_REQUEST, createComponentSaga);
  yield takeEvery(componentConst.UPDATE_COMPONENT_REQUEST, updateComponentSaga);
  yield takeEvery(componentConst.REMOVE_COMPONENT_REQUEST, removeComponentSaga);
}
// function* budgetItemSaga() {
//   yield takeEvery(budgetItemConst.fetchList, listBudgetITem);
//   yield takeEvery(budgetItemConst.fetchSave,saveBudgetITem);
//   yield takeEvery(budgetItemConst.fetchUpdate,updateBudgetITem);
// }

export default componentsaga;
