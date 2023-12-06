import { assetConst } from "./constant";
import { AssetActions, AssetState } from "./type";

const initialState: AssetState = {
  asset: null,
  assets: [],
};

export default (state = initialState, action: AssetActions) => {
  switch (action.type) {
    case assetConst.FETCH_ASSETS_REQUEST:
      return {
        ...state,
      };
    case assetConst.FETCH_ASSETS_SUCCESS:
      return {
        ...state,
        assets: action.payload.assets,
      };
    case assetConst.FETCH_ASSETS_FAILURE:
      return {
        ...state,
        assets: [],
      };
    case assetConst.FETCH_ASSET_REQUEST:
      return {
        ...state,
      };
    case assetConst.FETCH_ASSET_SUCCESS:
      return {
        ...state,
        asset: action.payload.asset,
      };
    case assetConst.FETCH_ASSET_FAILURE:
      return {
        ...state,
        asset: null,
      };
    case assetConst.CREATE_ASSET_REQUEST:
      return {
        ...state,
      };
    case assetConst.CREATE_ASSET_SUCCESS:
      return {
        ...state,
        assets: [...state.assets, ...action.payload.assets],
      };
    case assetConst.CREATE_ASSET_FAILURE:
      return {
        ...state,
      };
    case assetConst.CREATE_RANGE_ASSET_REQUEST:
      return {
        ...state,
      };
    case assetConst.CREATE_RANGE_ASSET_SUCCESS:
      return {
        ...state,
        assets: [...state.assets, ...action.payload.assets],
      };
    case assetConst.CREATE_RANGE_ASSET_FAILURE:
      return {
        ...state,
      };
    case assetConst.UPDATE_ASSET_REQUEST:
      return {
        ...state,
      };
    case assetConst.UPDATE_ASSET_SUCCESS:
      return {
        ...state,
      };
    case assetConst.UPDATE_ASSET_FAILURE:
      return {
        ...state,
      };
    case assetConst.REMOVE_ASSET_REQUEST:
      return {
        ...state,
      };
    case assetConst.REMOVE_ASSET_SUCCESS:
      return {
        ...state,
        assets: state.assets.filter((asset) => asset.id !== action.payload.id),
      };
    case assetConst.REMOVE_ASSET_FAILURE:
      return {
        ...state,
      };
    case assetConst.REMOVE_RANGE_ASSET_REQUEST:
      return {
        ...state,
      };
    case assetConst.REMOVE_RANGE_ASSET_SUCCESS:
      return {
        ...state,
        assets: state.assets.filter(
          (asset) => !action.payload.ids.includes(asset.id)
        ),
      };
    case assetConst.REMOVE_RANGE_ASSET_FAILURE:
      return {
        ...state,
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
