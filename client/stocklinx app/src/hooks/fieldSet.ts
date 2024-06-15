import { IFieldSet } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { fieldSetRequests } from "@/server/requests/fieldSet";
import { useMutation, useQuery } from "react-query";

export enum fieldSetKeys {
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
  LOOKUP_FIELDSETS = "LOOKUP_FIELDSETS",
}

const GetAll = () => {
  return useQuery<IFieldSet[]>(
    fieldSetKeys.FETCH_FIELDSETS,
    fieldSetRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IFieldSet>({
    queryKey: [fieldSetKeys.FETCH_FIELDSET, id],
    queryFn: () => fieldSetRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: fieldSetKeys.CREATE_FIELDSET,
    mutationFn: (fieldSet: IFieldSet) => fieldSetRequests.create(fieldSet),
    onSuccess: (fieldSet) => {
      queryClient.setQueryData<IFieldSet[]>(
        fieldSetKeys.FETCH_FIELDSETS,
        (old) => {
          return old ? [...old, fieldSet] : [fieldSet];
        }
      );
      queryClient.invalidateQueries(fieldSetKeys.LOOKUP_FIELDSETS);
      queryClient.invalidateQueries(fieldSetKeys.FILTER_FIELDSETS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: fieldSetKeys.CREATE_RANGE_FIELDSET,
    mutationFn: (fieldSets: IFieldSet[]) =>
      fieldSetRequests.createRange(fieldSets),
    onSuccess: (fieldSets) => {
      queryClient.setQueryData<IFieldSet[]>(
        fieldSetKeys.FETCH_FIELDSETS,
        (old) => {
          return old ? [...old, ...fieldSets] : fieldSets;
        }
      );
      queryClient.invalidateQueries(fieldSetKeys.LOOKUP_FIELDSETS);
      queryClient.invalidateQueries(fieldSetKeys.FILTER_FIELDSETS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: fieldSetKeys.UPDATE_FIELDSET,
    mutationFn: (fieldSet: IFieldSet) => fieldSetRequests.update(fieldSet),
    onSuccess: (fieldSet) => {
      queryClient.setQueryData<IFieldSet[]>(
        fieldSetKeys.FETCH_FIELDSETS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === fieldSet.id);
            old[index] = fieldSet;
            return [...old];
          }
          return [fieldSet];
        }
      );
      queryClient.setQueryData<IFieldSet>(
        [fieldSetKeys.FETCH_FIELDSET, fieldSet.id],
        fieldSet
      );
      queryClient.invalidateQueries(fieldSetKeys.LOOKUP_FIELDSETS);
      queryClient.invalidateQueries(fieldSetKeys.FILTER_FIELDSETS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: fieldSetKeys.DELETE_FIELDSET,
    mutationFn: (id: string) => fieldSetRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(fieldSetKeys.FETCH_FIELDSETS);
      queryClient.invalidateQueries(fieldSetKeys.LOOKUP_FIELDSETS);
      queryClient.invalidateQueries(fieldSetKeys.FILTER_FIELDSETS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: fieldSetKeys.DELETE_RANGE_FIELDSET,
    mutationFn: (ids: string[]) => fieldSetRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(fieldSetKeys.FETCH_FIELDSETS);
      queryClient.invalidateQueries(fieldSetKeys.LOOKUP_FIELDSETS);
      queryClient.invalidateQueries(fieldSetKeys.FILTER_FIELDSETS);
    },
  });
};

const Lookup = () => {
  return useQuery(fieldSetKeys.LOOKUP_FIELDSETS, fieldSetRequests.lookup);
};

export const useFieldSet = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Lookup,
};
