import { IBranch, SelectData } from "../../interfaces/interfaces";
import { branchConst } from "./constant";

export interface BranchState {
  branch: IBranch | null;
  branches: IBranch[];
  selectData: SelectData[];
}

export interface BranchSucccessPayload {
  branch: IBranch;
}
export interface BranchesSucccessPayload {
  branches: IBranch[];
}
export interface BranchRequestPayload {
  id: string;
}
export interface UpdateBranchRequestPayload {
  branch: IBranch;
}

//GET
export interface FetchBranchesRequest {
  type: typeof branchConst.FETCH_BRANCHES_REQUEST;
}
export type FetchBranchesSuccess = {
  type: typeof branchConst.FETCH_BRANCHES_SUCCESS;
  payload: BranchesSucccessPayload;
};
export type FetchBranchesFailure = {
  type: typeof branchConst.FETCH_BRANCHES_FAILURE;
};
//GET:/ID
export interface FetchBranchRequest {
  type: typeof branchConst.FETCH_BRANCH_REQUEST;
  payload: BranchRequestPayload;
}
export type FetchBranchSuccess = {
  type: typeof branchConst.FETCH_BRANCH_SUCCESS;
  payload: BranchSucccessPayload;
};
export type FetchBranchFailure = {
  type: typeof branchConst.FETCH_BRANCH_FAILURE;
};
//POST
export interface CreateBranchRequest {
  type: typeof branchConst.CREATE_BRANCH_REQUEST;
  payload: UpdateBranchRequestPayload;
}
export type CreateBranchSuccess = {
  type: typeof branchConst.CREATE_BRANCH_SUCCESS;
};
export type CreateBranchFailure = {
  type: typeof branchConst.CREATE_BRANCH_FAILURE;
};
//PUT
export interface UpdateBranchRequest {
  type: typeof branchConst.UPDATE_BRANCH_REQUEST;
  payload: UpdateBranchRequestPayload;
}
export type UpdateBranchSuccess = {
  type: typeof branchConst.UPDATE_BRANCH_SUCCESS;
};
export type UpdateBranchFailure = {
  type: typeof branchConst.UPDATE_BRANCH_FAILURE;
};
//REMOVE
export interface RemoveBranchRequest {
  type: typeof branchConst.REMOVE_BRANCH_REQUEST;
  payload: BranchRequestPayload;
}
export type RemoveBranchSuccess = {
  type: typeof branchConst.REMOVE_BRANCH_SUCCESS;
};
export type RemoveBranchFailure = {
  type: typeof branchConst.REMOVE_BRANCH_FAILURE;
};

export type BranchActions =
  | FetchBranchesRequest
  | FetchBranchesSuccess
  | FetchBranchesFailure
  | FetchBranchRequest
  | FetchBranchSuccess
  | FetchBranchFailure
  | CreateBranchRequest
  | CreateBranchSuccess
  | CreateBranchFailure
  | UpdateBranchRequest
  | UpdateBranchSuccess
  | UpdateBranchFailure
  | RemoveBranchRequest
  | RemoveBranchSuccess
  | RemoveBranchFailure;
