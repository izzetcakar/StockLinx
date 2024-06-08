import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@interfaces/dtos";
import {
  IAssetProduct,
  ILicense,
  IUserProduct,
} from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "License/";

const getAll = async (): Promise<ILicense[]> => {
  return (await request<ILicense>({ requestUrl: requestUrl, apiType: "get" }))
    .data as ILicense[];
};

const get = async (id: string): Promise<ILicense> => {
  return (
    await request<ILicense>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as ILicense;
};

const create = async (consumable: ILicense): Promise<ILicense> => {
  return (
    await request<ILicense>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as ILicense;
};

const createRange = async (consumables: ILicense[]): Promise<ILicense[]> => {
  return (
    await request<ILicense>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as ILicense[];
};

const update = async (consumable: ILicense): Promise<ILicense> => {
  return (
    await request<ILicense>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as ILicense;
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

const userCheckIn = async (
  checkInDto: UserProductCheckInDto
): Promise<IUserProduct> => {
  return (
    await request<IUserProduct>({
      requestUrl: requestUrl + "checkin/user",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as IUserProduct;
};

const assetCheckIn = async (
  checkInDto: AssetProductCheckInDto
): Promise<IAssetProduct> => {
  return (
    await request<IAssetProduct>({
      requestUrl: requestUrl + "checkin/asset",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as IAssetProduct;
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

const filter = async (queryFilters: QueryFilter[]): Promise<ILicense[]> => {
  return (
    await request<ILicense>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as ILicense[];
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
