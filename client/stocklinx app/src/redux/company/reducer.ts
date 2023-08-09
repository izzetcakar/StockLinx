import { companyConst } from "./constant";
import { CompanyActions, CompanyState } from "./type";

const initialState: CompanyState = {
  company: null,
  companies: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: CompanyActions) => {
  switch (action.type) {
    case companyConst.FETCH_COMPANIES_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case companyConst.FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        companies: action.payload.companies,
        selectData: action.payload.companies.map((company) => ({
          value: company.id as string,
          label: company.name,
        })),
      };
    case companyConst.FETCH_COMPANIES_FAILURE:
      return {
        ...state,
        pending: false,
        companies: [],
        error: action.payload.error,
      };
    case companyConst.FETCH_COMPANY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case companyConst.FETCH_COMPANY_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        company: action.payload.company,
      };
    case companyConst.FETCH_COMPANY_FAILURE:
      return {
        ...state,
        pending: false,
        company: null,
        error: action.payload.error,
      };
    case companyConst.CREATE_COMPANY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case companyConst.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case companyConst.CREATE_COMPANY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case companyConst.UPDATE_COMPANY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case companyConst.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case companyConst.UPDATE_COMPANY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case companyConst.REMOVE_COMPANY_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case companyConst.REMOVE_COMPANY_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case companyConst.REMOVE_COMPANY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case companyConst.SET_COMPANY:
      return {
        ...state,
        company: action.payload,
      };
    case companyConst.CLEAR_COMPANY:
      return {
        ...state,
        company: null,
      };
    case companyConst.SET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
      };
    case companyConst.CLEAR_COMPANIES:
      return {
        ...state,
        companies: [],
      };
    default:
      return { ...state };
  }
};