import { IBranch } from "../../interfaces/serverInterfaces";
import { branchConst } from "./constant";

export interface BranchState {
  branch: IBranch | null;
  branches: IBranch[];
}
export interface BranchRequestPayload {
  id: string;
}
export interface BranchPayload {
  branch: IBranch;
}
export interface BranchesPayload {
  branches: IBranch[];
}
export interface BranchRemoveRangePayload {
  ids: string[];
}
export interface BranchRemovePayload {
  id: string;
}

//GET
export interface FetchBranchesRequest {
  type: typeof branchConst.FETCH_BRANCHES_REQUEST;
}
export type FetchBranchesSuccess = {
  type: typeof branchConst.FETCH_BRANCHES_SUCCESS;
  payload: BranchesPayload;
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
  payload: BranchPayload;
};
export type FetchBranchFailure = {
  type: typeof branchConst.FETCH_BRANCH_FAILURE;
};
//POST
export interface CreateBranchRequest {
  type: typeof branchConst.CREATE_BRANCH_REQUEST;
  payload: BranchPayload;
}
export type CreateBranchSuccess = {
  type: typeof branchConst.CREATE_BRANCH_SUCCESS;
  payload: BranchPayload;
};
export type CreateBranchFailure = {
  type: typeof branchConst.CREATE_BRANCH_FAILURE;
};
//POST RANGE
export interface CreateRangeBranchRequest {
  type: typeof branchConst.CREATE_RANGE_BRANCH_REQUEST;
  payload: BranchesPayload;
}
export type CreateRangeBranchSuccess = {
  type: typeof branchConst.CREATE_RANGE_BRANCH_SUCCESS;
  payload: BranchesPayload;
};
export type CreateRangeBranchFailure = {
  type: typeof branchConst.CREATE_RANGE_BRANCH_FAILURE;
};
//PUT
export interface UpdateBranchRequest {
  type: typeof branchConst.UPDATE_BRANCH_REQUEST;
  payload: BranchPayload;
}
export type UpdateBranchSuccess = {
  type: typeof branchConst.UPDATE_BRANCH_SUCCESS;
  payload: BranchPayload;
};
export type UpdateBranchFailure = {
  type: typeof branchConst.UPDATE_BRANCH_FAILURE;
};
//REMOVE
export interface RemoveBranchRequest {
  type: typeof branchConst.REMOVE_BRANCH_REQUEST;
  payload: BranchRemovePayload;
}
export type RemoveBranchSuccess = {
  type: typeof branchConst.REMOVE_BRANCH_SUCCESS;
  payload: BranchRemovePayload;
};
export type RemoveBranchFailure = {
  type: typeof branchConst.REMOVE_BRANCH_FAILURE;
};
//REMOVE RANGE
export interface RemoveRangeBranchRequest {
  type: typeof branchConst.REMOVE_RANGE_BRANCH_REQUEST;
  payload: BranchRemoveRangePayload;
}
export type RemoveRangeBranchSuccess = {
  type: typeof branchConst.REMOVE_RANGE_BRANCH_SUCCESS;
  payload: BranchRemoveRangePayload;
};
export type RemoveRangeBranchFailure = {
  type: typeof branchConst.REMOVE_RANGE_BRANCH_FAILURE;
};

//CLIENT ACTION TYPES
export interface SetBranch {
  type: typeof branchConst.SET_BRANCH;
  payload: IBranch | null;
}
export interface SetBranches {
  type: typeof branchConst.SET_BRANCHES;
  payload: IBranch[];
}
export interface ClearBranch {
  type: typeof branchConst.CLEAR_BRANCH;
}
export interface ClearBranches {
  type: typeof branchConst.CLEAR_BRANCHES;
}

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
  | CreateRangeBranchRequest
  | CreateRangeBranchSuccess
  | CreateRangeBranchFailure
  | UpdateBranchRequest
  | UpdateBranchSuccess
  | UpdateBranchFailure
  | RemoveBranchRequest
  | RemoveBranchSuccess
  | RemoveBranchFailure
  | RemoveRangeBranchRequest
  | RemoveRangeBranchSuccess
  | RemoveRangeBranchFailure
  | SetBranch
  | SetBranches
  | ClearBranch
  | ClearBranches;
