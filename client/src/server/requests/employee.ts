import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IEmployee, ISubmissionDto } from "@interfaces/serverInterfaces";
import { baseRequests } from "@/utils/requestUtils";
import { request } from "../api";

const requestUrl = "Employee/";

const getAll = () => {
  return baseRequests.getAll<IEmployee>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IEmployee>(requestUrl, id);
};

const create = (employee: IEmployee) => {
  return baseRequests.create<IEmployee>(requestUrl, employee);
};

const createRange = (employees: IEmployee[]) => {
  return baseRequests.createRange<IEmployee>(requestUrl, employees);
};

const update = (employee: IEmployee) => {
  return baseRequests.update<IEmployee>(requestUrl, employee);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IEmployee>(requestUrl, queryFilters);
};

const lookup = () => {
  return baseRequests.lookup(requestUrl, ["firstName", "lastName"]);
};

const getDtos = async (ids: string[]) => {
  return baseRequests.getDtos(requestUrl, ids);
};

const getSubmission = async (employeeId: string): Promise<ISubmissionDto> => {
  return (
    await request<any>({
      requestUrl: requestUrl + "submission/" + employeeId,
      apiType: "get",
    })
  ).data;
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
  getSubmission,
};
