import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
  UserProductDto,
} from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAccessory } from "@/interfaces/serverInterfaces";
import { request } from "@/server/api";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "Accessory/";

const getAll = () => {
  return baseRequests.getAll<IAccessory>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IAccessory>(requestUrl, id);
};

const create = (accessory: IAccessory) => {
  return baseRequests.create<IAccessory>(requestUrl, accessory);
};

const createRange = (accessories: IAccessory[]) => {
  return baseRequests.createRange<IAccessory>(requestUrl, accessories);
};

const update = (accessory: IAccessory) => {
  return baseRequests.update<IAccessory>(requestUrl, accessory);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IAccessory>(requestUrl, queryFilters);
};

const lookup = () => {
  return baseRequests.lookup(requestUrl, ["tag", "name"]);
};

const checkIn = async (
  checkInDto: UserProductCheckInDto
): Promise<UserProductDto> => {
  return (
    await request<UserProductDto>({
      requestUrl: requestUrl + "checkin",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as UserProductDto;
};

const checkOut = async (
  checkOutDto: UserProductCheckOutDto
): Promise<UserProductDto> => {
  return (
    await request<UserProductDto>({
      requestUrl: requestUrl + "checkout",
      apiType: "post",
      queryData: checkOutDto,
    })
  ).data as UserProductDto;
};

export const accessoryRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
  lookup,
  checkIn,
  checkOut,
};
