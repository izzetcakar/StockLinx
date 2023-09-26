import { call, put, takeEvery } from "redux-saga/effects";
import { componentActions } from "./actions";
import { IComponent } from "../../interfaces/interfaces";
import { componentConst } from "./constant";
import { FetchComponentRequest, UpdateComponentRequest } from "./type";
import { componentRequests } from "./requests";
import { genericActions } from "../generic/actions";
import { openNotificationError } from "../../components/notification/Notification";

interface IResponse {
  data: IComponent[] | IComponent | null;
  message: string;
  success: boolean;
  status: number;
}

function* fetchComponentsSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data, message, success }: IResponse = yield call(
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
    openNotificationError("Component", (e as Error).message);
  }
  yield put(genericActions.decreaseLoading());
}
function* fetchComponentSaga(action: FetchComponentRequest) {
  try {
    const { data, message, success }: IResponse = yield call(
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
    openNotificationError("Component", (e as Error).message);
  }
}
function* createComponentSaga(action: UpdateComponentRequest) {
  try {
    const { message, success }: IResponse = yield call(
      componentRequests.create,
      action.payload.component
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(componentActions.createSuccess());
    }
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
  }
}
function* updateComponentSaga(action: UpdateComponentRequest) {
  try {
    const { message, success }: IResponse = yield call(
      componentRequests.update,
      action.payload.component
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(componentActions.updateSuccess());
    }
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
  }
}
function* removeComponentSaga(action: FetchComponentRequest) {
  try {
    const { message, success }: IResponse = yield call(
      componentRequests.remove,
      action.payload.id
    );
    if (success !== undefined && !success) {
      throw new Error(message);
    } else {
      yield put(componentActions.removeSuccess());
    }
  } catch (e) {
    openNotificationError("Component", (e as Error).message);
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
