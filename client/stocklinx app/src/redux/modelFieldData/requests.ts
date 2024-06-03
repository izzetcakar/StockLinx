import { IModelFieldData } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "ModelFieldData/";

const getAll = async (): Promise<IModelFieldData[]> => {
  return (
    await request<IModelFieldData>({ requestUrl: requestUrl, apiType: "get" })
  ).data as IModelFieldData[];
};

const get = async (id: string): Promise<IModelFieldData> => {
  return (
    await request<IModelFieldData>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IModelFieldData;
};

const create = async (
  consumable: IModelFieldData
): Promise<IModelFieldData> => {
  return (
    await request<IModelFieldData>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as IModelFieldData;
};

const createRange = async (
  consumables: IModelFieldData[]
): Promise<IModelFieldData[]> => {
  return (
    await request<IModelFieldData>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as IModelFieldData[];
};

const update = async (
  consumable: IModelFieldData
): Promise<IModelFieldData> => {
  return (
    await request<IModelFieldData>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as IModelFieldData;
};

const remove = (id: string) => {
  return request<IModelFieldData>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IModelFieldData>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const modelFieldDataRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
