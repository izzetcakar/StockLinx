import { AssetCheckInDto, AssetCheckOutDto } from "@interfaces/dtos";
import { IAsset, IUserProduct } from "@interfaces/serverInterfaces";
import { request } from "@request";
import { getQueryFilter } from "@/utils/filterUtilts";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

const requestUrl = "Asset/";

const getAll = async (): Promise<IAsset[]> => {
  return (
    await request<IAsset>({
      requestUrl: requestUrl,
      apiType: "get",
    })
  ).data as IAsset[];
};

const get = async (id: string): Promise<IAsset> => {
  return (
    await request<IAsset>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IAsset;
};

const create = async (asset: IAsset): Promise<IAsset> => {
  return (
    await request<IAsset>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: asset,
    })
  ).data as IAsset;
};

const createRange = async (assets: IAsset[]): Promise<IAsset[]> => {
  return (
    await request<IAsset>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: assets,
    })
  ).data as IAsset[];
};

const update = async (asset: IAsset): Promise<IAsset> => {
  return (
    await request<IAsset>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: asset,
    })
  ).data as IAsset;
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

const checkIn = async (checkInDto: AssetCheckInDto): Promise<IUserProduct> => {
  return (
    await request<IUserProduct>({
      requestUrl: requestUrl + "checkin",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as IUserProduct;
};

const checkOut = (checkOutDto: AssetCheckOutDto) => {
  return request<IAsset>({
    requestUrl: requestUrl + "checkout",
    apiType: "post",
    queryData: checkOutDto,
  });
};

const filter = async (queryFilters: QueryFilter[]): Promise<IAsset[]> => {
  return (
    await request<IAsset>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IAsset[];
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
