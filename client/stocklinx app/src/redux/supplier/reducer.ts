import { supplierConst } from "./constant";
import { SupplierActions, SupplierState } from "./type";

const initialState: SupplierState = {
  supplier: null,
  suppliers: [],
  selectData: [],
};

export default (state = initialState, action: SupplierActions) => {
  switch (action.type) {
    case supplierConst.FETCH_SUPPLIERS_REQUEST:
      return {
        ...state,
      };
    case supplierConst.FETCH_SUPPLIERS_SUCCESS:
      return {
        ...state,
        suppliers: action.payload.suppliers,
        selectData: action.payload.suppliers.map((supplier) => ({
          value: supplier.id as string,
          label: supplier.name,
        })),
      };
    case supplierConst.FETCH_SUPPLIERS_FAILURE:
      return {
        ...state,
        suppliers: [],
      };
    case supplierConst.FETCH_SUPPLIER_REQUEST:
      return {
        ...state,
      };
    case supplierConst.FETCH_SUPPLIER_SUCCESS:
      return {
        ...state,
        supplier: action.payload.supplier,
      };
    case supplierConst.FETCH_SUPPLIER_FAILURE:
      return {
        ...state,
        supplier: null,
      };
    case supplierConst.CREATE_SUPPLIER_REQUEST:
      return {
        ...state,
      };
    case supplierConst.CREATE_SUPPLIER_SUCCESS:
      return {
        ...state,
      };
    case supplierConst.CREATE_SUPPLIER_FAILURE:
      return {
        ...state,
      };
    case supplierConst.UPDATE_SUPPLIER_REQUEST:
      return {
        ...state,
      };
    case supplierConst.UPDATE_SUPPLIER_SUCCESS:
      return {
        ...state,
      };
    case supplierConst.UPDATE_SUPPLIER_FAILURE:
      return {
        ...state,
      };
    case supplierConst.REMOVE_SUPPLIER_REQUEST:
      return {
        ...state,
      };
    case supplierConst.REMOVE_SUPPLIER_SUCCESS:
      return {
        ...state,
      };
    case supplierConst.REMOVE_SUPPLIER_FAILURE:
      return {
        ...state,
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
