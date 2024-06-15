import { IFieldSetCustomField } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { fieldSetCustomFieldRequests } from "@/server/requests/fieldSetCustomField";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";

export enum fieldSetCustomFieldKeys {
  SYNC_FIELDSETCUSTOMFIELDS = "SYNC_FIELDSETCUSTOMFIELDS",
}

const hooks = baseHooks("FIELDSETCUSTOMFIELD");

const GetAll = () => {
  return hooks.GetAll(fieldSetCustomFieldRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, fieldSetCustomFieldRequests.get);
};

const Create = () => {
  return hooks.Create(fieldSetCustomFieldRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(fieldSetCustomFieldRequests.createRange);
};

const Update = () => {
  return hooks.Update(fieldSetCustomFieldRequests.update);
};

const Remove = () => {
  return hooks.Remove(fieldSetCustomFieldRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(fieldSetCustomFieldRequests.removeRange);
};

const Sync = (fieldSetCustomFields: IFieldSetCustomField[]) => {
  return useMutation({
    mutationKey: fieldSetCustomFieldKeys.SYNC_FIELDSETCUSTOMFIELDS,
    mutationFn: () =>
      fieldSetCustomFieldRequests.synchronize(fieldSetCustomFields),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_FIELDSETCUSTOMFIELD");
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
