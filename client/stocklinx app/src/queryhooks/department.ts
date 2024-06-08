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
}

const GetAll = () => {
  return useQuery<IDepartment[]>(
    queryKeys.FETCH_DEPARTMENTS,
    departmentRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<IDepartment>({
    queryKey: [queryKeys.FETCH_DEPARTMENT, id],
    queryFn: () => departmentRequests.get(id),
  });
};

const Create =(department: IDepartment) => {
  return useMutation<IDepartment>({
    mutationKey: queryKeys.CREATE_DEPARTMENT,
    mutationFn: () => departmentRequests.create(department),
    onSuccess: () => {
      queryClient.setQueryData<IDepartment[]>(
        queryKeys.CREATE_DEPARTMENT,
        (old) => {
          return old ? [...old, department] : [department];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_DEPARTMENTS);
      queryClient.invalidateQueries(queryKeys.FETCH_DEPARTMENT);
    },
  });
};

const CreateRange = (departments: IDepartment[]) => {
  return useMutation<IDepartment[]>({
    mutationKey: queryKeys.CREATE_RANGE_DEPARTMENT,
    mutationFn: () => departmentRequests.createRange(departments),
    onSuccess: () => {
      queryClient.setQueriesData<IDepartment[]>(
        queryKeys.CREATE_RANGE_DEPARTMENT,
        (old) => {
          return old ? [...old, ...departments] : departments;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_DEPARTMENT);
      queryClient.invalidateQueries(queryKeys.FETCH_DEPARTMENTS);
    },
  });
};

const Update = (department: IDepartment) => {
  return useMutation<IDepartment>({
    mutationKey: queryKeys.UPDATE_DEPARTMENT,
    mutationFn: () => departmentRequests.update(department),
    onSuccess: () => {
      queryClient.setQueryData<IDepartment[]>(
        queryKeys.UPDATE_DEPARTMENT,
        (old) => {
          return old
            ? old.map((item) => (item.id === department.id ? department : item))
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_DEPARTMENT);
      queryClient.invalidateQueries(queryKeys.FETCH_DEPARTMENTS);
      queryClient.invalidateQueries([
        queryKeys.FETCH_DEPARTMENT,
        department.id,
      ]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_DEPARTMENT,
    mutationFn: () => departmentRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IDepartment[]>(
        queryKeys.DELETE_DEPARTMENT,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_DEPARTMENT);
      queryClient.invalidateQueries(queryKeys.FETCH_DEPARTMENTS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_DEPARTMENT,
    mutationFn: () => departmentRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IDepartment[]>(
        queryKeys.DELETE_RANGE_DEPARTMENT,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_DEPARTMENT);
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

export const useDepartment = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
};
