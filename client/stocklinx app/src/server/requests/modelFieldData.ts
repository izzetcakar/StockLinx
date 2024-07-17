import { IModelFieldData } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "ModelFieldData/";

const getAll = () => {
  return baseRequests.getAll<IModelFieldData>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IModelFieldData>(requestUrl, id);
};

const create = (modelFieldData: IModelFieldData) => {
  return baseRequests.create<IModelFieldData>(requestUrl, modelFieldData);
};

const createRange = (modelFieldDatas: IModelFieldData[]) => {
  return baseRequests.createRange<IModelFieldData>(requestUrl, modelFieldDatas);
};

const update = (modelFieldData: IModelFieldData) => {
  return baseRequests.update<IModelFieldData>(requestUrl, modelFieldData);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

export default {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
};
