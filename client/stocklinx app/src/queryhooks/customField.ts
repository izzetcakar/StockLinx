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
}

const GetAll = () => {
  return useQuery<ICustomField[]>(
    queryKeys.FETCH_CUSTOMFIELDS,
    customFieldRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<ICustomField>({
    queryKey: [queryKeys.FETCH_CUSTOMFIELD, id],
    queryFn: () => customFieldRequests.get(id),
  });
};

const Create =(customField: ICustomField) => {
  return useMutation<ICustomField>({
    mutationKey: queryKeys.CREATE_CUSTOMFIELD,
    mutationFn: () => customFieldRequests.create(customField),
    onSuccess: () => {
      queryClient.setQueryData<ICustomField[]>(
        queryKeys.CREATE_CUSTOMFIELD,
        (old) => {
          return old ? [...old, customField] : [customField];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_CUSTOMFIELDS);
      queryClient.invalidateQueries(queryKeys.FETCH_CUSTOMFIELD);
    },
  });
};

const CreateRange = (customFields: ICustomField[]) => {
  return useMutation<ICustomField[]>({
    mutationKey: queryKeys.CREATE_RANGE_CUSTOMFIELD,
    mutationFn: () => customFieldRequests.createRange(customFields),
    onSuccess: () => {
      queryClient.setQueriesData<ICustomField[]>(
        queryKeys.CREATE_RANGE_CUSTOMFIELD,
        (old) => {
          return old ? [...old, ...customFields] : customFields;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_CUSTOMFIELD);
      queryClient.invalidateQueries(queryKeys.FETCH_CUSTOMFIELDS);
    },
  });
};

const Update = (customField: ICustomField) => {
  return useMutation<ICustomField>({
    mutationKey: queryKeys.UPDATE_CUSTOMFIELD,
    mutationFn: () => customFieldRequests.update(customField),
    onSuccess: () => {
      queryClient.setQueryData<ICustomField[]>(
        queryKeys.UPDATE_CUSTOMFIELD,
        (old) => {
          return old
            ? old.map((item) =>
                item.id === customField.id ? customField : item
              )
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_CUSTOMFIELD);
      queryClient.invalidateQueries(queryKeys.FETCH_CUSTOMFIELDS);
      queryClient.invalidateQueries([
        queryKeys.FETCH_CUSTOMFIELD,
        customField.id,
      ]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_CUSTOMFIELD,
    mutationFn: () => customFieldRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<ICustomField[]>(
        queryKeys.DELETE_CUSTOMFIELD,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_CUSTOMFIELD);
      queryClient.invalidateQueries(queryKeys.FETCH_CUSTOMFIELDS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_CUSTOMFIELD,
    mutationFn: () => customFieldRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<ICustomField[]>(
        queryKeys.DELETE_RANGE_CUSTOMFIELD,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_CUSTOMFIELD);
      queryClient.invalidateQueries(queryKeys.FETCH_CUSTOMFIELDS);
    },
  });
};

export const useCustomField = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
};
