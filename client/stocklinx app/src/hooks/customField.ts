import { ICustomField } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { customFieldRequests } from "@/server/requests/customField";
import { useMutation, useQuery } from "react-query";

export enum customFieldKeys {
  FETCH_CUSTOMFIELDS = "FETCH_CUSTOMFIELDS",
  FETCH_CUSTOMFIELD = "FETCH_CUSTOMFIELD",
  CREATE_CUSTOMFIELD = "CREATE_CUSTOMFIELD",
  UPDATE_CUSTOMFIELD = "UPDATE_CUSTOMFIELD",
  DELETE_CUSTOMFIELD = "DELETE_CUSTOMFIELD",
  CREATE_RANGE_CUSTOMFIELD = "CREATE_RANGE_CUSTOMFIELD",
  DELETE_RANGE_CUSTOMFIELD = "DELETE_RANGE_CUSTOMFIELD",
  CHECK_IN_CUSTOMFIELD = "CHECK_IN_CUSTOMFIELD",
  CHECK_OUT_CUSTOMFIELD = "CHECK_OUT_CUSTOMFIELD",
  FILTER_CUSTOMFIELDS = "FILTER_CUSTOMFIELDS",
  LOOKUP_CUSTOMFIELDS = "LOOKUP_CUSTOMFIELDS",
}

const GetAll = () => {
  return useQuery<ICustomField[]>(
    customFieldKeys.FETCH_CUSTOMFIELDS,
    customFieldRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<ICustomField>({
    queryKey: [customFieldKeys.FETCH_CUSTOMFIELD, id],
    queryFn: () => customFieldRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: customFieldKeys.CREATE_CUSTOMFIELD,
    mutationFn: (customField: ICustomField) =>
      customFieldRequests.create(customField),
    onSuccess: (customField) => {
      queryClient.setQueryData<ICustomField[]>(
        customFieldKeys.FETCH_CUSTOMFIELDS,
        (old) => {
          return old ? [...old, customField] : [customField];
        }
      );
      queryClient.invalidateQueries(customFieldKeys.LOOKUP_CUSTOMFIELDS);
      queryClient.invalidateQueries(customFieldKeys.FILTER_CUSTOMFIELDS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: customFieldKeys.CREATE_RANGE_CUSTOMFIELD,
    mutationFn: (customFields: ICustomField[]) =>
      customFieldRequests.createRange(customFields),
    onSuccess: (customFields) => {
      queryClient.setQueryData<ICustomField[]>(
        customFieldKeys.FETCH_CUSTOMFIELDS,
        (old) => {
          return old ? [...old, ...customFields] : customFields;
        }
      );
      queryClient.invalidateQueries(customFieldKeys.LOOKUP_CUSTOMFIELDS);
      queryClient.invalidateQueries(customFieldKeys.FILTER_CUSTOMFIELDS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: customFieldKeys.UPDATE_CUSTOMFIELD,
    mutationFn: (customField: ICustomField) =>
      customFieldRequests.update(customField),
    onSuccess: (customField) => {
      queryClient.setQueryData<ICustomField[]>(
        customFieldKeys.FETCH_CUSTOMFIELDS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === customField.id);
            old[index] = customField;
            return [...old];
          }
          return [customField];
        }
      );
      queryClient.setQueryData<ICustomField>(
        [customFieldKeys.FETCH_CUSTOMFIELD, customField.id],
        customField
      );
      queryClient.invalidateQueries(customFieldKeys.LOOKUP_CUSTOMFIELDS);
      queryClient.invalidateQueries(customFieldKeys.FILTER_CUSTOMFIELDS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: customFieldKeys.DELETE_CUSTOMFIELD,
    mutationFn: (id: string) => customFieldRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(customFieldKeys.FETCH_CUSTOMFIELDS);
      queryClient.invalidateQueries(customFieldKeys.LOOKUP_CUSTOMFIELDS);
      queryClient.invalidateQueries(customFieldKeys.FILTER_CUSTOMFIELDS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: customFieldKeys.DELETE_RANGE_CUSTOMFIELD,
    mutationFn: (ids: string[]) => customFieldRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(customFieldKeys.FETCH_CUSTOMFIELDS);
      queryClient.invalidateQueries(customFieldKeys.LOOKUP_CUSTOMFIELDS);
      queryClient.invalidateQueries(customFieldKeys.FILTER_CUSTOMFIELDS);
    },
  });
};

const Lookup = () => {
  return useQuery(
    customFieldKeys.LOOKUP_CUSTOMFIELDS,
    customFieldRequests.lookup
  );
};

export const useCustomField = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Lookup,
};
