import { ISupplier } from "../../interfaces/interfaces";
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
  SuppliersSucccessPayload,
  FetchSuppliersSuccess,
  FetchSupplierFailure,
  FetchSupplierRequest,
  FetchSupplierSuccess,
  UpdateSupplierFailure,
  UpdateSupplierRequest,
  UpdateSupplierSuccess,
  SupplierRequestPayload,
  UpdateSupplierRequestPayload,
  SupplierSucccessPayload,
  SetSupplier,
  SetSuppliers,
  ClearSupplier,
  ClearSuppliers,
} from "./type";

//GET
const getAll = (): FetchSuppliersRequest => ({
  type: supplierConst.FETCH_SUPPLIERS_REQUEST,
});
const getAllSuccess = (
  payload: SuppliersSucccessPayload
): FetchSuppliersSuccess => ({
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
const getSuccess = (
  payload: SupplierSucccessPayload
): FetchSupplierSuccess => ({
  type: supplierConst.FETCH_SUPPLIER_SUCCESS,
  payload,
});
const getFailure = (): FetchSupplierFailure => ({
  type: supplierConst.FETCH_SUPPLIER_FAILURE,
});

//POST
const create = (
  payload: UpdateSupplierRequestPayload
): CreateSupplierRequest => ({
  type: supplierConst.CREATE_SUPPLIER_REQUEST,
  payload,
});
const createSuccess = (): CreateSupplierSuccess => ({
  type: supplierConst.CREATE_SUPPLIER_SUCCESS,
});
const createFailure = (): CreateSupplierFailure => ({
  type: supplierConst.CREATE_SUPPLIER_FAILURE,
});

//PUT
const update = (
  payload: UpdateSupplierRequestPayload
): UpdateSupplierRequest => ({
  type: supplierConst.UPDATE_SUPPLIER_REQUEST,
  payload,
});
const updateSuccess = (): UpdateSupplierSuccess => ({
  type: supplierConst.UPDATE_SUPPLIER_SUCCESS,
});
const updateFailure = (): UpdateSupplierFailure => ({
  type: supplierConst.UPDATE_SUPPLIER_FAILURE,
});

//REMOVE
const remove = (payload: SupplierRequestPayload): RemoveSupplierRequest => ({
  type: supplierConst.REMOVE_SUPPLIER_REQUEST,
  payload,
});
const removeSuccess = (): RemoveSupplierSuccess => ({
  type: supplierConst.REMOVE_SUPPLIER_SUCCESS,
});
const removeFailure = (): RemoveSupplierFailure => ({
  type: supplierConst.REMOVE_SUPPLIER_FAILURE,
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
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
  setSupplier,
  clearSupplier,
  setSuppliers,
  clearSuppliers,
};
