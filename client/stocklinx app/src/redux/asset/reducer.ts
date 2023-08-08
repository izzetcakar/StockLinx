import { assetConst } from "./constant";
import { AssetActions, AssetState } from "./type";

const initialState: AssetState = {
  asset: null,
  assets: [],
  selectData: [],
  pending: false,
  error: null,
};

export default (state = initialState, action: AssetActions) => {
  switch (action.type) {
    case assetConst.FETCH_ASSETS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case assetConst.FETCH_ASSETS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        assets: action.payload.assets,
        selectData: action.payload.assets.map((asset) => ({
          value: asset.id as string,
          label: asset.name,
        })),
      };
    case assetConst.FETCH_ASSETS_FAILURE:
      return {
        ...state,
        pending: false,
        assets: [],
        error: action.payload.error,
      };
    case assetConst.FETCH_ASSET_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case assetConst.FETCH_ASSET_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        asset: action.payload.asset,
      };
    case assetConst.FETCH_ASSET_FAILURE:
      return {
        ...state,
        pending: false,
        asset: null,
        error: action.payload.error,
      };
    case assetConst.CREATE_ASSET_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case assetConst.CREATE_ASSET_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case assetConst.CREATE_ASSET_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case assetConst.UPDATE_ASSET_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case assetConst.UPDATE_ASSET_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case assetConst.UPDATE_ASSET_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case assetConst.REMOVE_ASSET_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case assetConst.REMOVE_ASSET_SUCCESS:
      return {
        ...state,
        error: null,
        pending: false,
      };
    case assetConst.REMOVE_ASSET_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case assetConst.SET_ASSET:
      return {
        ...state,
        asset: action.payload,
      };
    case assetConst.CLEAR_ASSET:
      return {
        ...state,
        asset: null,
      };
    case assetConst.SET_ASSETS:
      return {
        ...state,
        assets: action.payload,
      };
    case assetConst.CLEAR_ASSETS:
      return {
        ...state,
        assets: [],
      };
    default:
      return { ...state };
  }
};
