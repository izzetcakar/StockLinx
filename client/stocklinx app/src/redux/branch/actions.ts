import { IBranch } from "@interfaces/serverInterfaces";
import { branchConst } from "./constant";
import {
  CreateBranchFailure,
  CreateBranchRequest,
  CreateBranchSuccess,
  RemoveBranchFailure,
  RemoveBranchRequest,
  RemoveBranchSuccess,
  FetchBranchesFailure,
  FetchBranchesRequest,
  FetchBranchesSuccess,
  FetchBranchFailure,
  FetchBranchRequest,
  FetchBranchSuccess,
  UpdateBranchFailure,
  UpdateBranchRequest,
  UpdateBranchSuccess,
  BranchRequestPayload,
  SetBranch,
  SetBranches,
  ClearBranch,
  ClearBranches,
  BranchesPayload,
  BranchPayload,
  CreateRangeBranchRequest,
  CreateRangeBranchSuccess,
  CreateRangeBranchFailure,
  RemoveRangeBranchRequest,
  RemoveRangeBranchSuccess,
  RemoveRangeBranchFailure,
  BranchRemoveRangePayload,
  BranchRemovePayload,
  FilterBranchesRequest,
  FilterBranchesSuccess,
  FilterBranchesFailure,
} from "./type";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

//GET
const getAll = (): FetchBranchesRequest => ({
  type: branchConst.FETCH_BRANCHES_REQUEST,
});
const getAllSuccess = (payload: BranchesPayload): FetchBranchesSuccess => ({
  type: branchConst.FETCH_BRANCHES_SUCCESS,
  payload,
});
const getAllFailure = (): FetchBranchesFailure => ({
  type: branchConst.FETCH_BRANCHES_FAILURE,
});

//GET:/ID
const get = (payload: BranchRequestPayload): FetchBranchRequest => ({
  type: branchConst.FETCH_BRANCH_REQUEST,
  payload,
});
const getSuccess = (payload: BranchPayload): FetchBranchSuccess => ({
  type: branchConst.FETCH_BRANCH_SUCCESS,
  payload,
});
const getFailure = (): FetchBranchFailure => ({
  type: branchConst.FETCH_BRANCH_FAILURE,
});

//POST
const create = (payload: BranchPayload): CreateBranchRequest => ({
  type: branchConst.CREATE_BRANCH_REQUEST,
  payload,
});
const createSuccess = (payload: BranchPayload): CreateBranchSuccess => ({
  type: branchConst.CREATE_BRANCH_SUCCESS,
  payload,
});
const createFailure = (): CreateBranchFailure => ({
  type: branchConst.CREATE_BRANCH_FAILURE,
});

//POST RANGE
const createRange = (payload: BranchesPayload): CreateRangeBranchRequest => ({
  type: branchConst.CREATE_RANGE_BRANCH_REQUEST,
  payload,
});
const createRangeSuccess = (
  payload: BranchesPayload
): CreateRangeBranchSuccess => ({
  type: branchConst.CREATE_RANGE_BRANCH_SUCCESS,
  payload,
});
const createRangeFailure = (): CreateRangeBranchFailure => ({
  type: branchConst.CREATE_RANGE_BRANCH_FAILURE,
});

//PUT
const update = (payload: BranchPayload): UpdateBranchRequest => ({
  type: branchConst.UPDATE_BRANCH_REQUEST,
  payload,
});
const updateSuccess = (payload: BranchPayload): UpdateBranchSuccess => ({
  type: branchConst.UPDATE_BRANCH_SUCCESS,
  payload,
});
const updateFailure = (): UpdateBranchFailure => ({
  type: branchConst.UPDATE_BRANCH_FAILURE,
});

//REMOVE
const remove = (payload: BranchRemovePayload): RemoveBranchRequest => ({
  type: branchConst.REMOVE_BRANCH_REQUEST,
  payload,
});
const removeSuccess = (payload: BranchRemovePayload): RemoveBranchSuccess => ({
  type: branchConst.REMOVE_BRANCH_SUCCESS,
  payload,
});
const removeFailure = (): RemoveBranchFailure => ({
  type: branchConst.REMOVE_BRANCH_FAILURE,
});

//REMOVE RANGE
const removeRange = (
  payload: BranchRemoveRangePayload
): RemoveRangeBranchRequest => ({
  type: branchConst.REMOVE_RANGE_BRANCH_REQUEST,
  payload,
});
const removeRangeSuccess = (
  payload: BranchRemoveRangePayload
): RemoveRangeBranchSuccess => ({
  type: branchConst.REMOVE_RANGE_BRANCH_SUCCESS,
  payload,
});
const removeRangeFailure = (): RemoveRangeBranchFailure => ({
  type: branchConst.REMOVE_RANGE_BRANCH_FAILURE,
});

//FILTER
const filter = (payload: QueryFilter[]): FilterBranchesRequest => ({
  type: branchConst.FILTER_BRANCHES_REQUEST,
  payload,
});
const filterSuccess = (payload: BranchesPayload): FilterBranchesSuccess => ({
  type: branchConst.FILTER_BRANCHES_SUCCESS,
  payload,
});
const filterFailure = (): FilterBranchesFailure => ({
  type: branchConst.FILTER_BRANCHES_FAILURE,
});

//CLIENT ACTIONS
const setBranch = (payload: IBranch | null): SetBranch => ({
  type: branchConst.SET_BRANCH,
  payload,
});
const clearBranch = (): ClearBranch => ({
  type: branchConst.CLEAR_BRANCH,
});
const setBranches = (payload: IBranch[]): SetBranches => ({
  type: branchConst.SET_BRANCHES,
  payload,
});
const clearBranches = (): ClearBranches => ({
  type: branchConst.CLEAR_BRANCHES,
});

export const branchActions = {
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
  setBranch,
  clearBranch,
  setBranches,
  clearBranches,
};
