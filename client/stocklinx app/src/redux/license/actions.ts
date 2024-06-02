import {
  AssetProductCheckInPayload,
  AssetProductCheckOutPayload,
  CheckInOutPayload,
  UserProductCheckInPayload,
  UserProductCheckOutPayload,
} from "../../interfaces/clientInterfaces";
import { ILicense } from "@interfaces/serverInterfaces";
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
  UserCheckInLicenseRequest,
  UserCheckInLicenseSuccess,
  UserCheckInLicenseFailure,
  UserCheckOutLicenseRequest,
  AssetCheckOutLicenseRequest,
  AssetCheckOutLicenseSuccess,
  AssetCheckOutLicenseFailure,
  AssetCheckInLicenseRequest,
  AssetCheckInLicenseSuccess,
  AssetCheckInLicenseFailure,
  UserCheckOutLicenseSuccess,
  UserCheckOutLicenseFailure,
  FilterLicensesRequest,
  FilterLicensesSuccess,
  FilterLicensesFailure,
} from "./type";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

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

//USER CHECK IN
const userCheckIn = (
  payload: UserProductCheckInPayload
): UserCheckInLicenseRequest => ({
  type: licenseConst.USER_CHECK_IN_LICENSE_REQUEST,
  payload,
});
const userCheckInSuccess = (
  payload: CheckInOutPayload
): UserCheckInLicenseSuccess => ({
  type: licenseConst.USER_CHECK_IN_LICENSE_SUCCESS,
  payload,
});
const userCheckInFailure = (): UserCheckInLicenseFailure => ({
  type: licenseConst.USER_CHECK_IN_LICENSE_FAILURE,
});

//ASSET CHECK IN
const assetCheckIn = (
  payload: AssetProductCheckInPayload
): AssetCheckInLicenseRequest => ({
  type: licenseConst.ASSET_CHECK_IN_LICENSE_REQUEST,
  payload,
});
const assetCheckInSuccess = (
  payload: CheckInOutPayload
): AssetCheckInLicenseSuccess => ({
  type: licenseConst.ASSET_CHECK_IN_LICENSE_SUCCESS,
  payload,
});
const assetCheckInFailure = (): AssetCheckInLicenseFailure => ({
  type: licenseConst.ASSET_CHECK_IN_LICENSE_FAILURE,
});

//USER CHECK OUT
const userCheckOut = (
  payload: UserProductCheckOutPayload
): UserCheckOutLicenseRequest => ({
  type: licenseConst.USER_CHECK_OUT_LICENSE_REQUEST,
  payload,
});
const userCheckOutSuccess = (
  payload: CheckInOutPayload
): UserCheckOutLicenseSuccess => ({
  type: licenseConst.USER_CHECK_OUT_LICENSE_SUCCESS,
  payload,
});
const userCheckOutFailure = (): UserCheckOutLicenseFailure => ({
  type: licenseConst.USER_CHECK_OUT_LICENSE_FAILURE,
});

//ASSET CHECK OUT
const assetCheckOut = (
  payload: AssetProductCheckOutPayload
): AssetCheckOutLicenseRequest => ({
  type: licenseConst.ASSET_CHECK_OUT_LICENSE_REQUEST,
  payload,
});
const assetCheckOutSuccess = (
  payload: CheckInOutPayload
): AssetCheckOutLicenseSuccess => ({
  type: licenseConst.ASSET_CHECK_OUT_LICENSE_SUCCESS,
  payload,
});
const assetCheckOutFailure = (): AssetCheckOutLicenseFailure => ({
  type: licenseConst.ASSET_CHECK_OUT_LICENSE_FAILURE,
});

//FILTER
const filter = (payload: QueryFilter[]): FilterLicensesRequest => ({
  type: licenseConst.FILTER_LICENSES_REQUEST,
  payload,
});
const filterSuccess = (payload: LicensesPayload): FilterLicensesSuccess => ({
  type: licenseConst.FILTER_LICENSES_SUCCESS,
  payload,
});
const filterFailure = (): FilterLicensesFailure => ({
  type: licenseConst.FILTER_LICENSES_FAILURE,
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
  userCheckIn,
  userCheckInSuccess,
  userCheckInFailure,
  assetCheckIn,
  assetCheckInSuccess,
  assetCheckInFailure,
  assetCheckOut,
  assetCheckOutSuccess,
  assetCheckOutFailure,
  userCheckOut,
  userCheckOutSuccess,
  userCheckOutFailure,
  filter,
  filterSuccess,
  filterFailure,
  setLicense,
  clearLicense,
  setLicenses,
  clearLicenses,
};
