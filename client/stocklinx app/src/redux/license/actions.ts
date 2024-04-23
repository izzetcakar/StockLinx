import { ILicense } from "../../interfaces/serverInterfaces";
import { licenseConst } from "./constant";
import {
  CreateLicenseFailure,
  CreateLicenseRequest,
  CreateLicenseSuccess,
  RemoveLicenseFailure,
  RemoveLicenseRequest,
  RemoveLicenseSuccess,
  FetchLicensesFailure,
  FetchLicensesRequest,
  FetchLicensesSuccess,
  FetchLicenseFailure,
  FetchLicenseRequest,
  FetchLicenseSuccess,
  UpdateLicenseFailure,
  UpdateLicenseRequest,
  UpdateLicenseSuccess,
  LicenseRequestPayload,
  SetLicense,
  SetLicenses,
  ClearLicense,
  ClearLicenses,
  LicensesPayload,
  LicensePayload,
  CreateRangeLicenseRequest,
  CreateRangeLicenseSuccess,
  CreateRangeLicenseFailure,
  RemoveRangeLicenseRequest,
  RemoveRangeLicenseSuccess,
  RemoveRangeLicenseFailure,
  LicenseRemoveRangePayload,
  LicenseRemovePayload,
  CheckInLicenseRequest,
  CheckInLicenseSuccess,
  CheckInLicenseFailure,
  CheckOutLicenseRequest,
  CheckOutLicenseSuccess,
  CheckOutLicenseFailure,
  CheckInPayload,
  LicenseCheckInSuccessPayload,
} from "./type";

//GET
const getAll = (): FetchLicensesRequest => ({
  type: licenseConst.FETCH_LICENSES_REQUEST,
});
const getAllSuccess = (payload: LicensesPayload): FetchLicensesSuccess => ({
  type: licenseConst.FETCH_LICENSES_SUCCESS,
  payload,
});
const getAllFailure = (): FetchLicensesFailure => ({
  type: licenseConst.FETCH_LICENSES_FAILURE,
});

//GET:/ID
const get = (payload: LicenseRequestPayload): FetchLicenseRequest => ({
  type: licenseConst.FETCH_LICENSE_REQUEST,
  payload,
});
const getSuccess = (payload: LicensePayload): FetchLicenseSuccess => ({
  type: licenseConst.FETCH_LICENSE_SUCCESS,
  payload,
});
const getFailure = (): FetchLicenseFailure => ({
  type: licenseConst.FETCH_LICENSE_FAILURE,
});

//POST
const create = (payload: LicensePayload): CreateLicenseRequest => ({
  type: licenseConst.CREATE_LICENSE_REQUEST,
  payload,
});
const createSuccess = (payload: LicensePayload): CreateLicenseSuccess => ({
  type: licenseConst.CREATE_LICENSE_SUCCESS,
  payload,
});
const createFailure = (): CreateLicenseFailure => ({
  type: licenseConst.CREATE_LICENSE_FAILURE,
});

//POST RANGE
const createRange = (payload: LicensesPayload): CreateRangeLicenseRequest => ({
  type: licenseConst.CREATE_RANGE_LICENSE_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: LicensesPayload
): CreateRangeLicenseSuccess => ({
  type: licenseConst.CREATE_RANGE_LICENSE_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeLicenseFailure => ({
  type: licenseConst.CREATE_RANGE_LICENSE_FAILURE,
});

//PUT
const update = (payload: LicensePayload): UpdateLicenseRequest => ({
  type: licenseConst.UPDATE_LICENSE_REQUEST,
  payload,
});
const updateSuccess = (payload: LicensePayload): UpdateLicenseSuccess => ({
  type: licenseConst.UPDATE_LICENSE_SUCCESS,
  payload,
});
const updateFailure = (): UpdateLicenseFailure => ({
  type: licenseConst.UPDATE_LICENSE_FAILURE,
});

//REMOVE
const remove = (payload: LicenseRemovePayload): RemoveLicenseRequest => ({
  type: licenseConst.REMOVE_LICENSE_REQUEST,
  payload,
});
const removeSuccess = (
  payload: LicenseRemovePayload
): RemoveLicenseSuccess => ({
  type: licenseConst.REMOVE_LICENSE_SUCCESS,
  payload,
});
const removeFailure = (): RemoveLicenseFailure => ({
  type: licenseConst.REMOVE_LICENSE_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: LicenseRemoveRangePayload
): RemoveRangeLicenseRequest => ({
  type: licenseConst.REMOVE_RANGE_LICENSE_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: LicenseRemoveRangePayload
): RemoveRangeLicenseSuccess => ({
  type: licenseConst.REMOVE_RANGE_LICENSE_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeLicenseFailure => ({
  type: licenseConst.REMOVE_RANGE_LICENSE_FAILURE,
});

//CHECK IN
const checkIn = (payload: CheckInPayload): CheckInLicenseRequest => ({
  type: licenseConst.CHECK_IN_LICENSE_REQUEST,
  payload,
});
const checkInSuccess = (
  payload: LicenseCheckInSuccessPayload
): CheckInLicenseSuccess => ({
  type: licenseConst.CHECK_IN_LICENSE_SUCCESS,
  payload,
});
const checkInFailure = (): CheckInLicenseFailure => ({
  type: licenseConst.CHECK_IN_LICENSE_FAILURE,
});

//CHECK OUT
const checkOut = (payload: LicenseRequestPayload): CheckOutLicenseRequest => ({
  type: licenseConst.CHECK_OUT_LICENSE_REQUEST,
  payload,
});
const checkOutSuccess = (payload: LicensePayload): CheckOutLicenseSuccess => ({
  type: licenseConst.CHECK_OUT_LICENSE_SUCCESS,
  payload,
});
const checkOutFailure = (): CheckOutLicenseFailure => ({
  type: licenseConst.CHECK_OUT_LICENSE_FAILURE,
});

//CLIENT ACTIONS
const setLicense = (payload: ILicense | null): SetLicense => ({
  type: licenseConst.SET_LICENSE,
  payload,
});
const clearLicense = (): ClearLicense => ({
  type: licenseConst.CLEAR_LICENSE,
});
const setLicenses = (payload: ILicense[]): SetLicenses => ({
  type: licenseConst.SET_LICENSES,
  payload,
});
const clearLicenses = (): ClearLicenses => ({
  type: licenseConst.CLEAR_LICENSES,
});

export const licenseActions = {
  getAll,
  getAllSuccess,
  getAllFailure,
  get,
  getSuccess,
  getFailure,
  create,
  createSuccess,
  createFailure,
  createRange,
  createRangeSuccess,
  createRangeFailure,
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  removeRange,
  removeRangeSuccess,
  removeRangeFailure,
  checkIn,
  checkInSuccess,
  checkInFailure,
  checkOut,
  checkOutSuccess,
  checkOutFailure,
  setLicense,
  clearLicense,
  setLicenses,
  clearLicenses,
};
