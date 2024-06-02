import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@interfaces/dtos";
import { ILicense } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "License/";

const getAll = () => {
  return request<ILicense>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<ILicense>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (license: ILicense) => {
  return request<ILicense>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: license,
  });
};
const createRange = (licenses: ILicense[]) => {
  return request<ILicense>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: licenses,
  });
};
const update = (license: ILicense) => {
  return request<ILicense>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: license,
  });
};
const remove = (id: string) => {
  return request<ILicense>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<ILicense>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};
const userCheckIn = (checkInDto: UserProductCheckInDto) => {
  return request<ILicense>({
    requestUrl: requestUrl + "checkin/user",
    apiType: "post",
    queryData: checkInDto,
  });
};

const assetCheckIn = (checkInDto: AssetProductCheckInDto) => {
  return request<ILicense>({
    requestUrl: requestUrl + "checkin/asset",
    apiType: "post",
    queryData: checkInDto,
  });
};

const userCheckOut = (checkOutDto: UserProductCheckOutDto) => {
  return request<ILicense>({
    requestUrl: requestUrl + "checkout/user",
    apiType: "post",
    queryData: checkOutDto,
  });
};

const assetCheckOut = (checkOutDto: AssetProductCheckOutDto) => {
  return request<ILicense>({
    requestUrl: requestUrl + "checkout/asset",
    apiType: "post",
    queryData: checkOutDto,
  });
};

const filter = (queryFilters: QueryFilter[]) => {
  return request<ILicense>({
    requestUrl: requestUrl + "filter",
    apiType: "get",
    params: getQueryFilter(queryFilters),
  });
};

export const licenseRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  userCheckIn,
  assetCheckIn,
  userCheckOut,
  assetCheckOut,
  filter,
};
