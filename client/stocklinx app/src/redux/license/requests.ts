import {
  AssetProductCheckInPayload,
  UserProductCheckInPayload,
} from "../../interfaces/clientInterfaces";
import { ILicense } from "../../interfaces/serverInterfaces";
import { request } from "../../server/api";
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
const userCheckIn = (checkInDto: UserProductCheckInPayload) => {
  return request<ILicense>({
    requestUrl: requestUrl + "checkin/user",
    apiType: "post",
    queryData: checkInDto,
  });
};

const assetCheckIn = (checkInDto: AssetProductCheckInPayload) => {
  return request<ILicense>({
    requestUrl: requestUrl + "checkin/asset",
    apiType: "post",
    queryData: checkInDto,
  });
};

const userCheckOut = (id: string) => {
  return request<ILicense>({
    requestUrl: requestUrl + "checkout/user/" + id,
    apiType: "post",
    queryData: "USER",
  });
};

const assetCheckOut = (id: string) => {
  return request<ILicense>({
    requestUrl: requestUrl + "checkout/asset/" + id,
    apiType: "post",
    queryData: "ASSET",
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
};
