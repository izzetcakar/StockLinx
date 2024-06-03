import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAccessory, IUserProduct } from "@/interfaces/serverInterfaces";
import { request } from "@/server/api";

import { getQueryFilter } from "@/utils/filterUtilts";
const requestUrl = "Accessory/";

const getAll = async (): Promise<IAccessory[]> => {
  return (await request<IAccessory>({ requestUrl: requestUrl, apiType: "get" }))
    .data as IAccessory[];
};

const get = async (id: string): Promise<IAccessory> => {
  return (
    await request<IAccessory>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IAccessory;
};

const create = async (accessory: IAccessory): Promise<IAccessory> => {
  return (
    await request<IAccessory>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: accessory,
    })
  ).data as IAccessory;
};

const createRange = async (
  accessories: IAccessory[]
): Promise<IAccessory[]> => {
  return (
    await request<IAccessory>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: accessories,
    })
  ).data as IAccessory[];
};

const update = async (accessory: IAccessory): Promise<IAccessory> => {
  return (
    await request<IAccessory>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: accessory,
    })
  ).data as IAccessory;
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

const checkIn = async (
  checkInDto: UserProductCheckInDto
): Promise<IUserProduct> => {
  return (
    await request<IUserProduct>({
      requestUrl: requestUrl + "checkin",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as IUserProduct;
};

const checkOut = (checkOutDto: UserProductCheckOutDto) => {
  return request<IAccessory>({
    requestUrl: requestUrl + "checkout",
    apiType: "post",
    queryData: checkOutDto,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<IAccessory[]> => {
  return (
    await request<IAccessory>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IAccessory[];
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
  filter,
};
