import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { licenseRequests } from "@/server/requests/license";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";

export enum licenseKeys {
  USER_CHECK_IN_LICENSE = "USER_CHECK_IN_LICENSE",
  USER_CHECK_OUT_LICENSE = "USER_CHECK_OUT_LICENSE",
  ASSET_CHECK_IN_LICENSE = "ASSET_CHECK_IN_LICENSE",
  ASSET_CHECK_OUT_LICENSE = "ASSET_CHECK_OUT_LICENSE",
}

const hooks = baseHooks("LICENSE");

const GetAll = () => {
  return hooks.GetAll(licenseRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, licenseRequests.get);
};

const Create = () => {
  return hooks.Create(licenseRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(licenseRequests.createRange);
};

const Update = () => {
  return hooks.Update(licenseRequests.update);
};

const Remove = () => {
  return hooks.Remove(licenseRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(licenseRequests.removeRange);
};

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, licenseRequests.filter);
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(licenseRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(licenseRequests.lookup);
};

const UserCheckIn = () => {
  return useMutation({
    mutationKey: licenseKeys.USER_CHECK_IN_LICENSE,
    mutationFn: (dto: UserProductCheckInDto) =>
      licenseRequests.userCheckIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_USERPRODUCT");
    },
  });
};

const UserCheckOut = () => {
  return useMutation({
    mutationKey: licenseKeys.USER_CHECK_OUT_LICENSE,
    mutationFn: (dto: UserProductCheckOutDto) =>
      licenseRequests.userCheckOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_USERPRODUCT");
    },
  });
};

const AssetCheckIn = () => {
  return useMutation({
    mutationKey: licenseKeys.ASSET_CHECK_IN_LICENSE,
    mutationFn: (dto: AssetProductCheckInDto) =>
      licenseRequests.assetCheckIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_ASSETPRODUCT");
    },
  });
};

const AssetCheckOut = () => {
  return useMutation({
    mutationKey: licenseKeys.ASSET_CHECK_OUT_LICENSE,
    mutationFn: (dto: AssetProductCheckOutDto) =>
      licenseRequests.assetCheckOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries("FETCH_ALL_ASSETPRODUCT");
    },
  });
};

export const useLicense = {
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
  UserCheckIn,
  UserCheckOut,
  AssetCheckIn,
  AssetCheckOut,
};
