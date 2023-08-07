import { IAsset } from "../../interfaces/interfaces";
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

export const assetRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
