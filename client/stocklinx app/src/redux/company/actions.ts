import { ICompany } from "../../interfaces/interfaces";
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
  CompaniesSucccessPayload,
  FetchCompaniesSuccess,
  FetchCompanyFailure,
  FetchCompanyRequest,
  FetchCompanySuccess,
  UpdateCompanyFailure,
  UpdateCompanyRequest,
  UpdateCompanySuccess,
  CompanyRequestPayload,
  UpdateCompanyRequestPayload,
  CompanySucccessPayload,
  SetCompany,
  SetCompanies,
  ClearCompany,
  ClearCompanies,
} from "./type";

//GET
const getAll = (): FetchCompaniesRequest => ({
  type: companyConst.FETCH_COMPANIES_REQUEST,
});
const getAllSuccess = (
  payload: CompaniesSucccessPayload
): FetchCompaniesSuccess => ({
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
const getSuccess = (payload: CompanySucccessPayload): FetchCompanySuccess => ({
  type: companyConst.FETCH_COMPANY_SUCCESS,
  payload,
});
const getFailure = (): FetchCompanyFailure => ({
  type: companyConst.FETCH_COMPANY_FAILURE,
});

//POST
const create = (
  payload: UpdateCompanyRequestPayload
): CreateCompanyRequest => ({
  type: companyConst.CREATE_COMPANY_REQUEST,
  payload,
});
const createSuccess = (): CreateCompanySuccess => ({
  type: companyConst.CREATE_COMPANY_SUCCESS,
});
const createFailure = (): CreateCompanyFailure => ({
  type: companyConst.CREATE_COMPANY_FAILURE,
});

//PUT
const update = (
  payload: UpdateCompanyRequestPayload
): UpdateCompanyRequest => ({
  type: companyConst.UPDATE_COMPANY_REQUEST,
  payload,
});
const updateSuccess = (): UpdateCompanySuccess => ({
  type: companyConst.UPDATE_COMPANY_SUCCESS,
});
const updateFailure = (): UpdateCompanyFailure => ({
  type: companyConst.UPDATE_COMPANY_FAILURE,
});

//REMOVE
const remove = (payload: CompanyRequestPayload): RemoveCompanyRequest => ({
  type: companyConst.REMOVE_COMPANY_REQUEST,
  payload,
});
const removeSuccess = (): RemoveCompanySuccess => ({
  type: companyConst.REMOVE_COMPANY_SUCCESS,
});
const removeFailure = (): RemoveCompanyFailure => ({
  type: companyConst.REMOVE_COMPANY_FAILURE,
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
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setCompany,
  clearCompany,
  setCompanies,
  clearCompanies,
};
