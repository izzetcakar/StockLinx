import { companyConst } from "./constant";
import { CompanyActions, CompanyState } from "./type";

const initialState: CompanyState = {
  company: null,
  companies: [],
};

export default (state = initialState, action: CompanyActions) => {
  switch (action.type) {
    case companyConst.FETCH_COMPANIES_REQUEST:
      return {
        ...state,
      };
    case companyConst.FETCH_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: action.payload.companies,
      };
    case companyConst.FETCH_COMPANIES_FAILURE:
      return {
        ...state,
        companies: [],
      };
    case companyConst.FETCH_COMPANY_REQUEST:
      return {
        ...state,
      };
    case companyConst.FETCH_COMPANY_SUCCESS:
      return {
        ...state,
        company: action.payload.company,
      };
    case companyConst.FETCH_COMPANY_FAILURE:
      return {
        ...state,
        company: null,
      };
    case companyConst.CREATE_COMPANY_REQUEST:
      return {
        ...state,
      };
    case companyConst.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: [...state.companies, action.payload.company],
      };
    case companyConst.CREATE_COMPANY_FAILURE:
      return {
        ...state,
      };
    case companyConst.CREATE_RANGE_COMPANY_REQUEST:
      return {
        ...state,
      };
    case companyConst.CREATE_RANGE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: [...state.companies, ...action.payload.companies],
      };
    case companyConst.CREATE_RANGE_COMPANY_FAILURE:
      return {
        ...state,
      };
    case companyConst.UPDATE_COMPANY_REQUEST:
      return {
        ...state,
      };
    case companyConst.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload.company.id
            ? action.payload.company
            : company
        ),
      };
    case companyConst.UPDATE_COMPANY_FAILURE:
      return {
        ...state,
      };
    case companyConst.REMOVE_COMPANY_REQUEST:
      return {
        ...state,
      };
    case companyConst.REMOVE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company.id !== action.payload.id
        ),
      };
    case companyConst.REMOVE_COMPANY_FAILURE:
      return {
        ...state,
      };
    case companyConst.REMOVE_RANGE_COMPANY_REQUEST:
      return {
        ...state,
      };
    case companyConst.REMOVE_RANGE_COMPANY_SUCCESS:
      return {
        ...state,
        companies: state.companies.filter(
          (company) => !action.payload.ids.includes(company.id)
        ),
      };
    case companyConst.REMOVE_RANGE_COMPANY_FAILURE:
      return {
        ...state,
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
