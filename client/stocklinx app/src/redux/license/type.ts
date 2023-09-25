import { ILicense, SelectData } from "../../interfaces/interfaces";
import { licenseConst } from "./constant";

export interface LicenseState {
  license: ILicense | null;
  licenses: ILicense[];
  selectData: SelectData[];
}

export interface LicenseSucccessPayload {
  license: ILicense;
}
export interface LicensesSucccessPayload {
  licenses: ILicense[];
}
export interface LicenseRequestPayload {
  id: string;
}
export interface UpdateLicenseRequestPayload {
  license: ILicense;
}

//GET
export interface FetchLicensesRequest {
  type: typeof licenseConst.FETCH_LICENSES_REQUEST;
}
export type FetchLicensesSuccess = {
  type: typeof licenseConst.FETCH_LICENSES_SUCCESS;
  payload: LicensesSucccessPayload;
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
  payload: LicenseSucccessPayload;
};
export type FetchLicenseFailure = {
  type: typeof licenseConst.FETCH_LICENSE_FAILURE;
};
//POST
export interface CreateLicenseRequest {
  type: typeof licenseConst.CREATE_LICENSE_REQUEST;
  payload: UpdateLicenseRequestPayload;
}
export type CreateLicenseSuccess = {
  type: typeof licenseConst.CREATE_LICENSE_SUCCESS;
};
export type CreateLicenseFailure = {
  type: typeof licenseConst.CREATE_LICENSE_FAILURE;
};
//PUT
export interface UpdateLicenseRequest {
  type: typeof licenseConst.UPDATE_LICENSE_REQUEST;
  payload: UpdateLicenseRequestPayload;
}
export type UpdateLicenseSuccess = {
  type: typeof licenseConst.UPDATE_LICENSE_SUCCESS;
};
export type UpdateLicenseFailure = {
  type: typeof licenseConst.UPDATE_LICENSE_FAILURE;
};
//REMOVE
export interface RemoveLicenseRequest {
  type: typeof licenseConst.REMOVE_LICENSE_REQUEST;
  payload: LicenseRequestPayload;
}
export type RemoveLicenseSuccess = {
  type: typeof licenseConst.REMOVE_LICENSE_SUCCESS;
};
export type RemoveLicenseFailure = {
  type: typeof licenseConst.REMOVE_LICENSE_FAILURE;
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
  | UpdateLicenseRequest
  | UpdateLicenseSuccess
  | UpdateLicenseFailure
  | RemoveLicenseRequest
  | RemoveLicenseSuccess
  | RemoveLicenseFailure
  | SetLicense
  | SetLicenses
  | ClearLicense
  | ClearLicenses;
