import { ISupplier, SelectData } from "../../interfaces/interfaces";
import { supplierConst } from "./constant";

export interface SupplierState {
  supplier: ISupplier | null;
  suppliers: ISupplier[];
  selectData: SelectData[];
  pending: boolean;
  error: string | null;
}

export interface SupplierSucccessPayload {
  supplier: ISupplier;
}
export interface SuppliersSucccessPayload {
  suppliers: ISupplier[];
}
export interface SupplierFailurePayload {
  error: string;
}
export interface SupplierRequestPayload {
  id: string;
}
export interface UpdateSupplierRequestPayload {
  supplier: ISupplier;
}

//GET
export interface FetchSuppliersRequest {
  type: typeof supplierConst.FETCH_SUPPLIERS_REQUEST;
}
export type FetchSuppliersSuccess = {
  type: typeof supplierConst.FETCH_SUPPLIERS_SUCCESS;
  payload: SuppliersSucccessPayload;
};
export type FetchSuppliersFailure = {
  type: typeof supplierConst.FETCH_SUPPLIERS_FAILURE;
  payload: SupplierFailurePayload;
};
//GET:/ID
export interface FetchSupplierRequest {
  type: typeof supplierConst.FETCH_SUPPLIER_REQUEST;
  payload: SupplierRequestPayload;
}
export type FetchSupplierSuccess = {
  type: typeof supplierConst.FETCH_SUPPLIER_SUCCESS;
  payload: SupplierSucccessPayload;
};
export type FetchSupplierFailure = {
  type: typeof supplierConst.FETCH_SUPPLIER_FAILURE;
  payload: SupplierFailurePayload;
};
//POST
export interface CreateSupplierRequest {
  type: typeof supplierConst.CREATE_SUPPLIER_REQUEST;
  payload: UpdateSupplierRequestPayload;
}
export type CreateSupplierSuccess = {
  type: typeof supplierConst.CREATE_SUPPLIER_SUCCESS;
};
export type CreateSupplierFailure = {
  type: typeof supplierConst.CREATE_SUPPLIER_FAILURE;
  payload: SupplierFailurePayload;
};
//PUT
export interface UpdateSupplierRequest {
  type: typeof supplierConst.UPDATE_SUPPLIER_REQUEST;
  payload: UpdateSupplierRequestPayload;
}
export type UpdateSupplierSuccess = {
  type: typeof supplierConst.UPDATE_SUPPLIER_SUCCESS;
};
export type UpdateSupplierFailure = {
  type: typeof supplierConst.UPDATE_SUPPLIER_FAILURE;
  payload: SupplierFailurePayload;
};
//REMOVE
export interface RemoveSupplierRequest {
  type: typeof supplierConst.REMOVE_SUPPLIER_REQUEST;
  payload: SupplierRequestPayload;
}
export type RemoveSupplierSuccess = {
  type: typeof supplierConst.REMOVE_SUPPLIER_SUCCESS;
};
export type RemoveSupplierFailure = {
  type: typeof supplierConst.REMOVE_SUPPLIER_FAILURE;
  payload: SupplierFailurePayload;
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
  | UpdateSupplierRequest
  | UpdateSupplierSuccess
  | UpdateSupplierFailure
  | RemoveSupplierRequest
  | RemoveSupplierSuccess
  | RemoveSupplierFailure
  | SetSupplier
  | SetSuppliers
  | ClearSupplier
  | ClearSuppliers;
