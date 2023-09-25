import { ICompany, SelectData } from "../../interfaces/interfaces";
import { companyConst } from "./constant";

export interface CompanyState {
  company: ICompany | null;
  companies: ICompany[];
  selectData: SelectData[];
}

export interface CompanySucccessPayload {
  company: ICompany;
}
export interface CompaniesSucccessPayload {
  companies: ICompany[];
}
export interface CompanyRequestPayload {
  id: string;
}
export interface UpdateCompanyRequestPayload {
  company: ICompany;
}

//GET
export interface FetchCompaniesRequest {
  type: typeof companyConst.FETCH_COMPANIES_REQUEST;
}
export type FetchCompaniesSuccess = {
  type: typeof companyConst.FETCH_COMPANIES_SUCCESS;
  payload: CompaniesSucccessPayload;
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
  payload: CompanySucccessPayload;
};
export type FetchCompanyFailure = {
  type: typeof companyConst.FETCH_COMPANY_FAILURE;
};
//POST
export interface CreateCompanyRequest {
  type: typeof companyConst.CREATE_COMPANY_REQUEST;
  payload: UpdateCompanyRequestPayload;
}
export type CreateCompanySuccess = {
  type: typeof companyConst.CREATE_COMPANY_SUCCESS;
};
export type CreateCompanyFailure = {
  type: typeof companyConst.CREATE_COMPANY_FAILURE;
};
//PUT
export interface UpdateCompanyRequest {
  type: typeof companyConst.UPDATE_COMPANY_REQUEST;
  payload: UpdateCompanyRequestPayload;
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
  payload: CompanyRequestPayload;
}
export type RemoveCompanySuccess = {
  type: typeof companyConst.REMOVE_COMPANY_SUCCESS;
};
export type RemoveCompanyFailure = {
  type: typeof companyConst.REMOVE_COMPANY_FAILURE;
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
  | UpdateCompanyRequest
  | UpdateCompanySuccess
  | UpdateCompanyFailure
  | RemoveCompanyRequest
  | RemoveCompanySuccess
  | RemoveCompanyFailure
  | SetCompany
  | SetCompanies
  | ClearCompany
  | ClearCompanies;
