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
  BranchesSucccessPayload,
  FetchBranchesSuccess,
  FetchBranchFailure,
  FetchBranchRequest,
  FetchBranchSuccess,
  UpdateBranchFailure,
  UpdateBranchRequest,
  UpdateBranchSuccess,
  BranchRequestPayload,
  UpdateBranchRequestPayload,
  BranchSucccessPayload,
} from "./type";

//GET
const getAll = (): FetchBranchesRequest => ({
  type: branchConst.FETCH_BRANCHES_REQUEST,
});
const getAllSuccess = (
  payload: BranchesSucccessPayload
): FetchBranchesSuccess => ({
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
const getSuccess = (payload: BranchSucccessPayload): FetchBranchSuccess => ({
  type: branchConst.FETCH_BRANCH_SUCCESS,
  payload,
});
const getFailure = (): FetchBranchFailure => ({
  type: branchConst.FETCH_BRANCH_FAILURE,
});

//POST
const create = (payload: UpdateBranchRequestPayload): CreateBranchRequest => ({
  type: branchConst.CREATE_BRANCH_REQUEST,
  payload,
});
const createSuccess = (): CreateBranchSuccess => ({
  type: branchConst.CREATE_BRANCH_SUCCESS,
});
const createFailure = (): CreateBranchFailure => ({
  type: branchConst.CREATE_BRANCH_FAILURE,
});

//PUT
const update = (payload: UpdateBranchRequestPayload): UpdateBranchRequest => ({
  type: branchConst.UPDATE_BRANCH_REQUEST,
  payload,
});
const updateSuccess = (): UpdateBranchSuccess => ({
  type: branchConst.UPDATE_BRANCH_SUCCESS,
});
const updateFailure = (): UpdateBranchFailure => ({
  type: branchConst.UPDATE_BRANCH_FAILURE,
});

//REMOVE
const remove = (payload: BranchRequestPayload): RemoveBranchRequest => ({
  type: branchConst.REMOVE_BRANCH_REQUEST,
  payload,
});
const removeSuccess = (): RemoveBranchSuccess => ({
  type: branchConst.REMOVE_BRANCH_SUCCESS,
});
const removeFailure = (): RemoveBranchFailure => ({
  type: branchConst.REMOVE_BRANCH_FAILURE,
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
  update,
  updateSuccess,
  updateFailure,
  remove,
  removeSuccess,
  removeFailure,
};
