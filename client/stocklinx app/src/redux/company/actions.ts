import { ICompany } from "@interfaces/serverInterfaces";
import { companyConst } from "./constant";
import {
  CreateCompanyFailure,
  CreateCompanyRequest,
  CreateCompanySuccess,
  RemoveCompanyFailure,
  RemoveCompanyRequest,
  RemoveCompanySuccess,
  FetchCompaniesFailure,
  FetchCompaniesRequest,
  FetchCompaniesSuccess,
  FetchCompanyFailure,
  FetchCompanyRequest,
  FetchCompanySuccess,
  UpdateCompanyFailure,
  UpdateCompanyRequest,
  UpdateCompanySuccess,
  CompanyRequestPayload,
  SetCompany,
  SetCompanies,
  ClearCompany,
  ClearCompanies,
  CompaniesPayload,
  CompanyPayload,
  CreateRangeCompanyRequest,
  CreateRangeCompanySuccess,
  CreateRangeCompanyFailure,
  RemoveRangeCompanyRequest,
  RemoveRangeCompanySuccess,
  RemoveRangeCompanyFailure,
  CompanyRemoveRangePayload,
  CompanyRemovePayload,
  FilterCompaniesRequest,
  FilterCompaniesSuccess,
  FilterCompaniesFailure,
} from "./type";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

//GET
const getAll = (): FetchCompaniesRequest => ({
  type: companyConst.FETCH_COMPANIES_REQUEST,
});
const getAllSuccess = (payload: CompaniesPayload): FetchCompaniesSuccess => ({
  type: companyConst.FETCH_COMPANIES_SUCCESS,
  payload,
});
const getAllFailure = (): FetchCompaniesFailure => ({
  type: companyConst.FETCH_COMPANIES_FAILURE,
});

//GET:/ID
const get = (payload: CompanyRequestPayload): FetchCompanyRequest => ({
  type: companyConst.FETCH_COMPANY_REQUEST,
  payload,
});
const getSuccess = (payload: CompanyPayload): FetchCompanySuccess => ({
  type: companyConst.FETCH_COMPANY_SUCCESS,
  payload,
});
const getFailure = (): FetchCompanyFailure => ({
  type: companyConst.FETCH_COMPANY_FAILURE,
});

//POST
const create = (payload: CompanyPayload): CreateCompanyRequest => ({
  type: companyConst.CREATE_COMPANY_REQUEST,
  payload,
});
const createSuccess = (payload: CompanyPayload): CreateCompanySuccess => ({
  type: companyConst.CREATE_COMPANY_SUCCESS,
  payload,
});
const createFailure = (): CreateCompanyFailure => ({
  type: companyConst.CREATE_COMPANY_FAILURE,
});

//POST RANGE
const createRange = (payload: CompaniesPayload): CreateRangeCompanyRequest => ({
  type: companyConst.CREATE_RANGE_COMPANY_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: CompaniesPayload
): CreateRangeCompanySuccess => ({
  type: companyConst.CREATE_RANGE_COMPANY_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeCompanyFailure => ({
  type: companyConst.CREATE_RANGE_COMPANY_FAILURE,
});

//PUT
const update = (payload: CompanyPayload): UpdateCompanyRequest => ({
  type: companyConst.UPDATE_COMPANY_REQUEST,
  payload,
});
const updateSuccess = (payload: CompanyPayload): UpdateCompanySuccess => ({
  type: companyConst.UPDATE_COMPANY_SUCCESS,
  payload,
});
const updateFailure = (): UpdateCompanyFailure => ({
  type: companyConst.UPDATE_COMPANY_FAILURE,
});

//REMOVE
const remove = (payload: CompanyRemovePayload): RemoveCompanyRequest => ({
  type: companyConst.REMOVE_COMPANY_REQUEST,
  payload,
});
const removeSuccess = (
  payload: CompanyRemovePayload
): RemoveCompanySuccess => ({
  type: companyConst.REMOVE_COMPANY_SUCCESS,
  payload,
});
const removeFailure = (): RemoveCompanyFailure => ({
  type: companyConst.REMOVE_COMPANY_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: CompanyRemoveRangePayload
): RemoveRangeCompanyRequest => ({
  type: companyConst.REMOVE_RANGE_COMPANY_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: CompanyRemoveRangePayload
): RemoveRangeCompanySuccess => ({
  type: companyConst.REMOVE_RANGE_COMPANY_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeCompanyFailure => ({
  type: companyConst.REMOVE_RANGE_COMPANY_FAILURE,
});

//FILTER
const filter = (payload: QueryFilter[]): FilterCompaniesRequest => ({
  type: companyConst.FILTER_COMPANIES_REQUEST,
  payload,
});
const filterSuccess = (payload: CompaniesPayload): FilterCompaniesSuccess => ({
  type: companyConst.FILTER_COMPANIES_SUCCESS,
  payload,
});
const filterFailure = (): FilterCompaniesFailure => ({
  type: companyConst.FILTER_COMPANIES_FAILURE,
});

//CLIENT ACTIONS
const setCompany = (payload: ICompany | null): SetCompany => ({
  type: companyConst.SET_COMPANY,
  payload,
});
const clearCompany = (): ClearCompany => ({
  type: companyConst.CLEAR_COMPANY,
});
const setCompanies = (payload: ICompany[]): SetCompanies => ({
  type: companyConst.SET_COMPANIES,
  payload,
});
const clearCompanies = (): ClearCompanies => ({
  type: companyConst.CLEAR_COMPANIES,
});

export const companyActions = {
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
  filter,
  filterSuccess,
  filterFailure,
  setCompany,
  clearCompany,
  setCompanies,
  clearCompanies,
};
