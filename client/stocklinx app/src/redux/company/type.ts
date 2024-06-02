import { ICompany } from "@interfaces/serverInterfaces";
import { companyConst } from "./constant";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

export type CompanyState = {
  company: ICompany | null;
  companies: ICompany[];
};
export type CompanyRequestPayload = {
  id: string;
};
export type CompanyPayload = {
  company: ICompany;
};
export type CompaniesPayload = {
  companies: ICompany[];
};
export type CompanyRemovePayload = {
  id: string;
};
export type CompanyRemoveRangePayload = {
  ids: string[];
};

//GET
export type FetchCompaniesRequest = {
  type: typeof companyConst.FETCH_COMPANIES_REQUEST;
};
export type FetchCompaniesSuccess = {
  type: typeof companyConst.FETCH_COMPANIES_SUCCESS;
  payload: CompaniesPayload;
};
export type FetchCompaniesFailure = {
  type: typeof companyConst.FETCH_COMPANIES_FAILURE;
};

//GET:/ID
export type FetchCompanyRequest = {
  type: typeof companyConst.FETCH_COMPANY_REQUEST;
  payload: CompanyRequestPayload;
};
export type FetchCompanySuccess = {
  type: typeof companyConst.FETCH_COMPANY_SUCCESS;
  payload: CompanyPayload;
};
export type FetchCompanyFailure = {
  type: typeof companyConst.FETCH_COMPANY_FAILURE;
};

//POST
export type CreateCompanyRequest = {
  type: typeof companyConst.CREATE_COMPANY_REQUEST;
  payload: CompanyPayload;
};
export type CreateCompanySuccess = {
  type: typeof companyConst.CREATE_COMPANY_SUCCESS;
  payload: CompanyPayload;
};
export type CreateCompanyFailure = {
  type: typeof companyConst.CREATE_COMPANY_FAILURE;
};

//POST RANGE
export type CreateRangeCompanyRequest = {
  type: typeof companyConst.CREATE_RANGE_COMPANY_REQUEST;
  payload: CompaniesPayload;
};
export type CreateRangeCompanySuccess = {
  type: typeof companyConst.CREATE_RANGE_COMPANY_SUCCESS;
  payload: CompaniesPayload;
};
export type CreateRangeCompanyFailure = {
  type: typeof companyConst.CREATE_RANGE_COMPANY_FAILURE;
};

//PUT
export type UpdateCompanyRequest = {
  type: typeof companyConst.UPDATE_COMPANY_REQUEST;
  payload: CompanyPayload;
};
export type UpdateCompanySuccess = {
  type: typeof companyConst.UPDATE_COMPANY_SUCCESS;
  payload: CompanyPayload;
};
export type UpdateCompanyFailure = {
  type: typeof companyConst.UPDATE_COMPANY_FAILURE;
};

//REMOVE
export type RemoveCompanyRequest = {
  type: typeof companyConst.REMOVE_COMPANY_REQUEST;
  payload: CompanyRemovePayload;
};
export type RemoveCompanySuccess = {
  type: typeof companyConst.REMOVE_COMPANY_SUCCESS;
  payload: CompanyRemovePayload;
};
export type RemoveCompanyFailure = {
  type: typeof companyConst.REMOVE_COMPANY_FAILURE;
};

//REMOVE RANGE
export type RemoveRangeCompanyRequest = {
  type: typeof companyConst.REMOVE_RANGE_COMPANY_REQUEST;
  payload: CompanyRemoveRangePayload;
};
export type RemoveRangeCompanySuccess = {
  type: typeof companyConst.REMOVE_RANGE_COMPANY_SUCCESS;
  payload: CompanyRemoveRangePayload;
};
export type RemoveRangeCompanyFailure = {
  type: typeof companyConst.REMOVE_RANGE_COMPANY_FAILURE;
};

//FILTER
export type FilterCompaniesRequest = {
  type: typeof companyConst.FILTER_COMPANIES_REQUEST;
  payload: QueryFilter[];
};
export type FilterCompaniesSuccess = {
  type: typeof companyConst.FILTER_COMPANIES_SUCCESS;
  payload: CompaniesPayload;
};
export type FilterCompaniesFailure = {
  type: typeof companyConst.FILTER_COMPANIES_FAILURE;
};

//CLIENT ACTION TYPES
export type SetCompany = {
  type: typeof companyConst.SET_COMPANY;
  payload: ICompany | null;
};
export type SetCompanies = {
  type: typeof companyConst.SET_COMPANIES;
  payload: ICompany[];
};
export type ClearCompany = {
  type: typeof companyConst.CLEAR_COMPANY;
};
export type ClearCompanies = {
  type: typeof companyConst.CLEAR_COMPANIES;
};

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
  | FilterCompaniesRequest
  | FilterCompaniesSuccess
  | FilterCompaniesFailure
  | SetCompany
  | SetCompanies
  | ClearCompany
  | ClearCompanies;
