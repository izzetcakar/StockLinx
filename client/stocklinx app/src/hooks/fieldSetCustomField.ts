import { IFieldSetCustomField } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { fieldSetCustomFieldRequests } from "@/server/requests/fieldSetCustomField";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_FIELDSETCUSTOMFIELDS = "FETCH_FIELDSETCUSTOMFIELDS",
  FETCH_FIELDSETCUSTOMFIELD = "FETCH_FIELDSETCUSTOMFIELD",
  CREATE_FIELDSETCUSTOMFIELD = "CREATE_FIELDSETCUSTOMFIELD",
  UPDATE_FIELDSETCUSTOMFIELD = "UPDATE_FIELDSETCUSTOMFIELD",
  DELETE_FIELDSETCUSTOMFIELD = "DELETE_FIELDSETCUSTOMFIELD",
  CREATE_RANGE_FIELDSETCUSTOMFIELD = "CREATE_RANGE_FIELDSETCUSTOMFIELD",
  DELETE_RANGE_FIELDSETCUSTOMFIELD = "DELETE_RANGE_FIELDSETCUSTOMFIELD",
  CHECK_IN_FIELDSETCUSTOMFIELD = "CHECK_IN_FIELDSETCUSTOMFIELD",
  CHECK_OUT_FIELDSETCUSTOMFIELD = "CHECK_OUT_FIELDSETCUSTOMFIELD",
  FILTER_FIELDSETCUSTOMFIELDS = "FILTER_FIELDSETCUSTOMFIELDS",
  SYNC_FIELDSETCUSTOMFIELDS = "SYNC_FIELDSETCUSTOMFIELDS",
}

const GetAll = () => {
  return useQuery<IFieldSetCustomField[]>(
    queryKeys.FETCH_FIELDSETCUSTOMFIELDS,
    fieldSetCustomFieldRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IFieldSetCustomField>({
    queryKey: [queryKeys.FETCH_FIELDSETCUSTOMFIELD, id],
    queryFn: () => fieldSetCustomFieldRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_FIELDSETCUSTOMFIELD,
    mutationFn: (fieldSetCustomField: IFieldSetCustomField) =>
      fieldSetCustomFieldRequests.create(fieldSetCustomField),
    onSuccess: (fieldSetCustomField) => {
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETCUSTOMFIELD);
      queryClient.setQueryData<IFieldSetCustomField[]>(
        queryKeys.FETCH_FIELDSETCUSTOMFIELDS,
        (old) => {
          return old ? [...old, fieldSetCustomField] : [fieldSetCustomField];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_FIELDSETCUSTOMFIELD,
    mutationFn: (fieldSetCustomFields: IFieldSetCustomField[]) =>
      fieldSetCustomFieldRequests.createRange(fieldSetCustomFields),
    onSuccess: (fieldSetCustomFields) => {
      queryClient.setQueryData<IFieldSetCustomField[]>(
        queryKeys.FETCH_FIELDSETCUSTOMFIELDS,
        (old) => {
          return old ? [...old, ...fieldSetCustomFields] : fieldSetCustomFields;
        }
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_FIELDSETCUSTOMFIELD,
    mutationFn: (fieldSetCustomField: IFieldSetCustomField) =>
      fieldSetCustomFieldRequests.update(fieldSetCustomField),
    onSuccess: (fieldSetCustomField) => {
      queryClient.setQueryData<IFieldSetCustomField[]>(
        queryKeys.FETCH_FIELDSETCUSTOMFIELDS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === fieldSetCustomField.id);
            old[index] = fieldSetCustomField;
            return [...old];
          }
          return [fieldSetCustomField];
        }
      );
      queryClient.setQueryData<IFieldSetCustomField>(
        [queryKeys.FETCH_FIELDSETCUSTOMFIELD, fieldSetCustomField.id],
        fieldSetCustomField
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_FIELDSETCUSTOMFIELD,
    mutationFn: (id: string) => fieldSetCustomFieldRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETCUSTOMFIELDS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_FIELDSETCUSTOMFIELD,
    mutationFn: (ids: string[]) => fieldSetCustomFieldRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETCUSTOMFIELDS);
    },
  });
};

const Sync = (fieldSetCustomFields: IFieldSetCustomField[]) => {
  return useMutation({
    mutationKey: queryKeys.SYNC_FIELDSETCUSTOMFIELDS,
    mutationFn: () =>
      fieldSetCustomFieldRequests.synchronize(fieldSetCustomFields),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.SYNC_FIELDSETCUSTOMFIELDS);
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETCUSTOMFIELDS);
    },
  });
};

export const useFieldSetCustomField = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Sync,
};
