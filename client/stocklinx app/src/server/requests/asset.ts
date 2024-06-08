import { AssetCheckInDto, AssetCheckOutDto } from "@interfaces/dtos";
import { IAsset, IUserProduct } from "@interfaces/serverInterfaces";
import { request } from "@request";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "Asset/";

const getAll = () => {
  return baseRequests.getAll<IAsset>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IAsset>(requestUrl, id);
};

const create = (asset: IAsset) => {
  return baseRequests.create<IAsset>(requestUrl, asset);
};

const createRange = (assets: IAsset[]) => {
  return baseRequests.createRange<IAsset>(requestUrl, assets);
};

const update = (asset: IAsset) => {
  return baseRequests.update<IAsset>(requestUrl, asset);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IAsset>(requestUrl, queryFilters);
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
