import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IDepartment } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { departmentRequests } from "@/server/requests/department";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_DEPARTMENTS = "FETCH_DEPARTMENTS",
  FETCH_DEPARTMENT = "FETCH_DEPARTMENT",
  CREATE_DEPARTMENT = "CREATE_DEPARTMENT",
  UPDATE_DEPARTMENT = "UPDATE_DEPARTMENT",
  DELETE_DEPARTMENT = "DELETE_DEPARTMENT",
  CREATE_RANGE_DEPARTMENT = "CREATE_RANGE_DEPARTMENT",
  DELETE_RANGE_DEPARTMENT = "DELETE_RANGE_DEPARTMENT",
  CHECK_IN_DEPARTMENT = "CHECK_IN_DEPARTMENT",
  CHECK_OUT_DEPARTMENT = "CHECK_OUT_DEPARTMENT",
  FILTER_DEPARTMENTS = "FILTER_DEPARTMENTS",
  LOOKUP_DEPARTMENTS = "LOOKUP_DEPARTMENTS",
}

const GetAll = () => {
  return useQuery<IDepartment[]>(
    queryKeys.FETCH_DEPARTMENTS,
    departmentRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IDepartment>({
    queryKey: [queryKeys.FETCH_DEPARTMENT, id],
    queryFn: () => departmentRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_DEPARTMENT,
    mutationFn: (department: IDepartment) =>
      departmentRequests.create(department),
    onSuccess: (department) => {
      queryClient.invalidateQueries(queryKeys.FETCH_DEPARTMENT);
      queryClient.setQueryData<IDepartment[]>(
        queryKeys.FETCH_DEPARTMENTS,
        (old) => {
          return old ? [...old, department] : [department];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_DEPARTMENT,
    mutationFn: (departments: IDepartment[]) =>
      departmentRequests.createRange(departments),
    onSuccess: (departments) => {
      queryClient.setQueryData<IDepartment[]>(
        queryKeys.FETCH_DEPARTMENTS,
        (old) => {
          return old ? [...old, ...departments] : departments;
        }
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_DEPARTMENT,
    mutationFn: (department: IDepartment) =>
      departmentRequests.update(department),
    onSuccess: (department) => {
      queryClient.setQueryData<IDepartment[]>(
        queryKeys.FETCH_DEPARTMENTS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === department.id);
            old[index] = department;
            return [...old];
          }
          return [department];
        }
      );
      queryClient.setQueryData<IDepartment>(
        [queryKeys.FETCH_DEPARTMENT, department.id],
        department
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_DEPARTMENT,
    mutationFn: (id: string) => departmentRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_DEPARTMENTS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_DEPARTMENT,
    mutationFn: (ids: string[]) => departmentRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_DEPARTMENTS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_DEPARTMENTS,
    mutationFn: (filters: QueryFilter[]) => departmentRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IDepartment[]>(
        queryKeys.FILTER_DEPARTMENTS,
        data
      );
    },
  });
};

const Lookup = () => {
  return useQuery(queryKeys.LOOKUP_DEPARTMENTS, departmentRequests.lookup);
};

export const useDepartment = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  Lookup,
};
