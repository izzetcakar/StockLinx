import {
  AssetProductCheckInPayload,
  CheckInOutPayload,
  UserProductCheckInPayload,
} from "../../interfaces/clientInterfaces";
import {
  IAssetProduct,
  ILicense,
  IUserProduct,
} from "../../interfaces/serverInterfaces";
import { licenseConst } from "./constant";

export type LicenseState = {
  license: ILicense | null;
  licenses: ILicense[];
};
export type LicenseRequestPayload = {
  id: string;
};
export type LicensePayload = {
  license: ILicense;
};
export type LicensesPayload = {
  licenses: ILicense[];
};
export type LicenseRemoveRangePayload = {
  ids: string[];
};
export type LicenseRemovePayload = {
  id: string;
};

//GET
export type FetchLicensesRequest = {
  type: typeof licenseConst.FETCH_LICENSES_REQUEST;
};
export type FetchLicensesSuccess = {
  type: typeof licenseConst.FETCH_LICENSES_SUCCESS;
  payload: LicensesPayload;
};
export type FetchLicensesFailure = {
  type: typeof licenseConst.FETCH_LICENSES_FAILURE;
};

//GET:/ID
export type FetchLicenseRequest = {
  type: typeof licenseConst.FETCH_LICENSE_REQUEST;
  payload: LicenseRequestPayload;
};
export type FetchLicenseSuccess = {
  type: typeof licenseConst.FETCH_LICENSE_SUCCESS;
  payload: LicensePayload;
};
export type FetchLicenseFailure = {
  type: typeof licenseConst.FETCH_LICENSE_FAILURE;
};

//POST
export type CreateLicenseRequest = {
  type: typeof licenseConst.CREATE_LICENSE_REQUEST;
  payload: LicensePayload;
};
export type CreateLicenseSuccess = {
  type: typeof licenseConst.CREATE_LICENSE_SUCCESS;
  payload: LicensePayload;
};
export type CreateLicenseFailure = {
  type: typeof licenseConst.CREATE_LICENSE_FAILURE;
};

//POST RANGE
export type CreateRangeLicenseRequest = {
  type: typeof licenseConst.CREATE_RANGE_LICENSE_REQUEST;
  payload: LicensesPayload;
};
export type CreateRangeLicenseSuccess = {
  type: typeof licenseConst.CREATE_RANGE_LICENSE_SUCCESS;
  payload: LicensesPayload;
};
export type CreateRangeLicenseFailure = {
  type: typeof licenseConst.CREATE_RANGE_LICENSE_FAILURE;
};

//PUT
export type UpdateLicenseRequest = {
  type: typeof licenseConst.UPDATE_LICENSE_REQUEST;
  payload: LicensePayload;
};
export type UpdateLicenseSuccess = {
  type: typeof licenseConst.UPDATE_LICENSE_SUCCESS;
  payload: LicensePayload;
};
export type UpdateLicenseFailure = {
  type: typeof licenseConst.UPDATE_LICENSE_FAILURE;
};

//REMOVE
export type RemoveLicenseRequest = {
  type: typeof licenseConst.REMOVE_LICENSE_REQUEST;
  payload: LicenseRemovePayload;
};
export type RemoveLicenseSuccess = {
  type: typeof licenseConst.REMOVE_LICENSE_SUCCESS;
  payload: LicenseRemovePayload;
};
export type RemoveLicenseFailure = {
  type: typeof licenseConst.REMOVE_LICENSE_FAILURE;
};

//REMOVE RANGE
export type RemoveRangeLicenseRequest = {
  type: typeof licenseConst.REMOVE_RANGE_LICENSE_REQUEST;
  payload: LicenseRemoveRangePayload;
};
export type RemoveRangeLicenseSuccess = {
  type: typeof licenseConst.REMOVE_RANGE_LICENSE_SUCCESS;
  payload: LicenseRemoveRangePayload;
};
export type RemoveRangeLicenseFailure = {
  type: typeof licenseConst.REMOVE_RANGE_LICENSE_FAILURE;
};

//CHECK IN
export type UserCheckInLicenseRequest = {
  type: typeof licenseConst.USER_CHECK_IN_LICENSE_REQUEST;
  payload: UserProductCheckInPayload;
};
export type UserCheckInLicenseSuccess = {
  type: typeof licenseConst.USER_CHECK_IN_LICENSE_SUCCESS;
  payload: CheckInOutPayload;
};
export type UserCheckInLicenseFailure = {
  type: typeof licenseConst.USER_CHECK_IN_LICENSE_FAILURE;
};

export type AssetCheckInLicenseRequest = {
  type: typeof licenseConst.ASSET_CHECK_IN_LICENSE_REQUEST;
  payload: AssetProductCheckInPayload;
};
export type AssetCheckInLicenseSuccess = {
  type: typeof licenseConst.ASSET_CHECK_IN_LICENSE_SUCCESS;
  payload: CheckInOutPayload;
};
export type AssetCheckInLicenseFailure = {
  type: typeof licenseConst.ASSET_CHECK_IN_LICENSE_FAILURE;
};

//CHECK OUT
export type UserCheckOutLicenseRequest = {
  type: typeof licenseConst.USER_CHECK_OUT_LICENSE_REQUEST;
  payload: IUserProduct;
};
export type UserCheckOutLicenseSuccess = {
  type: typeof licenseConst.USER_CHECK_OUT_LICENSE_SUCCESS;
  payload: CheckInOutPayload;
};
export type UserCheckOutLicenseFailure = {
  type: typeof licenseConst.USER_CHECK_OUT_LICENSE_FAILURE;
};

export type AssetCheckOutLicenseRequest = {
  type: typeof licenseConst.ASSET_CHECK_OUT_LICENSE_REQUEST;
  payload: IAssetProduct;
};
export type AssetCheckOutLicenseSuccess = {
  type: typeof licenseConst.ASSET_CHECK_OUT_LICENSE_SUCCESS;
  payload: CheckInOutPayload;
};
export type AssetCheckOutLicenseFailure = {
  type: typeof licenseConst.ASSET_CHECK_OUT_LICENSE_FAILURE;
};

//CLIENT ACTION TYPES
export type SetLicense = {
  type: typeof licenseConst.SET_LICENSE;
  payload: ILicense | null;
};
export type SetLicenses = {
  type: typeof licenseConst.SET_LICENSES;
  payload: ILicense[];
};
export type ClearLicense = {
  type: typeof licenseConst.CLEAR_LICENSE;
};
export type ClearLicenses = {
  type: typeof licenseConst.CLEAR_LICENSES;
};

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
  | UserCheckInLicenseRequest
  | UserCheckInLicenseSuccess
  | UserCheckInLicenseFailure
  | AssetCheckInLicenseRequest
  | AssetCheckInLicenseSuccess
  | AssetCheckInLicenseFailure
  | UserCheckOutLicenseRequest
  | UserCheckOutLicenseSuccess
  | UserCheckOutLicenseFailure
  | AssetCheckOutLicenseRequest
  | AssetCheckOutLicenseSuccess
  | AssetCheckOutLicenseFailure
  | SetLicense
  | SetLicenses
  | ClearLicense
  | ClearLicenses;
