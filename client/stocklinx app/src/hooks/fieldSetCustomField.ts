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

const Get =(id: string) => {
  return useQuery<IFieldSetCustomField>({
    queryKey: [queryKeys.FETCH_FIELDSETCUSTOMFIELD, id],
    queryFn: () => fieldSetCustomFieldRequests.get(id),
  });
};

const Create =(fieldSetCustomField: IFieldSetCustomField) => {
  return useMutation<IFieldSetCustomField>({
    mutationKey: queryKeys.CREATE_FIELDSETCUSTOMFIELD,
    mutationFn: () => fieldSetCustomFieldRequests.create(fieldSetCustomField),
    onSuccess: () => {
      queryClient.setQueryData<IFieldSetCustomField[]>(
        queryKeys.CREATE_FIELDSETCUSTOMFIELD,
        (old) => {
          return old ? [...old, fieldSetCustomField] : [fieldSetCustomField];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETCUSTOMFIELDS);
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETCUSTOMFIELD);
    },
  });
};

const CreateRange = (fieldSetCustomFields: IFieldSetCustomField[]) => {
  return useMutation<IFieldSetCustomField[]>({
    mutationKey: queryKeys.CREATE_RANGE_FIELDSETCUSTOMFIELD,
    mutationFn: () =>
      fieldSetCustomFieldRequests.createRange(fieldSetCustomFields),
    onSuccess: () => {
      queryClient.setQueriesData<IFieldSetCustomField[]>(
        queryKeys.CREATE_RANGE_FIELDSETCUSTOMFIELD,
        (old) => {
          return old ? [...old, ...fieldSetCustomFields] : fieldSetCustomFields;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_FIELDSETCUSTOMFIELD);
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETCUSTOMFIELDS);
    },
  });
};

const Update = (fieldSetCustomField: IFieldSetCustomField) => {
  return useMutation<IFieldSetCustomField>({
    mutationKey: queryKeys.UPDATE_FIELDSETCUSTOMFIELD,
    mutationFn: () => fieldSetCustomFieldRequests.update(fieldSetCustomField),
    onSuccess: () => {
      queryClient.setQueryData<IFieldSetCustomField[]>(
        queryKeys.UPDATE_FIELDSETCUSTOMFIELD,
        (old) => {
          return old
            ? old.map((item) =>
                item.id === fieldSetCustomField.id ? fieldSetCustomField : item
              )
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_FIELDSETCUSTOMFIELD);
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETCUSTOMFIELDS);
      queryClient.invalidateQueries([
        queryKeys.FETCH_FIELDSETCUSTOMFIELD,
        fieldSetCustomField.id,
      ]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_FIELDSETCUSTOMFIELD,
    mutationFn: () => fieldSetCustomFieldRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IFieldSetCustomField[]>(
        queryKeys.DELETE_FIELDSETCUSTOMFIELD,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_FIELDSETCUSTOMFIELD);
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETCUSTOMFIELDS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_FIELDSETCUSTOMFIELD,
    mutationFn: () => fieldSetCustomFieldRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IFieldSetCustomField[]>(
        queryKeys.DELETE_RANGE_FIELDSETCUSTOMFIELD,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_FIELDSETCUSTOMFIELD);
      queryClient.invalidateQueries(queryKeys.FETCH_FIELDSETCUSTOMFIELDS);
    },
  });
};

const Sync = (fieldSetCustomFields: IFieldSetCustomField[]) => {
  return useMutation<IFieldSetCustomField[]>({
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
