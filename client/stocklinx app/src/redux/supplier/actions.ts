import { ISupplier } from "@interfaces/serverInterfaces";
import { supplierConst } from "./constant";
import {
  CreateSupplierFailure,
  CreateSupplierRequest,
  CreateSupplierSuccess,
  RemoveSupplierFailure,
  RemoveSupplierRequest,
  RemoveSupplierSuccess,
  FetchSuppliersFailure,
  FetchSuppliersRequest,
  FetchSuppliersSuccess,
  FetchSupplierFailure,
  FetchSupplierRequest,
  FetchSupplierSuccess,
  UpdateSupplierFailure,
  UpdateSupplierRequest,
  UpdateSupplierSuccess,
  SupplierRequestPayload,
  SetSupplier,
  SetSuppliers,
  ClearSupplier,
  ClearSuppliers,
  SuppliersPayload,
  SupplierPayload,
  CreateRangeSupplierRequest,
  CreateRangeSupplierSuccess,
  CreateRangeSupplierFailure,
  RemoveRangeSupplierRequest,
  RemoveRangeSupplierSuccess,
  RemoveRangeSupplierFailure,
  SupplierRemoveRangePayload,
  SupplierRemovePayload,
  FilterSuppliersRequest,
  FilterSuppliersSuccess,
  FilterSuppliersFailure,
} from "./type";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

//GET
const getAll = (): FetchSuppliersRequest => ({
  type: supplierConst.FETCH_SUPPLIERS_REQUEST,
});
const getAllSuccess = (payload: SuppliersPayload): FetchSuppliersSuccess => ({
  type: supplierConst.FETCH_SUPPLIERS_SUCCESS,
  payload,
});
const getAllFailure = (): FetchSuppliersFailure => ({
  type: supplierConst.FETCH_SUPPLIERS_FAILURE,
});

//GET:/ID
const get = (payload: SupplierRequestPayload): FetchSupplierRequest => ({
  type: supplierConst.FETCH_SUPPLIER_REQUEST,
  payload,
});
const getSuccess = (payload: SupplierPayload): FetchSupplierSuccess => ({
  type: supplierConst.FETCH_SUPPLIER_SUCCESS,
  payload,
});
const getFailure = (): FetchSupplierFailure => ({
  type: supplierConst.FETCH_SUPPLIER_FAILURE,
});

//POST
const create = (payload: SupplierPayload): CreateSupplierRequest => ({
  type: supplierConst.CREATE_SUPPLIER_REQUEST,
  payload,
});
const createSuccess = (payload: SupplierPayload): CreateSupplierSuccess => ({
  type: supplierConst.CREATE_SUPPLIER_SUCCESS,
  payload,
});
const createFailure = (): CreateSupplierFailure => ({
  type: supplierConst.CREATE_SUPPLIER_FAILURE,
});

//POST RANGE
const createRange = (
  payload: SuppliersPayload
): CreateRangeSupplierRequest => ({
  type: supplierConst.CREATE_RANGE_SUPPLIER_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: SuppliersPayload
): CreateRangeSupplierSuccess => ({
  type: supplierConst.CREATE_RANGE_SUPPLIER_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeSupplierFailure => ({
  type: supplierConst.CREATE_RANGE_SUPPLIER_FAILURE,
});

//PUT
const update = (payload: SupplierPayload): UpdateSupplierRequest => ({
  type: supplierConst.UPDATE_SUPPLIER_REQUEST,
  payload,
});
const updateSuccess = (payload: SupplierPayload): UpdateSupplierSuccess => ({
  type: supplierConst.UPDATE_SUPPLIER_SUCCESS,
  payload,
});
const updateFailure = (): UpdateSupplierFailure => ({
  type: supplierConst.UPDATE_SUPPLIER_FAILURE,
});

//REMOVE
const remove = (payload: SupplierRemovePayload): RemoveSupplierRequest => ({
  type: supplierConst.REMOVE_SUPPLIER_REQUEST,
  payload,
});
const removeSuccess = (
  payload: SupplierRemovePayload
): RemoveSupplierSuccess => ({
  type: supplierConst.REMOVE_SUPPLIER_SUCCESS,
  payload,
});
const removeFailure = (): RemoveSupplierFailure => ({
  type: supplierConst.REMOVE_SUPPLIER_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: SupplierRemoveRangePayload
): RemoveRangeSupplierRequest => ({
  type: supplierConst.REMOVE_RANGE_SUPPLIER_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: SupplierRemoveRangePayload
): RemoveRangeSupplierSuccess => ({
  type: supplierConst.REMOVE_RANGE_SUPPLIER_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeSupplierFailure => ({
  type: supplierConst.REMOVE_RANGE_SUPPLIER_FAILURE,
});

//FILTER
const filter = (payload: QueryFilter[]): FilterSuppliersRequest => ({
  type: supplierConst.FILTER_SUPPLIERS_REQUEST,
  payload,
});
const filterSuccess = (payload: SuppliersPayload): FilterSuppliersSuccess => ({
  type: supplierConst.FILTER_SUPPLIERS_SUCCESS,
  payload,
});
const filterFailure = (): FilterSuppliersFailure => ({
  type: supplierConst.FILTER_SUPPLIERS_FAILURE,
});

//CLIENT ACTIONS
const setSupplier = (payload: ISupplier | null): SetSupplier => ({
  type: supplierConst.SET_SUPPLIER,
  payload,
});
const clearSupplier = (): ClearSupplier => ({
  type: supplierConst.CLEAR_SUPPLIER,
});
const setSuppliers = (payload: ISupplier[]): SetSuppliers => ({
  type: supplierConst.SET_SUPPLIERS,
  payload,
});
const clearSuppliers = (): ClearSuppliers => ({
  type: supplierConst.CLEAR_SUPPLIERS,
});

export const supplierActions = {
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
  setSupplier,
  clearSupplier,
  setSuppliers,
  clearSuppliers,
};
