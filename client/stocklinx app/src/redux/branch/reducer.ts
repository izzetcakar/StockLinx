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
        branches: [...state.branches, action.payload.branch],
      };
    case branchConst.CREATE_BRANCH_FAILURE:
      return {
        ...state,
      };
    case branchConst.CREATE_RANGE_BRANCH_REQUEST:
      return {
        ...state,
      };
    case branchConst.CREATE_RANGE_BRANCH_SUCCESS:
      return {
        ...state,
        branches: [...state.branches, ...action.payload.branches],
      };
    case branchConst.CREATE_RANGE_BRANCH_FAILURE:
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
        branches: state.branches.filter(
          (branch) => branch.id !== action.payload.id
        ),
      };
    case branchConst.REMOVE_BRANCH_FAILURE:
      return {
        ...state,
      };
    case branchConst.REMOVE_RANGE_BRANCH_REQUEST:
      return {
        ...state,
      };
    case branchConst.REMOVE_RANGE_BRANCH_SUCCESS:
      return {
        ...state,
        branches: state.branches.filter(
          (branch) => !action.payload.ids.includes(branch.id)
        ),
      };
    case branchConst.REMOVE_RANGE_BRANCH_FAILURE:
      return {
        ...state,
      };
    case branchConst.SET_BRANCH:
      return {
        ...state,
        branch: action.payload,
      };
    case branchConst.CLEAR_BRANCH:
      return {
        ...state,
        branch: null,
      };
    case branchConst.SET_BRANCHES:
      return {
        ...state,
        branches: action.payload,
      };
    case branchConst.CLEAR_BRANCHES:
      return {
        ...state,
        branches: [],
      };
    default:
      return { ...state };
  }
};
