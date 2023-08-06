import { ILicense } from "../../interfaces/interfaces";
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
  LicensesSucccessPayload,
  FetchLicensesSuccess,
  FetchLicenseFailure,
  LicenseFailurePayload,
  FetchLicenseRequest,
  FetchLicenseSuccess,
  UpdateLicenseFailure,
  UpdateLicenseRequest,
  UpdateLicenseSuccess,
  LicenseRequestPayload,
  UpdateLicenseRequestPayload,
  LicenseSucccessPayload,
  SetLicense,
  SetLicenses,
  ClearLicense,
  ClearLicenses,
} from "./type";

//GET
const getAll = (): FetchLicensesRequest => ({
  type: licenseConst.FETCH_LICENSES_REQUEST,
});
const getAllSuccess = (
  payload: LicensesSucccessPayload
): FetchLicensesSuccess => ({
  type: licenseConst.FETCH_LICENSES_SUCCESS,
  payload,
});
const getAllFailure = (
  payload: LicenseFailurePayload
): FetchLicensesFailure => ({
  type: licenseConst.FETCH_LICENSES_FAILURE,
  payload,
});

//GET:/ID
const get = (payload: LicenseRequestPayload): FetchLicenseRequest => ({
  type: licenseConst.FETCH_LICENSE_REQUEST,
  payload,
});
const getSuccess = (payload: LicenseSucccessPayload): FetchLicenseSuccess => ({
  type: licenseConst.FETCH_LICENSE_SUCCESS,
  payload,
});
const getFailure = (payload: LicenseFailurePayload): FetchLicenseFailure => ({
  type: licenseConst.FETCH_LICENSE_FAILURE,
  payload,
});

//POST
const create = (
  payload: UpdateLicenseRequestPayload
): CreateLicenseRequest => ({
  type: licenseConst.CREATE_LICENSE_REQUEST,
  payload,
});
const createSuccess = (): CreateLicenseSuccess => ({
  type: licenseConst.CREATE_LICENSE_SUCCESS,
});
const createFailure = (
  payload: LicenseFailurePayload
): CreateLicenseFailure => ({
  type: licenseConst.CREATE_LICENSE_FAILURE,
  payload,
});

//PUT
const update = (
  payload: UpdateLicenseRequestPayload
): UpdateLicenseRequest => ({
  type: licenseConst.UPDATE_LICENSE_REQUEST,
  payload,
});
const updateSuccess = (): UpdateLicenseSuccess => ({
  type: licenseConst.UPDATE_LICENSE_SUCCESS,
});
const updateFailure = (
  payload: LicenseFailurePayload
): UpdateLicenseFailure => ({
  type: licenseConst.UPDATE_LICENSE_FAILURE,
  payload,
});

//REMOVE
const remove = (payload: LicenseRequestPayload): RemoveLicenseRequest => ({
  type: licenseConst.REMOVE_LICENSE_REQUEST,
  payload,
});
const removeSuccess = (): RemoveLicenseSuccess => ({
  type: licenseConst.REMOVE_LICENSE_SUCCESS,
});
const removeFailure = (
  payload: LicenseFailurePayload
): RemoveLicenseFailure => ({
  type: licenseConst.REMOVE_LICENSE_FAILURE,
  payload,
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
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setLicense,
  clearLicense,
  setLicenses,
  clearLicenses,
};
