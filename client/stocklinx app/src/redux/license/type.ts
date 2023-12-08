import { ILicense } from "../../interfaces/interfaces";
import { licenseConst } from "./constant";

export interface LicenseState {
  license: ILicense | null;
  licenses: ILicense[];
}
export interface LicenseRequestPayload {
  id: string;
}
export interface LicensePayload {
  license: ILicense;
}
export interface LicensesPayload {
  licenses: ILicense[];
}
export interface LicenseRemoveRangePayload {
  ids: string[];
}
export interface LicenseRemovePayload {
  id: string;
}

//GET
export interface FetchLicensesRequest {
  type: typeof licenseConst.FETCH_LICENSES_REQUEST;
}
export type FetchLicensesSuccess = {
  type: typeof licenseConst.FETCH_LICENSES_SUCCESS;
  payload: LicensesPayload;
};
export type FetchLicensesFailure = {
  type: typeof licenseConst.FETCH_LICENSES_FAILURE;
};
//GET:/ID
export interface FetchLicenseRequest {
  type: typeof licenseConst.FETCH_LICENSE_REQUEST;
  payload: LicenseRequestPayload;
}
export type FetchLicenseSuccess = {
  type: typeof licenseConst.FETCH_LICENSE_SUCCESS;
  payload: LicensePayload;
};
export type FetchLicenseFailure = {
  type: typeof licenseConst.FETCH_LICENSE_FAILURE;
};
//POST
export interface CreateLicenseRequest {
  type: typeof licenseConst.CREATE_LICENSE_REQUEST;
  payload: LicensePayload;
}
export type CreateLicenseSuccess = {
  type: typeof licenseConst.CREATE_LICENSE_SUCCESS;
  payload: LicensePayload;
};
export type CreateLicenseFailure = {
  type: typeof licenseConst.CREATE_LICENSE_FAILURE;
};
//POST RANGE
export interface CreateRangeLicenseRequest {
  type: typeof licenseConst.CREATE_RANGE_LICENSE_REQUEST;
  payload: LicensesPayload;
}
export type CreateRangeLicenseSuccess = {
  type: typeof licenseConst.CREATE_RANGE_LICENSE_SUCCESS;
  payload: LicensesPayload;
};
export type CreateRangeLicenseFailure = {
  type: typeof licenseConst.CREATE_RANGE_LICENSE_FAILURE;
};
//PUT
export interface UpdateLicenseRequest {
  type: typeof licenseConst.UPDATE_LICENSE_REQUEST;
  payload: LicensePayload;
}
export type UpdateLicenseSuccess = {
  type: typeof licenseConst.UPDATE_LICENSE_SUCCESS;
  payload: LicensePayload;
};
export type UpdateLicenseFailure = {
  type: typeof licenseConst.UPDATE_LICENSE_FAILURE;
};
//REMOVE
export interface RemoveLicenseRequest {
  type: typeof licenseConst.REMOVE_LICENSE_REQUEST;
  payload: LicenseRemovePayload;
}
export type RemoveLicenseSuccess = {
  type: typeof licenseConst.REMOVE_LICENSE_SUCCESS;
  payload: LicenseRemovePayload;
};
export type RemoveLicenseFailure = {
  type: typeof licenseConst.REMOVE_LICENSE_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeLicenseRequest {
  type: typeof licenseConst.REMOVE_RANGE_LICENSE_REQUEST;
  payload: LicenseRemoveRangePayload;
}
export type RemoveRangeLicenseSuccess = {
  type: typeof licenseConst.REMOVE_RANGE_LICENSE_SUCCESS;
  payload: LicenseRemoveRangePayload;
};
export type RemoveRangeLicenseFailure = {
  type: typeof licenseConst.REMOVE_RANGE_LICENSE_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetLicense {
  type: typeof licenseConst.SET_LICENSE;
  payload: ILicense | null;
}
export interface SetLicenses {
  type: typeof licenseConst.SET_LICENSES;
  payload: ILicense[];
}
export interface ClearLicense {
  type: typeof licenseConst.CLEAR_LICENSE;
}
export interface ClearLicenses {
  type: typeof licenseConst.CLEAR_LICENSES;
}

export type LicenseActions =
  | FetchLicensesRequest
  | FetchLicensesSuccess
  | FetchLicensesFailure
  | FetchLicenseRequest
  | FetchLicenseSuccess
  | FetchLicenseFailure
  | CreateLicenseRequest
  | CreateLicenseSuccess
  | CreateLicenseFailure
  | CreateRangeLicenseRequest
  | CreateRangeLicenseSuccess
  | CreateRangeLicenseFailure
  | UpdateLicenseRequest
  | UpdateLicenseSuccess
  | UpdateLicenseFailure
  | RemoveLicenseRequest
  | RemoveLicenseSuccess
  | RemoveLicenseFailure
  | RemoveRangeLicenseRequest
  | RemoveRangeLicenseSuccess
  | RemoveRangeLicenseFailure
  | SetLicense
  | SetLicenses
  | ClearLicense
  | ClearLicenses;
