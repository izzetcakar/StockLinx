import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IBranch } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { branchRequests } from "@/server/requests/branch";
import { useMutation, useQuery } from "react-query";

export enum branchKeys {
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
  return useQuery<IBranch[]>(branchKeys.FETCH_BRANCHES, branchRequests.getAll);
};

const Get = (id: string) => {
  return useQuery<IBranch>({
    queryKey: [branchKeys.FETCH_BRANCH, id],
    queryFn: () => branchRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: branchKeys.CREATE_BRANCH,
    mutationFn: (branch: IBranch) => branchRequests.create(branch),
    onSuccess: (branch) => {
      queryClient.setQueryData<IBranch[]>(branchKeys.FETCH_BRANCHES, (old) => {
        return old ? [...old, branch] : [branch];
      });
      queryClient.invalidateQueries(branchKeys.LOOKUP_BRANCHES);
      queryClient.invalidateQueries(branchKeys.FILTER_BRANCHES);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: branchKeys.CREATE_RANGE_BRANCH,
    mutationFn: (branches: IBranch[]) => branchRequests.createRange(branches),
    onSuccess: (branches) => {
      queryClient.setQueryData<IBranch[]>(branchKeys.FETCH_BRANCHES, (old) => {
        return old ? [...old, ...branches] : branches;
      });
      queryClient.invalidateQueries(branchKeys.LOOKUP_BRANCHES);
      queryClient.invalidateQueries(branchKeys.FILTER_BRANCHES);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: branchKeys.UPDATE_BRANCH,
    mutationFn: (branch: IBranch) => branchRequests.update(branch),
    onSuccess: (branch) => {
      queryClient.setQueryData<IBranch[]>(branchKeys.FETCH_BRANCHES, (old) => {
        if (old) {
          const index = old.findIndex((x) => x.id === branch.id);
          old[index] = branch;
          return [...old];
        }
        return [branch];
      });
      queryClient.setQueryData<IBranch>(
        [branchKeys.FETCH_BRANCH, branch.id],
        branch
      );
      queryClient.invalidateQueries(branchKeys.LOOKUP_BRANCHES);
      queryClient.invalidateQueries(branchKeys.FILTER_BRANCHES);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: branchKeys.DELETE_BRANCH,
    mutationFn: (id: string) => branchRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(branchKeys.FETCH_BRANCHES);
      queryClient.invalidateQueries(branchKeys.LOOKUP_BRANCHES);
      queryClient.invalidateQueries(branchKeys.FILTER_BRANCHES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: branchKeys.DELETE_RANGE_BRANCH,
    mutationFn: (ids: string[]) => branchRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(branchKeys.FETCH_BRANCHES);
      queryClient.invalidateQueries(branchKeys.LOOKUP_BRANCHES);
      queryClient.invalidateQueries(branchKeys.FILTER_BRANCHES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: branchKeys.FILTER_BRANCHES,
    mutationFn: (filters: QueryFilter[]) => branchRequests.filter(filters),
    onSuccess(data: IBranch[]) {
      queryClient.setQueryData<IBranch[]>(branchKeys.FILTER_BRANCHES, data);
    },
  });
};

const Lookup = () => {
  return useQuery(branchKeys.LOOKUP_BRANCHES, branchRequests.lookup);
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
