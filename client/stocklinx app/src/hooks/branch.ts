import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IBranch } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { branchRequests } from "@/server/requests/branch";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_BRANCHES = "FETCH_BRANCHES",
  FETCH_BRANCH = "FETCH_BRANCH",
  CREATE_BRANCH = "CREATE_BRANCH",
  UPDATE_BRANCH = "UPDATE_BRANCH",
  DELETE_BRANCH = "DELETE_BRANCH",
  CREATE_RANGE_BRANCH = "CREATE_RANGE_BRANCH",
  DELETE_RANGE_BRANCH = "DELETE_RANGE_BRANCH",
  CHECK_IN_BRANCH = "CHECK_IN_BRANCH",
  CHECK_OUT_BRANCH = "CHECK_OUT_BRANCH",
  FILTER_BRANCHES = "FILTER_BRANCHES",
}

const GetAll = () => {
  return useQuery<IBranch[]>(queryKeys.FETCH_BRANCHES, branchRequests.getAll);
};

const Get =(id: string) => {
  return useQuery<IBranch>({
    queryKey: [queryKeys.FETCH_BRANCH, id],
    queryFn: () => branchRequests.get(id),
  });
};

const Create =(branch: IBranch) => {
  return useMutation<IBranch>({
    mutationKey: queryKeys.CREATE_BRANCH,
    mutationFn: () => branchRequests.create(branch),
    onSuccess: () => {
      queryClient.setQueryData<IBranch[]>(queryKeys.CREATE_BRANCH, (old) => {
        return old ? [...old, branch] : [branch];
      });
      queryClient.invalidateQueries(queryKeys.FETCH_BRANCHES);
      queryClient.invalidateQueries(queryKeys.FETCH_BRANCH);
    },
  });
};

const CreateRange = (branches: IBranch[]) => {
  return useMutation<IBranch[]>({
    mutationKey: queryKeys.CREATE_RANGE_BRANCH,
    mutationFn: () => branchRequests.createRange(branches),
    onSuccess: () => {
      queryClient.setQueriesData<IBranch[]>(
        queryKeys.CREATE_RANGE_BRANCH,
        (old) => {
          return old ? [...old, ...branches] : branches;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_BRANCH);
      queryClient.invalidateQueries(queryKeys.FETCH_BRANCHES);
    },
  });
};

const Update = (branch: IBranch) => {
  return useMutation<IBranch>({
    mutationKey: queryKeys.UPDATE_BRANCH,
    mutationFn: () => branchRequests.update(branch),
    onSuccess: () => {
      queryClient.setQueryData<IBranch[]>(queryKeys.UPDATE_BRANCH, (old) => {
        return old
          ? old.map((item) => (item.id === branch.id ? branch : item))
          : [];
      });
      queryClient.invalidateQueries(queryKeys.UPDATE_BRANCH);
      queryClient.invalidateQueries(queryKeys.FETCH_BRANCHES);
      queryClient.invalidateQueries([queryKeys.FETCH_BRANCH, branch.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_BRANCH,
    mutationFn: () => branchRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IBranch[]>(queryKeys.DELETE_BRANCH, (old) => {
        return old ? old.filter((item) => item.id !== id) : [];
      });
      queryClient.invalidateQueries(queryKeys.DELETE_BRANCH);
      queryClient.invalidateQueries(queryKeys.FETCH_BRANCHES);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_BRANCH,
    mutationFn: () => branchRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IBranch[]>(
        queryKeys.DELETE_RANGE_BRANCH,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_BRANCH);
      queryClient.invalidateQueries(queryKeys.FETCH_BRANCHES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_BRANCHES,
    mutationFn: (filters: QueryFilter[]) => branchRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IBranch[]>(queryKeys.FILTER_BRANCHES, data);
    },
  });
};

export const useBranch = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
};
