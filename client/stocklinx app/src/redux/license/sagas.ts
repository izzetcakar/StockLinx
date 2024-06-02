import { call, put, takeEvery } from "redux-saga/effects";
import { licenseActions } from "./actions";
import {
  IAssetProduct,
  ILicense,
  IUserProduct,
} from "@interfaces/serverInterfaces";
import { licenseConst } from "./constant";
import {
  AssetCheckInLicenseRequest,
  AssetCheckOutLicenseRequest,
  CreateLicenseRequest,
  CreateRangeLicenseRequest,
  FetchLicenseRequest,
  FilterLicensesRequest,
  RemoveLicenseRequest,
  RemoveRangeLicenseRequest,
  UpdateLicenseRequest,
  UserCheckInLicenseRequest,
  UserCheckOutLicenseRequest,
} from "./type";
import { licenseRequests } from "./requests";
import { genericActions } from "../generic/actions";
import {
  openNotificationError,
  openNotificationSuccess,
} from "@/notification/Notification";
import { userProductActions } from "../userProduct/actions";
import { assetProductActions } from "../assetProduct/actions";

type IResponse = {
  data: ILicense[] | ILicense | IUserProduct | IAssetProduct | null;
  message: string;
  success: boolean;
  status: number;
};

function* fetchLicensesSaga() {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(licenseRequests.getAll);
    yield put(
      licenseActions.getAllSuccess({
        licenses: data as ILicense[],
      })
    );
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.getAllFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* fetchLicenseSaga(action: FetchLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      licenseRequests.get,
      action.payload.id
    );
    yield put(
      licenseActions.getSuccess({
        license: data as ILicense,
      })
    );
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.getFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createLicenseSaga(action: CreateLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      licenseRequests.create,
      action.payload.license
    );
    openNotificationSuccess("License Created");
    yield put(licenseActions.createSuccess({ license: data as ILicense }));
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.createFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* createRangeLicenseSaga(action: CreateRangeLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      licenseRequests.createRange,
      action.payload.licenses
    );
    openNotificationSuccess("Licenses Created");
    yield put(
      licenseActions.createRangeSuccess({ licenses: data as ILicense[] })
    );
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.createRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* updateLicenseSaga(action: UpdateLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      licenseRequests.update,
      action.payload.license
    );
    openNotificationSuccess("License Updated");
    yield put(licenseActions.updateSuccess({ license: data as ILicense }));
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.updateFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeLicenseSaga(action: RemoveLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(licenseRequests.remove, action.payload.id);
    openNotificationSuccess("License Removed");
    yield put(licenseActions.removeSuccess({ id: action.payload.id }));
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.removeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* removeRangeLicenseSaga(action: RemoveRangeLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(licenseRequests.removeRange, action.payload.ids);
    openNotificationSuccess("Licenses Removed");
    yield put(licenseActions.removeRangeSuccess({ ids: action.payload.ids }));
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.removeRangeFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* userCheckInLicenseSaga(action: UserCheckInLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      licenseRequests.userCheckIn,
      action.payload.checkInDto
    );
    openNotificationSuccess("License Checked In");
    yield put(
      licenseActions.userCheckInSuccess({
        id: action.payload.checkInDto.productId,
        quantity: action.payload.checkInDto.quantity,
      })
    );
    yield put(
      userProductActions.createSuccess({ userProduct: data as IUserProduct })
    );
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.userCheckInFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* assetCheckInLicenseSaga(action: AssetCheckInLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      licenseRequests.assetCheckIn,
      action.payload.checkInDto
    );
    openNotificationSuccess("License Checked Out");
    yield put(
      licenseActions.assetCheckInSuccess({
        id: action.payload.checkInDto.productId,
        quantity: action.payload.checkInDto.quantity,
      })
    );
    yield put(
      assetProductActions.createSuccess({ assetProduct: data as IAssetProduct })
    );
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.assetCheckInFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* userCheckOutLicenseSaga(action: UserCheckOutLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(licenseRequests.userCheckOut, action.payload.checkOutDto);
    openNotificationSuccess("License Checked Out");
    yield put(
      licenseActions.userCheckOutSuccess({
        id: action.payload.checkOutDto.productId,
        quantity: action.payload.checkOutDto.quantity,
      })
    );
    yield put(
      userProductActions.removeSuccess({
        id: action.payload.checkOutDto.userProductId,
      })
    );
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.userCheckOutFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* assetCheckOutLicenseSaga(action: AssetCheckOutLicenseRequest) {
  yield put(genericActions.increaseLoading());
  try {
    yield call(licenseRequests.assetCheckOut, action.payload.checkOutDto);
    openNotificationSuccess("License Checked Out");
    yield put(
      licenseActions.assetCheckOutSuccess({
        id: action.payload.checkOutDto.productId,
        quantity: action.payload.checkOutDto.quantity,
      })
    );
    yield put(
      assetProductActions.removeSuccess({
        id: action.payload.checkOutDto.assetProductId,
      })
    );
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.assetCheckOutFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* filterLicensesSaga(action: FilterLicensesRequest) {
  yield put(genericActions.increaseLoading());
  try {
    const { data }: IResponse = yield call(
      licenseRequests.filter,
      action.payload
    );
    yield put(
      licenseActions.filterSuccess({
        licenses: data as ILicense[],
      })
    );
  } catch (e) {
    openNotificationError("License", (e as Error).message);
    yield put(licenseActions.filterFailure());
  }
  yield put(genericActions.decreaseLoading());
}

function* licenseSaga() {
  yield takeEvery(licenseConst.FETCH_LICENSES_REQUEST, fetchLicensesSaga);
  yield takeEvery(licenseConst.FETCH_LICENSE_REQUEST, fetchLicenseSaga);
  yield takeEvery(licenseConst.CREATE_LICENSE_REQUEST, createLicenseSaga);
  yield takeEvery(
    licenseConst.CREATE_RANGE_LICENSE_REQUEST,
    createRangeLicenseSaga
  );
  yield takeEvery(licenseConst.UPDATE_LICENSE_REQUEST, updateLicenseSaga);
  yield takeEvery(licenseConst.REMOVE_LICENSE_REQUEST, removeLicenseSaga);
  yield takeEvery(
    licenseConst.REMOVE_RANGE_LICENSE_REQUEST,
    removeRangeLicenseSaga
  );
  yield takeEvery(
    licenseConst.USER_CHECK_IN_LICENSE_REQUEST,
    userCheckInLicenseSaga
  );
  yield takeEvery(
    licenseConst.ASSET_CHECK_IN_LICENSE_REQUEST,
    assetCheckInLicenseSaga
  );
  yield takeEvery(
    licenseConst.USER_CHECK_OUT_LICENSE_REQUEST,
    userCheckOutLicenseSaga
  );
  yield takeEvery(
    licenseConst.ASSET_CHECK_OUT_LICENSE_REQUEST,
    assetCheckOutLicenseSaga
  );
  yield takeEvery(licenseConst.FILTER_LICENSES_REQUEST, filterLicensesSaga);
}

export default licenseSaga;
