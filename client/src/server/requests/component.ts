import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
  AssetProductDto,
} from "@interfaces/dtos";
import { IComponent } from "@interfaces/serverInterfaces";
import { request } from "@request";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "Component/";

const getAll = () => {
  return baseRequests.getAll<IComponent>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IComponent>(requestUrl, id);
};

const create = (component: IComponent) => {
  return baseRequests.create<IComponent>(requestUrl, component);
};

const createRange = (components: IComponent[]) => {
  return baseRequests.createRange<IComponent>(requestUrl, components);
};

const update = (component: IComponent) => {
  return baseRequests.update<IComponent>(requestUrl, component);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IComponent>(requestUrl, queryFilters);
};

const lookup = () => {
  return baseRequests.lookup(requestUrl, ["tag", "name"]);
};

const getDtos = async (ids: string[]) => {
  return baseRequests.getDtos(requestUrl, ids);
};

const checkIn = async (
  checkInDto: AssetProductCheckInDto
): Promise<AssetProductDto> => {
  return (
    await request<AssetProductDto>({
      requestUrl: requestUrl + "checkin",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as AssetProductDto;
};

const checkOut = async (
  checkOutDto: AssetProductCheckOutDto
): Promise<AssetProductDto[]> => {
  return (
    await request<AssetProductDto>({
      requestUrl: requestUrl + "checkout",
      apiType: "post",
      queryData: checkOutDto,
    })
  ).data as AssetProductDto[];
};


export default {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
  lookup,
  getDtos,
  checkIn,
  checkOut,
};
