import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { getQueryFilter } from "@/utils/filterUtilts";
import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
} from "@interfaces/dtos";
import { IAssetProduct, IComponent } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "Component/";

const getAll = async (): Promise<IComponent[]> => {
  return (await request<IComponent>({ requestUrl: requestUrl, apiType: "get" }))
    .data as IComponent[];
};

const get = async (id: string): Promise<IComponent> => {
  return (
    await request<IComponent>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IComponent;
};

const create = async (component: IComponent): Promise<IComponent> => {
  return (
    await request<IComponent>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: component,
    })
  ).data as IComponent;
};

const createRange = async (components: IComponent[]): Promise<IComponent[]> => {
  return (
    await request<IComponent>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: components,
    })
  ).data as IComponent[];
};

const update = async (component: IComponent): Promise<IComponent> => {
  return (
    await request<IComponent>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: component,
    })
  ).data as IComponent;
};

const remove = (id: string) => {
  return request<IComponent>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IComponent>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
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

const filter = async (queryFilters: QueryFilter[]): Promise<IComponent[]> => {
  return (
    await request<IComponent>({
      requestUrl: requestUrl + "filter",
      apiType: "get",
      params: getQueryFilter(queryFilters),
    })
  ).data as IComponent[];
};

export const componentRequests = {
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
