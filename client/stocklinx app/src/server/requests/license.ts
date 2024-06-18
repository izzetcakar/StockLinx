import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
  AssetProductDto,
  UserProductCheckInDto,
  UserProductCheckOutDto,
  UserProductDto,
} from "@interfaces/dtos";
import { ILicense } from "@interfaces/serverInterfaces";
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
): Promise<UserProductDto> => {
  return (
    await request<UserProductDto>({
      requestUrl: requestUrl + "checkin/user",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as UserProductDto;
};

const assetCheckIn = async (
  checkInDto: AssetProductCheckInDto
): Promise<AssetProductDto> => {
  return (
    await request<AssetProductDto>({
      requestUrl: requestUrl + "checkin/asset",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as AssetProductDto;
};

const userCheckOut = async (
  checkOutDto: UserProductCheckOutDto
): Promise<UserProductDto> => {
  return (
    await request<UserProductDto>({
      requestUrl: requestUrl + "checkout/user",
      apiType: "post",
      queryData: checkOutDto,
    })
  ).data as UserProductDto;
};

const assetCheckOut = async (
  checkOutDto: AssetProductCheckOutDto
): Promise<AssetProductDto> => {
  return (
    await request<AssetProductDto>({
      requestUrl: requestUrl + "checkout/asset",
      apiType: "post",
      queryData: checkOutDto,
    })
  ).data as AssetProductDto;
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
