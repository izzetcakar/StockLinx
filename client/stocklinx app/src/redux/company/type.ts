import { ICompany, SelectData } from "../../interfaces/interfaces";
import { companyConst } from "./constant";

export interface CompanyState {
  company: ICompany | null;
  companies: ICompany[];
  selectData: SelectData[];
}
export interface CompanyRequestPayload {
  id: string;
}
export interface CompanyPayload {
  company: ICompany;
}
export interface CompaniesPayload {
  companies: ICompany[];
}
export interface CompanyRemovePayload {
  id: string;
}
export interface CompanyRemoveRangePayload {
  ids: string[];
}

//GET
export interface FetchCompaniesRequest {
  type: typeof companyConst.FETCH_COMPANIES_REQUEST;
}
export type FetchCompaniesSuccess = {
  type: typeof companyConst.FETCH_COMPANIES_SUCCESS;
  payload: CompaniesPayload;
};
export type FetchCompaniesFailure = {
  type: typeof companyConst.FETCH_COMPANIES_FAILURE;
};
//GET:/ID
export interface FetchCompanyRequest {
  type: typeof companyConst.FETCH_COMPANY_REQUEST;
  payload: CompanyRequestPayload;
}
export type FetchCompanySuccess = {
  type: typeof companyConst.FETCH_COMPANY_SUCCESS;
  payload: CompanyPayload;
};
export type FetchCompanyFailure = {
  type: typeof companyConst.FETCH_COMPANY_FAILURE;
};
//POST
export interface CreateCompanyRequest {
  type: typeof companyConst.CREATE_COMPANY_REQUEST;
  payload: CompanyPayload;
}
export type CreateCompanySuccess = {
  type: typeof companyConst.CREATE_COMPANY_SUCCESS;
};
export type CreateCompanyFailure = {
  type: typeof companyConst.CREATE_COMPANY_FAILURE;
};
//POST RANGE
export interface CreateRangeCompanyRequest {
  type: typeof companyConst.CREATE_RANGE_COMPANY_REQUEST;
  payload: CompaniesPayload;
}
export type CreateRangeCompanySuccess = {
  type: typeof companyConst.CREATE_RANGE_COMPANY_SUCCESS;
};
export type CreateRangeCompanyFailure = {
  type: typeof companyConst.CREATE_RANGE_COMPANY_FAILURE;
};
//PUT
export interface UpdateCompanyRequest {
  type: typeof companyConst.UPDATE_COMPANY_REQUEST;
  payload: CompanyPayload;
}
export type UpdateCompanySuccess = {
  type: typeof companyConst.UPDATE_COMPANY_SUCCESS;
};
export type UpdateCompanyFailure = {
  type: typeof companyConst.UPDATE_COMPANY_FAILURE;
};
//REMOVE
export interface RemoveCompanyRequest {
  type: typeof companyConst.REMOVE_COMPANY_REQUEST;
  payload: CompanyRemovePayload;
}
export type RemoveCompanySuccess = {
  type: typeof companyConst.REMOVE_COMPANY_SUCCESS;
  payload: CompanyRemovePayload;
};
export type RemoveCompanyFailure = {
  type: typeof companyConst.REMOVE_COMPANY_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeCompanyRequest {
  type: typeof companyConst.REMOVE_RANGE_COMPANY_REQUEST;
  payload: CompanyRemoveRangePayload;
}
export type RemoveRangeCompanySuccess = {
  type: typeof companyConst.REMOVE_RANGE_COMPANY_SUCCESS;
  payload: CompanyRemoveRangePayload;
};
export type RemoveRangeCompanyFailure = {
  type: typeof companyConst.REMOVE_RANGE_COMPANY_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetCompany {
  type: typeof companyConst.SET_COMPANY;
  payload: ICompany | null;
}
export interface SetCompanies {
  type: typeof companyConst.SET_COMPANIES;
  payload: ICompany[];
}
export interface ClearCompany {
  type: typeof companyConst.CLEAR_COMPANY;
}
export interface ClearCompanies {
  type: typeof companyConst.CLEAR_COMPANIES;
}

export type CompanyActions =
  | FetchCompaniesRequest
  | FetchCompaniesSuccess
  | FetchCompaniesFailure
  | FetchCompanyRequest
  | FetchCompanySuccess
  | FetchCompanyFailure
  | CreateCompanyRequest
  | CreateCompanySuccess
  | CreateCompanyFailure
  | CreateRangeCompanyRequest
  | CreateRangeCompanySuccess
  | CreateRangeCompanyFailure
  | UpdateCompanyRequest
  | UpdateCompanySuccess
  | UpdateCompanyFailure
  | RemoveCompanyRequest
  | RemoveCompanySuccess
  | RemoveCompanyFailure
  | RemoveRangeCompanyRequest
  | RemoveRangeCompanySuccess
  | RemoveRangeCompanyFailure
  | SetCompany
  | SetCompanies
  | ClearCompany
  | ClearCompanies;
