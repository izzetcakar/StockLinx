import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IModel } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { modelRequests } from "@/server/requests/model";
import { useMutation, useQuery } from "react-query";

export enum modelKeys {
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
  LOOKUP_MODELS = "LOOKUP_MODELS",
}

const GetAll = () => {
  return useQuery<IModel[]>(modelKeys.FETCH_MODELS, modelRequests.getAll);
};

const Get = (id: string) => {
  return useQuery<IModel>({
    queryKey: [modelKeys.FETCH_MODEL, id],
    queryFn: () => modelRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: modelKeys.CREATE_MODEL,
    mutationFn: (model: IModel) => modelRequests.create(model),
    onSuccess: (model) => {
      queryClient.setQueryData<IModel[]>(modelKeys.FETCH_MODELS, (old) => {
        return old ? [...old, model] : [model];
      });
      queryClient.invalidateQueries(modelKeys.LOOKUP_MODELS);
      queryClient.invalidateQueries(modelKeys.FILTER_MODELS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: modelKeys.CREATE_RANGE_MODEL,
    mutationFn: (models: IModel[]) => modelRequests.createRange(models),
    onSuccess: (models) => {
      queryClient.setQueryData<IModel[]>(modelKeys.FETCH_MODELS, (old) => {
        return old ? [...old, ...models] : models;
      });
      queryClient.invalidateQueries(modelKeys.LOOKUP_MODELS);
      queryClient.invalidateQueries(modelKeys.FILTER_MODELS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: modelKeys.UPDATE_MODEL,
    mutationFn: (model: IModel) => modelRequests.update(model),
    onSuccess: (model) => {
      queryClient.setQueryData<IModel[]>(modelKeys.FETCH_MODELS, (old) => {
        if (old) {
          const index = old.findIndex((x) => x.id === model.id);
          old[index] = model;
          return [...old];
        }
        return [model];
      });
      queryClient.setQueryData<IModel>(
        [modelKeys.FETCH_MODEL, model.id],
        model
      );
      queryClient.invalidateQueries(modelKeys.LOOKUP_MODELS);
      queryClient.invalidateQueries(modelKeys.FILTER_MODELS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: modelKeys.DELETE_MODEL,
    mutationFn: (id: string) => modelRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(modelKeys.FETCH_MODELS);
      queryClient.invalidateQueries(modelKeys.LOOKUP_MODELS);
      queryClient.invalidateQueries(modelKeys.FILTER_MODELS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: modelKeys.DELETE_RANGE_MODEL,
    mutationFn: (ids: string[]) => modelRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(modelKeys.FETCH_MODELS);
      queryClient.invalidateQueries(modelKeys.LOOKUP_MODELS);
      queryClient.invalidateQueries(modelKeys.FILTER_MODELS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: modelKeys.FILTER_MODELS,
    mutationFn: (filters: QueryFilter[]) => modelRequests.filter(filters),
    onSuccess(data: IModel[]) {
      queryClient.setQueryData<IModel[]>(modelKeys.FILTER_MODELS, data);
    },
  });
};

const Lookup = () => {
  return useQuery(modelKeys.LOOKUP_MODELS, modelRequests.lookup);
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
  Lookup,
};
