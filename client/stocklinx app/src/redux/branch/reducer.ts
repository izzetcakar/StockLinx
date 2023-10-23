import { branchConst } from "./constant";
import { BranchActions, BranchState } from "./type";

const initialState: BranchState = {
  branch: null,
  branches: [],
  selectData: [],
};

export default (state = initialState, action: BranchActions) => {
  switch (action.type) {
    case branchConst.FETCH_BRANCHES_REQUEST:
      return {
        ...state,
      };
    case branchConst.FETCH_BRANCHES_SUCCESS:
      return {
        ...state,
        branches: action.payload.branches,
        selectData: action.payload.branches.map((branch) => ({
          value: branch.id as string,
          label: branch.name,
        })),
      };
    case branchConst.FETCH_BRANCHES_FAILURE:
      return {
        ...state,
        branches: [],
      };
    case branchConst.FETCH_BRANCH_REQUEST:
      return {
        ...state,
      };
    case branchConst.FETCH_BRANCH_SUCCESS:
      return {
        ...state,
        branch: action.payload.branch,
      };
    case branchConst.FETCH_BRANCH_FAILURE:
      return {
        ...state,
        branch: null,
      };
    case branchConst.CREATE_BRANCH_REQUEST:
      return {
        ...state,
      };
    case branchConst.CREATE_BRANCH_SUCCESS:
      return {
        ...state,
      };
    case branchConst.CREATE_BRANCH_FAILURE:
      return {
        ...state,
      };
    case branchConst.UPDATE_BRANCH_REQUEST:
      return {
        ...state,
      };
    case branchConst.UPDATE_BRANCH_SUCCESS:
      return {
        ...state,
      };
    case branchConst.UPDATE_BRANCH_FAILURE:
      return {
        ...state,
      };
    case branchConst.REMOVE_BRANCH_REQUEST:
      return {
        ...state,
      };
    case branchConst.REMOVE_BRANCH_SUCCESS:
      return {
        ...state,
      };
    case branchConst.REMOVE_BRANCH_FAILURE:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
