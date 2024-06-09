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
  LOOKUP_BRANCHES = "LOOKUP_BRANCHES",
}

const GetAll = () => {
  return useQuery<IBranch[]>(queryKeys.FETCH_BRANCHES, branchRequests.getAll);
};

const Get = (id: string) => {
  return useQuery<IBranch>({
    queryKey: [queryKeys.FETCH_BRANCH, id],
    queryFn: () => branchRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_BRANCH,
    mutationFn: (branch: IBranch) => branchRequests.create(branch),
    onSuccess: (branch) => {
      queryClient.invalidateQueries(queryKeys.FETCH_BRANCH);
      queryClient.setQueryData<IBranch[]>(queryKeys.FETCH_BRANCHES, (old) => {
        return old ? [...old, branch] : [branch];
      });
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_BRANCH,
    mutationFn: (branches: IBranch[]) => branchRequests.createRange(branches),
    onSuccess: (branches) => {
      queryClient.setQueryData<IBranch[]>(queryKeys.FETCH_BRANCHES, (old) => {
        return old ? [...old, ...branches] : branches;
      });
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_BRANCH,
    mutationFn: (branch: IBranch) => branchRequests.update(branch),
    onSuccess: (branch) => {
      queryClient.setQueryData<IBranch[]>(queryKeys.FETCH_BRANCHES, (old) => {
        if (old) {
          const index = old.findIndex((x) => x.id === branch.id);
          old[index] = branch;
          return [...old];
        }
        return [branch];
      });
      queryClient.setQueryData<IBranch>(
        [queryKeys.FETCH_BRANCH, branch.id],
        branch
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_BRANCH,
    mutationFn: (id: string) => branchRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_BRANCHES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_BRANCH,
    mutationFn: (ids: string[]) => branchRequests.removeRange(ids),
    onSuccess: () => {
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

const Lookup = () => {
  return useQuery(queryKeys.LOOKUP_BRANCHES, branchRequests.lookup);
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
  Lookup,
};
