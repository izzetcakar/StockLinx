import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
} from "@interfaces/dtos";
import { IAssetProduct, IComponent } from "@interfaces/serverInterfaces";
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

const checkIn = async (
  checkInDto: AssetProductCheckInDto
): Promise<IAssetProduct> => {
  return (
    await request<IAssetProduct>({
      requestUrl: requestUrl + "checkin",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as IAssetProduct;
};

const checkOut = (checkOutDto: AssetProductCheckOutDto) => {
  return request<IComponent>({
    requestUrl: requestUrl + "checkout",
    apiType: "post",
    queryData: checkOutDto,
  });
};

export const componentRequests = {
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
