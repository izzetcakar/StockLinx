import { AssetCheckInDto, AssetCheckOutDto } from "@interfaces/dtos";
import { IAsset } from "@interfaces/serverInterfaces";
import { request } from "@request";
import { getQueryFilter } from "@/utils/filterUtilts";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

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

const checkIn = (checkInDto: AssetCheckInDto) => {
  return request<IAsset>({
    requestUrl: requestUrl + "checkin",
    apiType: "post",
    queryData: checkInDto,
  });
};

const checkOut = (checkOutDto: AssetCheckOutDto) => {
  return request<IAsset>({
    requestUrl: requestUrl + "checkout",
    apiType: "post",
    queryData: checkOutDto,
  });
};

const filter = (queryFilters: QueryFilter[]) => {
  return request<IAsset>({
    requestUrl: requestUrl + "filter",
    apiType: "get",
    params: getQueryFilter(queryFilters),
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
  filter,
};
