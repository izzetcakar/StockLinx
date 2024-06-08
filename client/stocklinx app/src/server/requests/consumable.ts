import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@interfaces/dtos";
import { IConsumable, IUserProduct } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Consumable/";

const getAll = async (): Promise<IConsumable[]> => {
  return (
    await request<IConsumable>({ requestUrl: requestUrl, apiType: "get" })
  ).data as IConsumable[];
};

const get = async (id: string): Promise<IConsumable> => {
  return (
    await request<IConsumable>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IConsumable;
};

const create = async (consumable: IConsumable): Promise<IConsumable> => {
  return (
    await request<IConsumable>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as IConsumable;
};

const createRange = async (
  consumables: IConsumable[]
): Promise<IConsumable[]> => {
  return (
    await request<IConsumable>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as IConsumable[];
};

const update = async (consumable: IConsumable): Promise<IConsumable> => {
  return (
    await request<IConsumable>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as IConsumable;
};

const remove = (id: string) => {
  return request<IConsumable>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IConsumable>({
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
  return request<IConsumable>({
    requestUrl: requestUrl + "checkout",
    apiType: "post",
    queryData: checkOutDto,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<IConsumable[]> => {
  return (
    await request<IConsumable>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IConsumable[];
};

export const consumableRequests = {
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
