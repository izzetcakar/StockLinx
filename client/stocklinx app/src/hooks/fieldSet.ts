import { IFieldSet } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { fieldSetRequests } from "@/server/requests/fieldSet";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_FIELDSETS = "FETCH_FIELDSETS",
  FETCH_FIELDSET = "FETCH_FIELDSET",
  CREATE_FIELDSET = "CREATE_FIELDSET",
  UPDATE_FIELDSET = "UPDATE_FIELDSET",
  DELETE_FIELDSET = "DELETE_FIELDSET",
  CREATE_RANGE_FIELDSET = "CREATE_RANGE_FIELDSET",
  DELETE_RANGE_FIELDSET = "DELETE_RANGE_FIELDSET",
  CHECK_IN_FIELDSET = "CHECK_IN_FIELDSET",
  CHECK_OUT_FIELDSET = "CHECK_OUT_FIELDSET",
  FILTER_FIELDSETS = "FILTER_FIELDSETS",
}

const GetAll = () => {
  return useQuery<IFieldSet[]>(
    queryKeys.FETCH_FIELDSETS,
    fieldSetRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<IFieldSet>({
    queryKey: [queryKeys.FETCH_FIELDSET, id],
    queryFn: () => fieldSetRequests.get(id),
  });
};

const Create =(fieldSet: IFieldSet) => {
  return useMutation<IFieldSet>({
    mutationKey: queryKeys.CREATE_FIELDSET,
    mutationFn: () => fieldSetRequests.create(fieldSet),
    onSuccess: () => {
      queryClient.setQueryData<IFieldSet[]>(
        queryKeys.CREATE_FIELDSET,
        (old) => {
          return old ? [...old, fieldSet] : [fieldSet];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETS);
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSET);
    },
  });
};

const CreateRange = (fieldSets: IFieldSet[]) => {
  return useMutation<IFieldSet[]>({
    mutationKey: queryKeys.CREATE_RANGE_FIELDSET,
    mutationFn: () => fieldSetRequests.createRange(fieldSets),
    onSuccess: () => {
      queryClient.setQueriesData<IFieldSet[]>(
        queryKeys.CREATE_RANGE_FIELDSET,
        (old) => {
          return old ? [...old, ...fieldSets] : fieldSets;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_FIELDSET);
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETS);
    },
  });
};

const Update = (fieldSet: IFieldSet) => {
  return useMutation<IFieldSet>({
    mutationKey: queryKeys.UPDATE_FIELDSET,
    mutationFn: () => fieldSetRequests.update(fieldSet),
    onSuccess: () => {
      queryClient.setQueryData<IFieldSet[]>(
        queryKeys.UPDATE_FIELDSET,
        (old) => {
          return old
            ? old.map((item) => (item.id === fieldSet.id ? fieldSet : item))
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_FIELDSET);
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETS);
      queryClient.invalidateQueries([queryKeys.FETCH_FIELDSET, fieldSet.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_FIELDSET,
    mutationFn: () => fieldSetRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IFieldSet[]>(
        queryKeys.DELETE_FIELDSET,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_FIELDSET);
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_FIELDSET,
    mutationFn: () => fieldSetRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IFieldSet[]>(
        queryKeys.DELETE_RANGE_FIELDSET,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_FIELDSET);
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETS);
    },
  });
};

export const useFieldSet = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
};
