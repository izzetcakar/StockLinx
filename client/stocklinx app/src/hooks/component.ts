import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { componentRequests } from "@/server/requests/component";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";

export enum componentKeys {
  CHECK_IN_COMPONENT = "CHECK_IN_COMPONENT",
  CHECK_OUT_COMPONENT = "CHECK_OUT_COMPONENT",
}

const hooks = baseHooks("COMPONENT");

const GetAll = () => {
  return hooks.GetAll(componentRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, componentRequests.get);
};

const Create = () => {
  return hooks.Create(componentRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(componentRequests.createRange);
};

const Update = () => {
  return hooks.Update(componentRequests.update);
};

const Remove = () => {
  return hooks.Remove(componentRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(componentRequests.removeRange);
};

const Filter = () => {
  return hooks.Filter(componentRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(componentRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: componentKeys.CHECK_IN_COMPONENT,
    mutationFn: (dto: AssetProductCheckInDto) => componentRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_ASSETPRODUCT");
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: componentKeys.CHECK_OUT_COMPONENT,
    mutationFn: (dto: AssetProductCheckOutDto) =>
      componentRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_ASSETPRODUCT");
    },
  });
};

export const useComponent = {
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
