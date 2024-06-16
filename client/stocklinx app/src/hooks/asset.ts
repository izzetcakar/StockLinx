import { AssetCheckInDto, AssetCheckOutDto } from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { assetRequests } from "@/server/requests/asset";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

export enum assetKeys {
  CHECK_IN_ASSET = "CHECK_IN_ASSET",
  CHECK_OUT_ASSET = "CHECK_OUT_ASSET",
}

const hooks = baseHooks("ASSET");

const GetAll = () => {
  return hooks.GetAll(assetRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, assetRequests.get);
};

const Create = () => {
  return hooks.Create(assetRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(assetRequests.createRange);
};

const Update = () => {
  return hooks.Update(assetRequests.update);
};

const Remove = () => {
  return hooks.Remove(assetRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(assetRequests.removeRange);
};

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, assetRequests.filter);
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(assetRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(assetRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: assetKeys.CHECK_IN_ASSET,
    mutationFn: (dto: AssetCheckInDto) => assetRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_USERPRODUCT");
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: assetKeys.CHECK_OUT_ASSET,
    mutationFn: (dto: AssetCheckOutDto) => assetRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_USERPRODUCT");
    },
  });
};

export const useAsset = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  ApplyFilters,
  Lookup,
  CheckIn,
  CheckOut,
};
