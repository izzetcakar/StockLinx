import { ISupplier } from "../../interfaces/interfaces";
import { supplierConst } from "./constant";

export interface SupplierState {
  supplier: ISupplier | null;
  suppliers: ISupplier[];
}
export interface SupplierRequestPayload {
  id: string;
}
export interface SupplierPayload {
  supplier: ISupplier;
}
export interface SuppliersPayload {
  suppliers: ISupplier[];
}
export interface SupplierRemoveRangePayload {
  ids: string[];
}
export interface SupplierRemovePayload {
  id: string;
}

//GET
export interface FetchSuppliersRequest {
  type: typeof supplierConst.FETCH_SUPPLIERS_REQUEST;
}
export type FetchSuppliersSuccess = {
  type: typeof supplierConst.FETCH_SUPPLIERS_SUCCESS;
  payload: SuppliersPayload;
};
export type FetchSuppliersFailure = {
  type: typeof supplierConst.FETCH_SUPPLIERS_FAILURE;
};
//GET:/ID
export interface FetchSupplierRequest {
  type: typeof supplierConst.FETCH_SUPPLIER_REQUEST;
  payload: SupplierRequestPayload;
}
export type FetchSupplierSuccess = {
  type: typeof supplierConst.FETCH_SUPPLIER_SUCCESS;
  payload: SupplierPayload;
};
export type FetchSupplierFailure = {
  type: typeof supplierConst.FETCH_SUPPLIER_FAILURE;
};
//POST
export interface CreateSupplierRequest {
  type: typeof supplierConst.CREATE_SUPPLIER_REQUEST;
  payload: SupplierPayload;
}
export type CreateSupplierSuccess = {
  type: typeof supplierConst.CREATE_SUPPLIER_SUCCESS;
  payload: SupplierPayload;
};
export type CreateSupplierFailure = {
  type: typeof supplierConst.CREATE_SUPPLIER_FAILURE;
};
//POST RANGE
export interface CreateRangeSupplierRequest {
  type: typeof supplierConst.CREATE_RANGE_SUPPLIER_REQUEST;
  payload: SuppliersPayload;
}
export type CreateRangeSupplierSuccess = {
  type: typeof supplierConst.CREATE_RANGE_SUPPLIER_SUCCESS;
  payload: SuppliersPayload;
};
export type CreateRangeSupplierFailure = {
  type: typeof supplierConst.CREATE_RANGE_SUPPLIER_FAILURE;
};
//PUT
export interface UpdateSupplierRequest {
  type: typeof supplierConst.UPDATE_SUPPLIER_REQUEST;
  payload: SupplierPayload;
}
export type UpdateSupplierSuccess = {
  type: typeof supplierConst.UPDATE_SUPPLIER_SUCCESS;
};
export type UpdateSupplierFailure = {
  type: typeof supplierConst.UPDATE_SUPPLIER_FAILURE;
};
//REMOVE
export interface RemoveSupplierRequest {
  type: typeof supplierConst.REMOVE_SUPPLIER_REQUEST;
  payload: SupplierRemovePayload;
}
export type RemoveSupplierSuccess = {
  type: typeof supplierConst.REMOVE_SUPPLIER_SUCCESS;
  payload: SupplierRemovePayload;
};
export type RemoveSupplierFailure = {
  type: typeof supplierConst.REMOVE_SUPPLIER_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeSupplierRequest {
  type: typeof supplierConst.REMOVE_RANGE_SUPPLIER_REQUEST;
  payload: SupplierRemoveRangePayload;
}
export type RemoveRangeSupplierSuccess = {
  type: typeof supplierConst.REMOVE_RANGE_SUPPLIER_SUCCESS;
  payload: SupplierRemoveRangePayload;
};
export type RemoveRangeSupplierFailure = {
  type: typeof supplierConst.REMOVE_RANGE_SUPPLIER_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetSupplier {
  type: typeof supplierConst.SET_SUPPLIER;
  payload: ISupplier | null;
}
export interface SetSuppliers {
  type: typeof supplierConst.SET_SUPPLIERS;
  payload: ISupplier[];
}
export interface ClearSupplier {
  type: typeof supplierConst.CLEAR_SUPPLIER;
}
export interface ClearSuppliers {
  type: typeof supplierConst.CLEAR_SUPPLIERS;
}

export type SupplierActions =
  | FetchSuppliersRequest
  | FetchSuppliersSuccess
  | FetchSuppliersFailure
  | FetchSupplierRequest
  | FetchSupplierSuccess
  | FetchSupplierFailure
  | CreateSupplierRequest
  | CreateSupplierSuccess
  | CreateSupplierFailure
  | CreateRangeSupplierRequest
  | CreateRangeSupplierSuccess
  | CreateRangeSupplierFailure
  | UpdateSupplierRequest
  | UpdateSupplierSuccess
  | UpdateSupplierFailure
  | RemoveSupplierRequest
  | RemoveSupplierSuccess
  | RemoveSupplierFailure
  | RemoveRangeSupplierRequest
  | RemoveRangeSupplierSuccess
  | RemoveRangeSupplierFailure
  | SetSupplier
  | SetSuppliers
  | ClearSupplier
  | ClearSuppliers;
