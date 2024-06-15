import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { consumableRequests } from "@/server/requests/consumable";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";

export enum consumableKeys {
  CHECK_IN_CONSUMABLE = "CHECK_IN_CONSUMABLE",
  CHECK_OUT_CONSUMABLE = "CHECK_OUT_CONSUMABLE",
}

const hooks = baseHooks("CONSUMABLE");

const GetAll = () => {
  return hooks.GetAll(consumableRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, consumableRequests.get);
};

const Create = () => {
  return hooks.Create(consumableRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(consumableRequests.createRange);
};

const Update = () => {
  return hooks.Update(consumableRequests.update);
};

const Remove = () => {
  return hooks.Remove(consumableRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(consumableRequests.removeRange);
};

const Filter = () => {
  return hooks.Filter(consumableRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(consumableRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: consumableKeys.CHECK_IN_CONSUMABLE,
    mutationFn: (dto: UserProductCheckInDto) => consumableRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_USERPRODUCT");
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: consumableKeys.CHECK_OUT_CONSUMABLE,
    mutationFn: (dto: UserProductCheckOutDto) =>
      consumableRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_USERPRODUCT");
    },
  });
};

export const useConsumable = {
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
