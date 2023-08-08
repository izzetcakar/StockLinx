import { supplierConst } from "./constant";
import { SupplierActions, SupplierState } from "./type";

const initialState: SupplierState = {
  supplier: null,
  suppliers: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: SupplierActions) => {
  switch (action.type) {
    case supplierConst.FETCH_SUPPLIERS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case supplierConst.FETCH_SUPPLIERS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        suppliers: action.payload.suppliers,
        selectData: action.payload.suppliers.map((supplier) => ({
          value: supplier.id as string,
          label: supplier.name,
        })),
      };
    case supplierConst.FETCH_SUPPLIERS_FAILURE:
      return {
        ...state,
        pending: false,
        suppliers: [],
        error: action.payload.error,
      };
    case supplierConst.FETCH_SUPPLIER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case supplierConst.FETCH_SUPPLIER_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        supplier: action.payload.supplier,
      };
    case supplierConst.FETCH_SUPPLIER_FAILURE:
      return {
        ...state,
        pending: false,
        supplier: null,
        error: action.payload.error,
      };
    case supplierConst.CREATE_SUPPLIER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case supplierConst.CREATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case supplierConst.CREATE_SUPPLIER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case supplierConst.UPDATE_SUPPLIER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case supplierConst.UPDATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case supplierConst.UPDATE_SUPPLIER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case supplierConst.REMOVE_SUPPLIER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case supplierConst.REMOVE_SUPPLIER_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case supplierConst.REMOVE_SUPPLIER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case supplierConst.SET_SUPPLIER:
      return {
        ...state,
        supplier: action.payload,
      };
    case supplierConst.CLEAR_SUPPLIER:
      return {
        ...state,
        supplier: null,
      };
    case supplierConst.SET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload,
      };
    case supplierConst.CLEAR_SUPPLIERS:
      return {
        ...state,
        suppliers: [],
      };
    default:
      return { ...state };
  }
};
