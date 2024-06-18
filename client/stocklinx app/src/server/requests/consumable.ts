import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
  UserProductDto,
} from "@interfaces/dtos";
import { IConsumable } from "@interfaces/serverInterfaces";
import { request } from "@request";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "Consumable/";

const getAll = () => {
  return baseRequests.getAll<IConsumable>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IConsumable>(requestUrl, id);
};

const create = (consumable: IConsumable) => {
  return baseRequests.create<IConsumable>(requestUrl, consumable);
};

const createRange = (consumables: IConsumable[]) => {
  return baseRequests.createRange<IConsumable>(requestUrl, consumables);
};

const update = (consumable: IConsumable) => {
  return baseRequests.update<IConsumable>(requestUrl, consumable);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IConsumable>(requestUrl, queryFilters);
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

export const consumableRequests = {
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
