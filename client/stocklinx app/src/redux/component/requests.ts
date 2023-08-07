import { IComponent } from "../../interfaces/interfaces";
import { request } from "../../server/api";

const requestUrl = "Component/";

const getAll = () => {
  return request<IComponent>({ requestUrl: requestUrl, apiType: "get" });
};
const get = (id: string) => {
  return request<IComponent>({
    requestUrl: requestUrl + id,
    apiType: "get",
  });
};
const create = (component: IComponent) => {
  return request<IComponent>({
    requestUrl: requestUrl,
    apiType: "post",
    queryData: component,
  });
};
const update = (component: IComponent) => {
  return request<IComponent>({
    requestUrl: requestUrl,
    apiType: "put",
    queryData: component,
  });
};
const remove = (id: string) => {
  return request<IComponent>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

export const componentRequests = {
  getAll,
  get,
  create,
  update,
  remove,
};
