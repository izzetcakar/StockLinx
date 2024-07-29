import { employeeRequests } from "@requests";
import { baseHooks } from "./baseHooks";
import { useQuery } from "react-query";

const hooks = baseHooks("EMPLOYEE");

const GetAll = () => {
  return hooks.GetAll(employeeRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, employeeRequests.get);
};

const Create = () => {
  return hooks.Create(employeeRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(employeeRequests.createRange);
};

const Update = () => {
  return hooks.Update(employeeRequests.update);
};

const Remove = () => {
  return hooks.Remove(employeeRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(employeeRequests.removeRange);
};

const Filter = () => {
  return hooks.Filter();
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(employeeRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(employeeRequests.lookup);
};

const Submission = (employeeId: string) => {
  return useQuery({
    queryKey: "EMPLOYEE_SUBMISSION",
    queryFn: () => employeeRequests.getSubmission(employeeId),
  });
};

export default {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  ApplyFilters,
  Lookup,
  Submission,
};
