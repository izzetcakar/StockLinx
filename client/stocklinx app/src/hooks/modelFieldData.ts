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

const Get =(id: string) => {
  return useQuery<IModelFieldData>({
    queryKey: [queryKeys.FETCH_MODELFIELDDATA, id],
    queryFn: () => modelFieldDataRequests.get(id),
  });
};

const Create =(modelFieldData: IModelFieldData) => {
  return useMutation<IModelFieldData>({
    mutationKey: queryKeys.CREATE_MODELFIELDDATA,
    mutationFn: () => modelFieldDataRequests.create(modelFieldData),
    onSuccess: () => {
      queryClient.setQueryData<IModelFieldData[]>(
        queryKeys.CREATE_MODELFIELDDATA,
        (old) => {
          return old ? [...old, modelFieldData] : [modelFieldData];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_MODELFIELDDATAS);
      queryClient.invalidateQueries(queryKeys.FETCH_MODELFIELDDATA);
    },
  });
};

const CreateRange = (modelFieldDatas: IModelFieldData[]) => {
  return useMutation<IModelFieldData[]>({
    mutationKey: queryKeys.CREATE_RANGE_MODELFIELDDATA,
    mutationFn: () => modelFieldDataRequests.createRange(modelFieldDatas),
    onSuccess: () => {
      queryClient.setQueriesData<IModelFieldData[]>(
        queryKeys.CREATE_RANGE_MODELFIELDDATA,
        (old) => {
          return old ? [...old, ...modelFieldDatas] : modelFieldDatas;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_MODELFIELDDATA);
      queryClient.invalidateQueries(queryKeys.FETCH_MODELFIELDDATAS);
    },
  });
};

const Update = (modelFieldData: IModelFieldData) => {
  return useMutation<IModelFieldData>({
    mutationKey: queryKeys.UPDATE_MODELFIELDDATA,
    mutationFn: () => modelFieldDataRequests.update(modelFieldData),
    onSuccess: () => {
      queryClient.setQueryData<IModelFieldData[]>(
        queryKeys.UPDATE_MODELFIELDDATA,
        (old) => {
          return old
            ? old.map((item) =>
                item.id === modelFieldData.id ? modelFieldData : item
              )
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_MODELFIELDDATA);
      queryClient.invalidateQueries(queryKeys.FETCH_MODELFIELDDATAS);
      queryClient.invalidateQueries([
        queryKeys.FETCH_MODELFIELDDATA,
        modelFieldData.id,
      ]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_MODELFIELDDATA,
    mutationFn: () => modelFieldDataRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IModelFieldData[]>(
        queryKeys.DELETE_MODELFIELDDATA,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_MODELFIELDDATA);
      queryClient.invalidateQueries(queryKeys.FETCH_MODELFIELDDATAS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_MODELFIELDDATA,
    mutationFn: () => modelFieldDataRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IModelFieldData[]>(
        queryKeys.DELETE_RANGE_MODELFIELDDATA,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_MODELFIELDDATA);
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
