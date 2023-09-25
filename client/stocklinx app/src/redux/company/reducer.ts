import {
  closeNotification,
  openNotification,
} from "../../components/notification/notification";
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
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case companyConst.FETCH_COMPANIES_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        companies: action.payload.companies,
        selectData: action.payload.companies.map((company) => ({
          value: company.id as string,
          label: company.name,
        })),
      };
    case companyConst.FETCH_COMPANIES_FAILURE:
      closeNotification();
      return {
        ...state,
        companies: [],
      };
    case companyConst.FETCH_COMPANY_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case companyConst.FETCH_COMPANY_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        company: action.payload.company,
      };
    case companyConst.FETCH_COMPANY_FAILURE:
      closeNotification();
      return {
        ...state,
        company: null,
      };
    case companyConst.CREATE_COMPANY_REQUEST:
      openNotification("Creating", true);
      return {
        ...state,
        pending: true,
      };
    case companyConst.CREATE_COMPANY_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
      };
    case companyConst.CREATE_COMPANY_FAILURE:
      closeNotification();
      return {
        ...state,
      };
    case companyConst.UPDATE_COMPANY_REQUEST:
      openNotification("Updating", true);
      return {
        ...state,
        pending: true,
      };
    case companyConst.UPDATE_COMPANY_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
      };
    case companyConst.UPDATE_COMPANY_FAILURE:
      closeNotification();
      return {
        ...state,
      };
    case companyConst.REMOVE_COMPANY_REQUEST:
      openNotification("Removing", true);
      return {
        ...state,
        pending: true,
      };
    case companyConst.REMOVE_COMPANY_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
      };
    case companyConst.REMOVE_COMPANY_FAILURE:
      closeNotification();
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
