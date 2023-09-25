import { companyConst } from "./constant";
import { CompanyActions, CompanyState } from "./type";

const initialState: CompanyState = {
  company: null,
  companies: [],
  selectData: [],
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
        selectData: action.payload.companies.map((company) => ({
          value: company.id as string,
          label: company.name,
        })),
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
      };
    case companyConst.CREATE_COMPANY_FAILURE:
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
      };
    case companyConst.REMOVE_COMPANY_FAILURE:
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
