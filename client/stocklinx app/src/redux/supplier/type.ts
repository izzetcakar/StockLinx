import { ISupplier } from "@interfaces/serverInterfaces";
import { supplierConst } from "./constant";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

export type SupplierState = {
  supplier: ISupplier | null;
  suppliers: ISupplier[];
};
export type SupplierRequestPayload = {
  id: string;
};
export type SupplierPayload = {
  supplier: ISupplier;
};
export type SuppliersPayload = {
  suppliers: ISupplier[];
};
export type SupplierRemoveRangePayload = {
  ids: string[];
};
export type SupplierRemovePayload = {
  id: string;
};

//GET
export type FetchSuppliersRequest = {
  type: typeof supplierConst.FETCH_SUPPLIERS_REQUEST;
};
export type FetchSuppliersSuccess = {
  type: typeof supplierConst.FETCH_SUPPLIERS_SUCCESS;
  payload: SuppliersPayload;
};
export type FetchSuppliersFailure = {
  type: typeof supplierConst.FETCH_SUPPLIERS_FAILURE;
};

//GET:/ID
export type FetchSupplierRequest = {
  type: typeof supplierConst.FETCH_SUPPLIER_REQUEST;
  payload: SupplierRequestPayload;
};
export type FetchSupplierSuccess = {
  type: typeof supplierConst.FETCH_SUPPLIER_SUCCESS;
  payload: SupplierPayload;
};
export type FetchSupplierFailure = {
  type: typeof supplierConst.FETCH_SUPPLIER_FAILURE;
};

//POST
export type CreateSupplierRequest = {
  type: typeof supplierConst.CREATE_SUPPLIER_REQUEST;
  payload: SupplierPayload;
};
export type CreateSupplierSuccess = {
  type: typeof supplierConst.CREATE_SUPPLIER_SUCCESS;
  payload: SupplierPayload;
};
export type CreateSupplierFailure = {
  type: typeof supplierConst.CREATE_SUPPLIER_FAILURE;
};

//POST RANGE
export type CreateRangeSupplierRequest = {
  type: typeof supplierConst.CREATE_RANGE_SUPPLIER_REQUEST;
  payload: SuppliersPayload;
};
export type CreateRangeSupplierSuccess = {
  type: typeof supplierConst.CREATE_RANGE_SUPPLIER_SUCCESS;
  payload: SuppliersPayload;
};
export type CreateRangeSupplierFailure = {
  type: typeof supplierConst.CREATE_RANGE_SUPPLIER_FAILURE;
};

//PUT
export type UpdateSupplierRequest = {
  type: typeof supplierConst.UPDATE_SUPPLIER_REQUEST;
  payload: SupplierPayload;
};
export type UpdateSupplierSuccess = {
  type: typeof supplierConst.UPDATE_SUPPLIER_SUCCESS;
  payload: SupplierPayload;
};
export type UpdateSupplierFailure = {
  type: typeof supplierConst.UPDATE_SUPPLIER_FAILURE;
};

//REMOVE
export type RemoveSupplierRequest = {
  type: typeof supplierConst.REMOVE_SUPPLIER_REQUEST;
  payload: SupplierRemovePayload;
};
export type RemoveSupplierSuccess = {
  type: typeof supplierConst.REMOVE_SUPPLIER_SUCCESS;
  payload: SupplierRemovePayload;
};
export type RemoveSupplierFailure = {
  type: typeof supplierConst.REMOVE_SUPPLIER_FAILURE;
};

//REMOVE RANGE
export type RemoveRangeSupplierRequest = {
  type: typeof supplierConst.REMOVE_RANGE_SUPPLIER_REQUEST;
  payload: SupplierRemoveRangePayload;
};
export type RemoveRangeSupplierSuccess = {
  type: typeof supplierConst.REMOVE_RANGE_SUPPLIER_SUCCESS;
  payload: SupplierRemoveRangePayload;
};
export type RemoveRangeSupplierFailure = {
  type: typeof supplierConst.REMOVE_RANGE_SUPPLIER_FAILURE;
};

//FILTER
export type FilterSuppliersRequest = {
  type: typeof supplierConst.FILTER_SUPPLIERS_REQUEST;
  payload: QueryFilter[];
};
export type FilterSuppliersSuccess = {
  type: typeof supplierConst.FILTER_SUPPLIERS_SUCCESS;
  payload: SuppliersPayload;
};
export type FilterSuppliersFailure = {
  type: typeof supplierConst.FILTER_SUPPLIERS_FAILURE;
};

//CLIENT ACTION TYPES
export type SetSupplier = {
  type: typeof supplierConst.SET_SUPPLIER;
  payload: ISupplier | null;
};
export type SetSuppliers = {
  type: typeof supplierConst.SET_SUPPLIERS;
  payload: ISupplier[];
};
export type ClearSupplier = {
  type: typeof supplierConst.CLEAR_SUPPLIER;
};
export type ClearSuppliers = {
  type: typeof supplierConst.CLEAR_SUPPLIERS;
};

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
  | FilterSuppliersRequest
  | FilterSuppliersSuccess
  | FilterSuppliersFailure
  | SetSupplier
  | SetSuppliers
  | ClearSupplier
  | ClearSuppliers;
