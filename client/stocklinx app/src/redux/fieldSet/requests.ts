import { IFieldSet } from "@interfaces/serverInterfaces";
import { request } from "@request";
const requestUrl = "FieldSet/";

const getAll = async (): Promise<IFieldSet[]> => {
  return (await request<IFieldSet>({ requestUrl: requestUrl, apiType: "get" }))
    .data as IFieldSet[];
};

const get = async (id: string): Promise<IFieldSet> => {
  return (
    await request<IFieldSet>({
      requestUrl: requestUrl + id,
      apiType: "get",
    })
  ).data as IFieldSet;
};

const create = async (consumable: IFieldSet): Promise<IFieldSet> => {
  return (
    await request<IFieldSet>({
      requestUrl: requestUrl,
      apiType: "post",
      queryData: consumable,
    })
  ).data as IFieldSet;
};

const createRange = async (consumables: IFieldSet[]): Promise<IFieldSet[]> => {
  return (
    await request<IFieldSet>({
      requestUrl: requestUrl + "range",
      apiType: "post",
      queryData: consumables,
    })
  ).data as IFieldSet[];
};

const update = async (consumable: IFieldSet): Promise<IFieldSet> => {
  return (
    await request<IFieldSet>({
      requestUrl: requestUrl,
      apiType: "put",
      queryData: consumable,
    })
  ).data as IFieldSet;
};

const remove = (id: string) => {
  return request<IFieldSet>({
    requestUrl: requestUrl + id,
    apiType: "delete",
  });
};

const removeRange = (ids: string[]) => {
  return request<IFieldSet>({
    requestUrl: requestUrl + "range",
    apiType: "delete",
    queryData: ids,
  });
};

export const fieldSetRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
