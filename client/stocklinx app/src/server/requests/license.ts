import { QueryFilter } from "@/interfaces/gridTableInterfaces";
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
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "License/";

const getAll = () => {
  return baseRequests.getAll<ILicense>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<ILicense>(requestUrl, id);
};

const create = (license: ILicense) => {
  return baseRequests.create<ILicense>(requestUrl, license);
};

const createRange = (licenses: ILicense[]) => {
  return baseRequests.createRange<ILicense>(requestUrl, licenses);
};

const update = (license: ILicense) => {
  return baseRequests.update<ILicense>(requestUrl, license);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<ILicense>(requestUrl, queryFilters);
};

const lookup = () => {
  return baseRequests.lookup(requestUrl, ["tag", "name"]);
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

export const licenseRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
  lookup,
  userCheckIn,
  assetCheckIn,
  userCheckOut,
  assetCheckOut,
};
