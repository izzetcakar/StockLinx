import { customFieldRequests } from "@requests";
import { baseHooks } from "./baseHooks";
import { useMutation } from "react-query";
import { openNotificationSuccess } from "@/utils/notificationUtils";
import { queryClient } from "@/main";
import { closeModal } from "@/utils/modalUtils";

const hooks = baseHooks("CUSTOMFIELD");

const GetAll = () => {
  return hooks.GetAll(customFieldRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, customFieldRequests.get);
};

const Create = () => {
  return useMutation({
    mutationKey: "CREATE_CUSTOMFIELD",
    mutationFn: (dto: any) => customFieldRequests.create(dto),
    onSuccess: (res) => {
      openNotificationSuccess("Successfully created custom field");
      queryClient.setQueryData<any[]>("FETCH_ALL_CUSTOMFIELD", (old) => {
        return old ? [...old, res] : [res];
      });
      queryClient.setQueryData<any[]>("FILTER_CUSTOMFIELD", (old) => {
        return old ? [...old, res] : [res];
      });
      queryClient.invalidateQueries("LOOKUP_CUSTOMFIELD");
      queryClient.invalidateQueries("FETCH_ALL_FIELDSETCUSTOMFIELD");
      queryClient.invalidateQueries("FETCH_ALL_MODEL");
      queryClient.invalidateQueries("FETCH_ALL_MODELFIELDDATA");
      closeModal("customfield-modal");
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: "CREATE_RANGE_CUSTOMFIELD",
    mutationFn: (dto: any) => customFieldRequests.createRange(dto),
    onSuccess: (res) => {
      openNotificationSuccess("Successfully created custom fields");
      queryClient.setQueryData<any[]>("FETCH_ALL_CUSTOMFIELD", (old) => {
        return old ? [...old, ...res] : res;
      });
      queryClient.setQueryData<any[]>("FILTER_CUSTOMFIELD", (old) => {
        return old ? [...old, ...res] : res;
      });
      queryClient.invalidateQueries("LOOKUP_CUSTOMFIELD");
      queryClient.invalidateQueries("FETCH_ALL_FIELDSETCUSTOMFIELD");
      queryClient.invalidateQueries("FETCH_ALL_MODEL");
      queryClient.invalidateQueries("FETCH_ALL_MODELFIELDDATA");
      closeModal("customfield-modal");
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: "UPDATE_CUSTOMFIELD",
    mutationFn: (dto: any) => customFieldRequests.update(dto),
    onSuccess: (res) => {
      openNotificationSuccess("Successfully updated custom field");
      queryClient.setQueryData<any[]>("FETCH_ALL_CUSTOMFIELD", (old) => {
        return old?.map((x) => (x.id === res.id ? res : x)) || [res];
      });
      queryClient.setQueryData<any[]>("FILTER_CUSTOMFIELD", (old) => {
        return old?.map((x) => (x.id === res.id ? res : x)) || [res];
      });
      queryClient.invalidateQueries("LOOKUP_CUSTOMFIELD");
      queryClient.invalidateQueries("FETCH_ALL_FIELDSETCUSTOMFIELD");
      queryClient.invalidateQueries("FETCH_ALL_MODEL");
      queryClient.invalidateQueries("FETCH_ALL_MODELFIELDDATA");
      closeModal("customfield-modal");
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: "REMOVE_CUSTOMFIELD",
    mutationFn: (id: string) => customFieldRequests.remove(id),
    onSuccess: (_, id) => {
      openNotificationSuccess("Successfully removed custom field");
      queryClient.setQueryData<any[]>("FETCH_ALL_CUSTOMFIELD", (old) => {
        return old?.filter((x) => x.id !== id) || [];
      });
      queryClient.setQueryData<any[]>("FILTER_CUSTOMFIELD", (old) => {
        return old?.filter((x) => x.id !== id) || [];
      });
      queryClient.invalidateQueries("LOOKUP_CUSTOMFIELD");
      queryClient.invalidateQueries("FETCH_ALL_FIELDSETCUSTOMFIELD");
      queryClient.invalidateQueries("FETCH_ALL_MODEL");
      queryClient.invalidateQueries("FETCH_ALL_MODELFIELDDATA");
      closeModal("customfield-modal");
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: "REMOVE_RANGE_CUSTOMFIELD",
    mutationFn: (ids: string[]) => customFieldRequests.removeRange(ids),
    onSuccess: (_, ids) => {
      openNotificationSuccess("Successfully removed custom fields");
      queryClient.setQueryData<any[]>("FETCH_ALL_CUSTOMFIELD", (old) => {
        return old?.filter((x) => !ids.includes(x.id)) || [];
      });
      queryClient.setQueryData<any[]>("FILTER_CUSTOMFIELD", (old) => {
        return old?.filter((x) => !ids.includes(x.id)) || [];
      });
      queryClient.invalidateQueries("LOOKUP_CUSTOMFIELD");
      queryClient.invalidateQueries("FETCH_ALL_FIELDSETCUSTOMFIELD");
      queryClient.invalidateQueries("FETCH_ALL_MODEL");
      queryClient.invalidateQueries("FETCH_ALL_MODELFIELDDATA");
      closeModal("customfield-modal");
    },
  });
};

const Lookup = () => {
  return hooks.Lookup(customFieldRequests.lookup);
};

export default {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Lookup,
};
