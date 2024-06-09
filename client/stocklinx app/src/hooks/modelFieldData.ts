import { IModelFieldData } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { modelFieldDataRequests } from "@/server/requests/modelFieldData";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_MODELFIELDDATAS = "FETCH_MODELFIELDDATAS",
  FETCH_MODELFIELDDATA = "FETCH_MODELFIELDDATA",
  CREATE_MODELFIELDDATA = "CREATE_MODELFIELDDATA",
  UPDATE_MODELFIELDDATA = "UPDATE_MODELFIELDDATA",
  DELETE_MODELFIELDDATA = "DELETE_MODELFIELDDATA",
  CREATE_RANGE_MODELFIELDDATA = "CREATE_RANGE_MODELFIELDDATA",
  DELETE_RANGE_MODELFIELDDATA = "DELETE_RANGE_MODELFIELDDATA",
  CHECK_IN_MODELFIELDDATA = "CHECK_IN_MODELFIELDDATA",
  CHECK_OUT_MODELFIELDDATA = "CHECK_OUT_MODELFIELDDATA",
  FILTER_MODELFIELDDATAS = "FILTER_MODELFIELDDATAS",
}

const GetAll = () => {
  return useQuery<IModelFieldData[]>(
    queryKeys.FETCH_MODELFIELDDATAS,
    modelFieldDataRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IModelFieldData>({
    queryKey: [queryKeys.FETCH_MODELFIELDDATA, id],
    queryFn: () => modelFieldDataRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_MODELFIELDDATA,
    mutationFn: (modelFieldData: IModelFieldData) =>
      modelFieldDataRequests.create(modelFieldData),
    onSuccess: (modelFieldData) => {
      queryClient.invalidateQueries(queryKeys.FETCH_MODELFIELDDATA);
      queryClient.setQueryData<IModelFieldData[]>(
        queryKeys.FETCH_MODELFIELDDATAS,
        (old) => {
          return old ? [...old, modelFieldData] : [modelFieldData];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_MODELFIELDDATA,
    mutationFn: (modelFieldDatas: IModelFieldData[]) =>
      modelFieldDataRequests.createRange(modelFieldDatas),
    onSuccess: (modelFieldDatas) => {
      queryClient.setQueryData<IModelFieldData[]>(
        queryKeys.FETCH_MODELFIELDDATAS,
        (old) => {
          return old ? [...old, ...modelFieldDatas] : modelFieldDatas;
        }
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_MODELFIELDDATA,
    mutationFn: (modelFieldData: IModelFieldData) =>
      modelFieldDataRequests.update(modelFieldData),
    onSuccess: (modelFieldData) => {
      queryClient.setQueryData<IModelFieldData[]>(
        queryKeys.FETCH_MODELFIELDDATAS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === modelFieldData.id);
            old[index] = modelFieldData;
            return [...old];
          }
          return [modelFieldData];
        }
      );
      queryClient.setQueryData<IModelFieldData>(
        [queryKeys.FETCH_MODELFIELDDATA, modelFieldData.id],
        modelFieldData
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_MODELFIELDDATA,
    mutationFn: (id: string) => modelFieldDataRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_MODELFIELDDATAS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_MODELFIELDDATA,
    mutationFn: (ids: string[]) => modelFieldDataRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_MODELFIELDDATAS);
    },
  });
};

export const useModelFieldData = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
};
