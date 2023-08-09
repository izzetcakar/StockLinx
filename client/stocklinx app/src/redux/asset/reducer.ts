import {
  closeNotification,
  openNotification,
} from "../../components/notification/notification";
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
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case assetConst.FETCH_ASSETS_SUCCESS:
      closeNotification();
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
      closeNotification();
      return {
        ...state,
        pending: false,
        assets: [],
        error: action.payload.error,
      };
    case assetConst.FETCH_ASSET_REQUEST:
      openNotification("Fetching", true);
      return {
        ...state,
        pending: true,
      };
    case assetConst.FETCH_ASSET_SUCCESS:
      closeNotification();
      return {
        ...state,
        pending: false,
        error: null,
        asset: action.payload.asset,
      };
    case assetConst.FETCH_ASSET_FAILURE:
      closeNotification();
      return {
        ...state,
        pending: false,
        asset: null,
        error: action.payload.error,
      };
    case assetConst.CREATE_ASSET_REQUEST:
      openNotification("Creating", true);
      return {
        ...state,
        pending: true,
      };
    case assetConst.CREATE_ASSET_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case assetConst.CREATE_ASSET_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case assetConst.UPDATE_ASSET_REQUEST:
      openNotification("Updating", true);
      return {
        ...state,
        pending: true,
      };
    case assetConst.UPDATE_ASSET_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case assetConst.UPDATE_ASSET_FAILURE:
      closeNotification();
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    case assetConst.REMOVE_ASSET_REQUEST:
      openNotification("Removing", true);
      return {
        ...state,
        pending: true,
      };
    case assetConst.REMOVE_ASSET_SUCCESS:
      closeNotification();
      return {
        ...state,
        error: null,
        pending: false,
      };
    case assetConst.REMOVE_ASSET_FAILURE:
      closeNotification();
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
