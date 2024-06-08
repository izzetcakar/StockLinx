import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IModel } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { modelRequests } from "@/server/requests/model";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_MODELS = "FETCH_MODELS",
  FETCH_MODEL = "FETCH_MODEL",
  CREATE_MODEL = "CREATE_MODEL",
  UPDATE_MODEL = "UPDATE_MODEL",
  DELETE_MODEL = "DELETE_MODEL",
  CREATE_RANGE_MODEL = "CREATE_RANGE_MODEL",
  DELETE_RANGE_MODEL = "DELETE_RANGE_MODEL",
  CHECK_IN_MODEL = "CHECK_IN_MODEL",
  CHECK_OUT_MODEL = "CHECK_OUT_MODEL",
  FILTER_MODELS = "FILTER_MODELS",
}

const GetAll = () => {
  return useQuery<IModel[]>(queryKeys.FETCH_MODELS, modelRequests.getAll);
};

const Get =(id: string) => {
  return useQuery<IModel>({
    queryKey: [queryKeys.FETCH_MODEL, id],
    queryFn: () => modelRequests.get(id),
  });
};

const Create =(model: IModel) => {
  return useMutation<IModel>({
    mutationKey: queryKeys.CREATE_MODEL,
    mutationFn: () => modelRequests.create(model),
    onSuccess: () => {
      queryClient.setQueryData<IModel[]>(queryKeys.CREATE_MODEL, (old) => {
        return old ? [...old, model] : [model];
      });
      queryClient.invalidateQueries(queryKeys.FETCH_MODELS);
      queryClient.invalidateQueries(queryKeys.FETCH_MODEL);
    },
  });
};

const CreateRange = (models: IModel[]) => {
  return useMutation<IModel[]>({
    mutationKey: queryKeys.CREATE_RANGE_MODEL,
    mutationFn: () => modelRequests.createRange(models),
    onSuccess: () => {
      queryClient.setQueriesData<IModel[]>(
        queryKeys.CREATE_RANGE_MODEL,
        (old) => {
          return old ? [...old, ...models] : models;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_MODEL);
      queryClient.invalidateQueries(queryKeys.FETCH_MODELS);
    },
  });
};

const Update = (model: IModel) => {
  return useMutation<IModel>({
    mutationKey: queryKeys.UPDATE_MODEL,
    mutationFn: () => modelRequests.update(model),
    onSuccess: () => {
      queryClient.setQueryData<IModel[]>(queryKeys.UPDATE_MODEL, (old) => {
        return old
          ? old.map((item) => (item.id === model.id ? model : item))
          : [];
      });
      queryClient.invalidateQueries(queryKeys.UPDATE_MODEL);
      queryClient.invalidateQueries(queryKeys.FETCH_MODELS);
      queryClient.invalidateQueries([queryKeys.FETCH_MODEL, model.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_MODEL,
    mutationFn: () => modelRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IModel[]>(queryKeys.DELETE_MODEL, (old) => {
        return old ? old.filter((item) => item.id !== id) : [];
      });
      queryClient.invalidateQueries(queryKeys.DELETE_MODEL);
      queryClient.invalidateQueries(queryKeys.FETCH_MODELS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_MODEL,
    mutationFn: () => modelRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IModel[]>(
        queryKeys.DELETE_RANGE_MODEL,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_MODEL);
      queryClient.invalidateQueries(queryKeys.FETCH_MODELS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_MODELS,
    mutationFn: (filters: QueryFilter[]) => modelRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IModel[]>(queryKeys.FILTER_MODELS, data);
    },
  });
};

export const useModel = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
};
