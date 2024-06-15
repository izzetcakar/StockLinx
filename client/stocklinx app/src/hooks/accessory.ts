import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { accessoryRequests } from "@/server/requests/accessory";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";

export enum accessoryKeys {
  CHECK_IN_ACCESSORY = "CHECK_IN_ACCESSORY",
  CHECK_OUT_ACCESSORY = "CHECK_OUT_ACCESSORY",
}

const hooks = baseHooks("ACCESSORY");

const GetAll = () => {
  return hooks.GetAll(accessoryRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, accessoryRequests.get);
};

const Create = () => {
  return hooks.Create(accessoryRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(accessoryRequests.createRange);
};

const Update = () => {
  return hooks.Update(accessoryRequests.update);
};

const Remove = () => {
  return hooks.Remove(accessoryRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(accessoryRequests.removeRange);
};

const Filter = () => {
  return hooks.Filter(accessoryRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(accessoryRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: accessoryKeys.CHECK_IN_ACCESSORY,
    mutationFn: (dto: UserProductCheckInDto) => accessoryRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_USERPRODUCT");
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: accessoryKeys.CHECK_OUT_ACCESSORY,
    mutationFn: (dto: UserProductCheckOutDto) =>
      accessoryRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_USERPRODUCT");
    },
  });
};

export const useAccessory = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  Lookup,
  CheckIn,
  CheckOut,
};
