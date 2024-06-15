import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { ILicense } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { licenseRequests } from "@/server/requests/license";
import { useMutation, useQuery } from "react-query";
import { userProductKeys } from "./userProduct";
import { assetProductKeys } from "./assetProduct";

export enum licenseKeys {
  FETCH_LICENSES = "FETCH_LICENSES",
  FETCH_LICENSE = "FETCH_LICENSE",
  CREATE_LICENSE = "CREATE_LICENSE",
  UPDATE_LICENSE = "UPDATE_LICENSE",
  DELETE_LICENSE = "DELETE_LICENSE",
  CREATE_RANGE_LICENSE = "CREATE_RANGE_LICENSE",
  DELETE_RANGE_LICENSE = "DELETE_RANGE_LICENSE",
  USER_CHECK_IN_LICENSE = "USER_CHECK_IN_LICENSE",
  USER_CHECK_OUT_LICENSE = "USER_CHECK_OUT_LICENSE",
  ASSET_CHECK_IN_LICENSE = "ASSET_CHECK_IN_LICENSE",
  ASSET_CHECK_OUT_LICENSE = "ASSET_CHECK_OUT_LICENSE",
  FILTER_LICENSES = "FILTER_LICENSES",
  LOOKUP_LICENSES = "LOOKUP_LICENSES",
}

const GetAll = () => {
  return useQuery<ILicense[]>(
    licenseKeys.FETCH_LICENSES,
    licenseRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<ILicense>({
    queryKey: [licenseKeys.FETCH_LICENSE, id],
    queryFn: () => licenseRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: licenseKeys.CREATE_LICENSE,
    mutationFn: (license: ILicense) => licenseRequests.create(license),
    onSuccess: (license) => {
      queryClient.setQueryData<ILicense[]>(
        licenseKeys.FETCH_LICENSES,
        (old) => {
          return old ? [...old, license] : [license];
        }
      );
      queryClient.invalidateQueries(licenseKeys.LOOKUP_LICENSES);
      queryClient.invalidateQueries(licenseKeys.FILTER_LICENSES);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: licenseKeys.CREATE_RANGE_LICENSE,
    mutationFn: (licenses: ILicense[]) => licenseRequests.createRange(licenses),
    onSuccess: (licenses) => {
      queryClient.setQueryData<ILicense[]>(
        licenseKeys.FETCH_LICENSES,
        (old) => {
          return old ? [...old, ...licenses] : licenses;
        }
      );
      queryClient.invalidateQueries(licenseKeys.LOOKUP_LICENSES);
      queryClient.invalidateQueries(licenseKeys.FILTER_LICENSES);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: licenseKeys.UPDATE_LICENSE,
    mutationFn: (license: ILicense) => licenseRequests.update(license),
    onSuccess: (license) => {
      queryClient.setQueryData<ILicense[]>(
        licenseKeys.FETCH_LICENSES,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === license.id);
            old[index] = license;
            return [...old];
          }
          return [license];
        }
      );
      queryClient.setQueryData<ILicense>(
        [licenseKeys.FETCH_LICENSE, license.id],
        license
      );
      queryClient.invalidateQueries(licenseKeys.LOOKUP_LICENSES);
      queryClient.invalidateQueries(licenseKeys.FILTER_LICENSES);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: licenseKeys.DELETE_LICENSE,
    mutationFn: (id: string) => licenseRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(licenseKeys.FETCH_LICENSES);
      queryClient.invalidateQueries(licenseKeys.LOOKUP_LICENSES);
      queryClient.invalidateQueries(licenseKeys.FILTER_LICENSES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: licenseKeys.DELETE_RANGE_LICENSE,
    mutationFn: (ids: string[]) => licenseRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(licenseKeys.FETCH_LICENSES);
      queryClient.invalidateQueries(licenseKeys.LOOKUP_LICENSES);
      queryClient.invalidateQueries(licenseKeys.FILTER_LICENSES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: licenseKeys.FILTER_LICENSES,
    mutationFn: (filters: QueryFilter[]) => licenseRequests.filter(filters),
    onSuccess(data: ILicense[]) {
      queryClient.setQueryData<ILicense[]>(licenseKeys.FILTER_LICENSES, data);
    },
  });
};

const Lookup = () => {
  return useQuery(licenseKeys.LOOKUP_LICENSES, licenseRequests.lookup);
};

const UserCheckIn = () => {
  return useMutation({
    mutationKey: licenseKeys.USER_CHECK_IN_LICENSE,
    mutationFn: (dto: UserProductCheckInDto) =>
      licenseRequests.userCheckIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(userProductKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
    },
  });
};

const UserCheckOut = () => {
  return useMutation({
    mutationKey: licenseKeys.USER_CHECK_OUT_LICENSE,
    mutationFn: (dto: UserProductCheckOutDto) =>
      licenseRequests.userCheckOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(userProductKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
    },
  });
};

const AssetCheckIn = () => {
  return useMutation({
    mutationKey: licenseKeys.ASSET_CHECK_IN_LICENSE,
    mutationFn: (dto: AssetProductCheckInDto) =>
      licenseRequests.assetCheckIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(assetProductKeys.FETCH_ASSETPRODUCTS);
      queryClient.invalidateQueries(assetProductKeys.FILTER_ASSETPRODUCTS);
    },
  });
};

const AssetCheckOut = () => {
  return useMutation({
    mutationKey: licenseKeys.ASSET_CHECK_OUT_LICENSE,
    mutationFn: (dto: AssetProductCheckOutDto) =>
      licenseRequests.assetCheckOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(assetProductKeys.FETCH_ASSETPRODUCTS);
      queryClient.invalidateQueries(assetProductKeys.FILTER_ASSETPRODUCTS);
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
  Lookup,
  UserCheckIn,
  UserCheckOut,
  AssetCheckIn,
  AssetCheckOut,
};
