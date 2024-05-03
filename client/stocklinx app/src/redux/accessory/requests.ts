import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "../../interfaces/dtos";
import { IAccessory, IUserProduct } from "../../interfaces/serverInterfaces";
import { request } from "../../server/api";
const requestUrl = "Accessory/";

const getAll = () => {
  return request<IAccessory>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IAccessory>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (accessory: IAccessory) => {
  return request<IAccessory>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: accessory,
  });
};
const createRange = (accessories: IAccessory[]) => {
  return request<IAccessory>({
    requestUrl: requestUrl + "range",
    apiType: "post",
    queryData: accessories,
  });
};
const update = (accessory: IAccessory) => {
  return request<IAccessory>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: accessory,
  });
};
const remove = (id: string) => {
  return request<IAccessory>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};
const removeRange = (ids: string[]) => {
  return request<IAccessory>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};
const checkIn = (checkInDto: UserProductCheckInDto) => {
  return request<IUserProduct>({
    requestUrl: requestUrl + "checkin",
    apiType: "post",
    queryData: checkInDto,
  });
};
const checkOut = (checkOutDto: UserProductCheckOutDto) => {
  return request<IAccessory>({
    requestUrl: requestUrl + "checkout",
    apiType: "post",
    queryData: checkOutDto,
  });
};

export const accessoryRequests = {
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
