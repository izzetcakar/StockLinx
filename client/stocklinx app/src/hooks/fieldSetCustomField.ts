import { IFieldSetCustomField } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { fieldSetCustomFieldRequests } from "@/server/requests/fieldSetCustomField";
import { useMutation, useQuery } from "react-query";

export enum fieldSetCustomFieldKeys {
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
    fieldSetCustomFieldKeys.FETCH_FIELDSETCUSTOMFIELDS,
    fieldSetCustomFieldRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IFieldSetCustomField>({
    queryKey: [fieldSetCustomFieldKeys.FETCH_FIELDSETCUSTOMFIELD, id],
    queryFn: () => fieldSetCustomFieldRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: fieldSetCustomFieldKeys.CREATE_FIELDSETCUSTOMFIELD,
    mutationFn: (fieldSetCustomField: IFieldSetCustomField) =>
      fieldSetCustomFieldRequests.create(fieldSetCustomField),
    onSuccess: (fieldSetCustomField) => {
      queryClient.setQueryData<IFieldSetCustomField[]>(
        fieldSetCustomFieldKeys.FETCH_FIELDSETCUSTOMFIELDS,
        (old) => {
          return old ? [...old, fieldSetCustomField] : [fieldSetCustomField];
        }
      );
      queryClient.invalidateQueries(
        fieldSetCustomFieldKeys.FILTER_FIELDSETCUSTOMFIELDS
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: fieldSetCustomFieldKeys.CREATE_RANGE_FIELDSETCUSTOMFIELD,
    mutationFn: (fieldSetCustomFields: IFieldSetCustomField[]) =>
      fieldSetCustomFieldRequests.createRange(fieldSetCustomFields),
    onSuccess: (fieldSetCustomFields) => {
      queryClient.setQueryData<IFieldSetCustomField[]>(
        fieldSetCustomFieldKeys.FETCH_FIELDSETCUSTOMFIELDS,
        (old) => {
          return old ? [...old, ...fieldSetCustomFields] : fieldSetCustomFields;
        }
      );
      queryClient.invalidateQueries(
        fieldSetCustomFieldKeys.FILTER_FIELDSETCUSTOMFIELDS
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: fieldSetCustomFieldKeys.UPDATE_FIELDSETCUSTOMFIELD,
    mutationFn: (fieldSetCustomField: IFieldSetCustomField) =>
      fieldSetCustomFieldRequests.update(fieldSetCustomField),
    onSuccess: (fieldSetCustomField) => {
      queryClient.setQueryData<IFieldSetCustomField[]>(
        fieldSetCustomFieldKeys.FETCH_FIELDSETCUSTOMFIELDS,
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
        [
          fieldSetCustomFieldKeys.FETCH_FIELDSETCUSTOMFIELD,
          fieldSetCustomField.id,
        ],
        fieldSetCustomField
      );
      queryClient.invalidateQueries(
        fieldSetCustomFieldKeys.FILTER_FIELDSETCUSTOMFIELDS
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: fieldSetCustomFieldKeys.DELETE_FIELDSETCUSTOMFIELD,
    mutationFn: (id: string) => fieldSetCustomFieldRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(
        fieldSetCustomFieldKeys.FETCH_FIELDSETCUSTOMFIELDS
      );
      queryClient.invalidateQueries(
        fieldSetCustomFieldKeys.FILTER_FIELDSETCUSTOMFIELDS
      );
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: fieldSetCustomFieldKeys.DELETE_RANGE_FIELDSETCUSTOMFIELD,
    mutationFn: (ids: string[]) => fieldSetCustomFieldRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(
        fieldSetCustomFieldKeys.FETCH_FIELDSETCUSTOMFIELDS
      );
      queryClient.invalidateQueries(
        fieldSetCustomFieldKeys.FILTER_FIELDSETCUSTOMFIELDS
      );
    },
  });
};

const Sync = (fieldSetCustomFields: IFieldSetCustomField[]) => {
  return useMutation({
    mutationKey: fieldSetCustomFieldKeys.SYNC_FIELDSETCUSTOMFIELDS,
    mutationFn: () =>
      fieldSetCustomFieldRequests.synchronize(fieldSetCustomFields),
    onSuccess: () => {
      queryClient.invalidateQueries(
        fieldSetCustomFieldKeys.SYNC_FIELDSETCUSTOMFIELDS
      );
      queryClient.invalidateQueries(
        fieldSetCustomFieldKeys.FETCH_FIELDSETCUSTOMFIELDS
      );
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
