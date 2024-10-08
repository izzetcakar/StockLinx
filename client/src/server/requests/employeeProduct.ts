import { IEmployeeProduct } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "EmployeeProduct/";

const getAll = () => {
  return baseRequests.getAll<IEmployeeProduct>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IEmployeeProduct>(requestUrl, id);
};

const create = (employeeProduct: IEmployeeProduct) => {
  return baseRequests.create<IEmployeeProduct>(requestUrl, employeeProduct);
};

const createRange = (employeeProducts: IEmployeeProduct[]) => {
  return baseRequests.createRange<IEmployeeProduct>(
    requestUrl,
    employeeProducts
  );
};

const update = (employeeProduct: IEmployeeProduct) => {
  return baseRequests.update<IEmployeeProduct>(requestUrl, employeeProduct);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
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
};
