import { ILicense, ILicenseCheckInDto } from "../../interfaces/serverInterfaces";
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
const checkIn = (checkInDto: ILicenseCheckInDto) => {
  return request<ILicense>({
    requestUrl: requestUrl + "checkin",
    apiType: "post",
    queryData: checkInDto,
  });
};
const checkOut = (id: string) => {
  return request<ILicense>({
    requestUrl: requestUrl + "checkout/" + id,
    apiType: "post",
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
  checkIn,
  checkOut,
};
