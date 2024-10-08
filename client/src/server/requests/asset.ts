import {
  AssetCheckInDto,
  AssetCheckOutDto,
  EmployeeProductDto,
} from "@interfaces/dtos";
import { IAsset, IEmployeeProduct } from "@interfaces/serverInterfaces";
import { request } from "@request";
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

const lookup = () => {
  return baseRequests.lookup(requestUrl, ["tag", "name"]);
};

const getDtos = async (ids: string[]) => {
  return baseRequests.getDtos(requestUrl, ids);
};

const checkIn = async (
  checkInDto: AssetCheckInDto
): Promise<IEmployeeProduct> => {
  return (
    await request<IEmployeeProduct>({
      requestUrl: requestUrl + "checkin",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as IEmployeeProduct;
};

const checkOut = async (
  checkOutDto: AssetCheckOutDto
): Promise<EmployeeProductDto | null> => {
  return (
    await request<EmployeeProductDto>({
      requestUrl: requestUrl + "checkout",
      apiType: "post",
      queryData: checkOutDto,
    })
  ).data as EmployeeProductDto | null;
};

export default {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  lookup,
  getDtos,
  checkIn,
  checkOut,
};
