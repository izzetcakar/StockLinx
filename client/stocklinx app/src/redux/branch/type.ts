import { IBranch } from "../../interfaces/serverInterfaces";
import { branchConst } from "./constant";

export type BranchState = {
  branch: IBranch | null;
  branches: IBranch[];
};
export type BranchRequestPayload = {
  id: string;
};
export type BranchPayload = {
  branch: IBranch;
};
export type BranchesPayload = {
  branches: IBranch[];
};
export type BranchRemoveRangePayload = {
  ids: string[];
};
export type BranchRemovePayload = {
  id: string;
};

//GET
export type FetchBranchesRequest = {
  type: typeof branchConst.FETCH_BRANCHES_REQUEST;
};
export type FetchBranchesSuccess = {
  type: typeof branchConst.FETCH_BRANCHES_SUCCESS;
  payload: BranchesPayload;
};
export type FetchBranchesFailure = {
  type: typeof branchConst.FETCH_BRANCHES_FAILURE;
};
//GET:/ID
export type FetchBranchRequest = {
  type: typeof branchConst.FETCH_BRANCH_REQUEST;
  payload: BranchRequestPayload;
};
export type FetchBranchSuccess = {
  type: typeof branchConst.FETCH_BRANCH_SUCCESS;
  payload: BranchPayload;
};
export type FetchBranchFailure = {
  type: typeof branchConst.FETCH_BRANCH_FAILURE;
};
//POST
export type CreateBranchRequest = {
  type: typeof branchConst.CREATE_BRANCH_REQUEST;
  payload: BranchPayload;
};
export type CreateBranchSuccess = {
  type: typeof branchConst.CREATE_BRANCH_SUCCESS;
  payload: BranchPayload;
};
export type CreateBranchFailure = {
  type: typeof branchConst.CREATE_BRANCH_FAILURE;
};
//POST RANGE
export type CreateRangeBranchRequest = {
  type: typeof branchConst.CREATE_RANGE_BRANCH_REQUEST;
  payload: BranchesPayload;
};
export type CreateRangeBranchSuccess = {
  type: typeof branchConst.CREATE_RANGE_BRANCH_SUCCESS;
  payload: BranchesPayload;
};
export type CreateRangeBranchFailure = {
  type: typeof branchConst.CREATE_RANGE_BRANCH_FAILURE;
};
//PUT
export type UpdateBranchRequest = {
  type: typeof branchConst.UPDATE_BRANCH_REQUEST;
  payload: BranchPayload;
};
export type UpdateBranchSuccess = {
  type: typeof branchConst.UPDATE_BRANCH_SUCCESS;
  payload: BranchPayload;
};
export type UpdateBranchFailure = {
  type: typeof branchConst.UPDATE_BRANCH_FAILURE;
};
//REMOVE
export type RemoveBranchRequest = {
  type: typeof branchConst.REMOVE_BRANCH_REQUEST;
  payload: BranchRemovePayload;
};
export type RemoveBranchSuccess = {
  type: typeof branchConst.REMOVE_BRANCH_SUCCESS;
  payload: BranchRemovePayload;
};
export type RemoveBranchFailure = {
  type: typeof branchConst.REMOVE_BRANCH_FAILURE;
};
//REMOVE RANGE
export type RemoveRangeBranchRequest = {
  type: typeof branchConst.REMOVE_RANGE_BRANCH_REQUEST;
  payload: BranchRemoveRangePayload;
};
export type RemoveRangeBranchSuccess = {
  type: typeof branchConst.REMOVE_RANGE_BRANCH_SUCCESS;
  payload: BranchRemoveRangePayload;
};
export type RemoveRangeBranchFailure = {
  type: typeof branchConst.REMOVE_RANGE_BRANCH_FAILURE;
};

//CLIENT ACTION TYPES
export type SetBranch = {
  type: typeof branchConst.SET_BRANCH;
  payload: IBranch | null;
};
export type SetBranches = {
  type: typeof branchConst.SET_BRANCHES;
  payload: IBranch[];
};
export type ClearBranch = {
  type: typeof branchConst.CLEAR_BRANCH;
};
export type ClearBranches = {
  type: typeof branchConst.CLEAR_BRANCHES;
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
