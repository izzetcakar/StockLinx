import { IAsset, IAssetCheckInDto } from "../../interfaces/interfaces";
import { request } from "../../server/api";
const requestUrl = "Asset/";

const getAll = () => {
  return request<IAsset>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IAsset>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (asset: IAsset) => {
  return request<IAsset>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: asset,
  });
};
const createRange = (assets: IAsset[]) => {
  return request<IAsset>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: assets,
  });
};
const update = (asset: IAsset) => {
  return request<IAsset>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: asset,
  });
};
const remove = (id: string) => {
  return request<IAsset>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<IAsset>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};
const checkIn = (checkInDto: IAssetCheckInDto) => {
  return request<IAsset>({
    requestUrl: requestUrl + "checkin",
    apiType: "post",
    queryData: checkInDto,
  });
};
const checkOut = (id: string) => {
  return request<IAsset>({
    requestUrl: requestUrl + "checkout/" + id,
    apiType: "post",
  });
};

export const assetRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  checkIn,
  checkOut,
};
