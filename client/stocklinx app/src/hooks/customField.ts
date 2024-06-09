import { ICustomField } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { customFieldRequests } from "@/server/requests/customField";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
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
    queryKeys.FETCH_CUSTOMFIELDS,
    customFieldRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<ICustomField>({
    queryKey: [queryKeys.FETCH_CUSTOMFIELD, id],
    queryFn: () => customFieldRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_CUSTOMFIELD,
    mutationFn: (customField: ICustomField) =>
      customFieldRequests.create(customField),
    onSuccess: (customField) => {
      queryClient.invalidateQueries(queryKeys.FETCH_CUSTOMFIELD);
      queryClient.setQueryData<ICustomField[]>(
        queryKeys.FETCH_CUSTOMFIELDS,
        (old) => {
          return old ? [...old, customField] : [customField];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_CUSTOMFIELD,
    mutationFn: (customFields: ICustomField[]) =>
      customFieldRequests.createRange(customFields),
    onSuccess: (customFields) => {
      queryClient.setQueryData<ICustomField[]>(
        queryKeys.FETCH_CUSTOMFIELDS,
        (old) => {
          return old ? [...old, ...customFields] : customFields;
        }
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_CUSTOMFIELD,
    mutationFn: (customField: ICustomField) =>
      customFieldRequests.update(customField),
    onSuccess: (customField) => {
      queryClient.setQueryData<ICustomField[]>(
        queryKeys.FETCH_CUSTOMFIELDS,
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
        [queryKeys.FETCH_CUSTOMFIELD, customField.id],
        customField
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_CUSTOMFIELD,
    mutationFn: (id: string) => customFieldRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_CUSTOMFIELDS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_CUSTOMFIELD,
    mutationFn: (ids: string[]) => customFieldRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_CUSTOMFIELDS);
    },
  });
};

const Lookup = () => {
  return useQuery(queryKeys.LOOKUP_CUSTOMFIELDS, customFieldRequests.lookup);
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
