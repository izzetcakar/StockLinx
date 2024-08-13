import { ICompany } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "Company/";

const getAll = () => {
  return baseRequests.getAll<ICompany>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<ICompany>(requestUrl, id);
};

const create = (company: ICompany) => {
  return baseRequests.create<ICompany>(requestUrl, company);
};

const createRange = (companies: ICompany[]) => {
  return baseRequests.createRange<ICompany>(requestUrl, companies);
};

const update = (company: ICompany) => {
  return baseRequests.update<ICompany>(requestUrl, company);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const lookup = () => {
  return baseRequests.lookup(requestUrl);
};

const getDtos = async (ids: string[]) => {
  return baseRequests.getDtos(requestUrl, ids);
};

export default {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  getDtos,
  lookup,
};
