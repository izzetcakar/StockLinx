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

enum queryKeys {
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
  return useQuery<ILicense[]>(queryKeys.FETCH_LICENSES, licenseRequests.getAll);
};

const Get = (id: string) => {
  return useQuery<ILicense>({
    queryKey: [queryKeys.FETCH_LICENSE, id],
    queryFn: () => licenseRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_LICENSE,
    mutationFn: (license: ILicense) => licenseRequests.create(license),
    onSuccess: (license) => {
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSE);
      queryClient.setQueryData<ILicense[]>(queryKeys.FETCH_LICENSES, (old) => {
        return old ? [...old, license] : [license];
      });
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_LICENSE,
    mutationFn: (licenses: ILicense[]) => licenseRequests.createRange(licenses),
    onSuccess: (licenses) => {
      queryClient.setQueryData<ILicense[]>(queryKeys.FETCH_LICENSES, (old) => {
        return old ? [...old, ...licenses] : licenses;
      });
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_LICENSE,
    mutationFn: (license: ILicense) => licenseRequests.update(license),
    onSuccess: (license) => {
      queryClient.setQueryData<ILicense[]>(queryKeys.FETCH_LICENSES, (old) => {
        if (old) {
          const index = old.findIndex((x) => x.id === license.id);
          old[index] = license;
          return [...old];
        }
        return [license];
      });
      queryClient.setQueryData<ILicense>(
        [queryKeys.FETCH_LICENSE, license.id],
        license
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_LICENSE,
    mutationFn: (id: string) => licenseRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_LICENSE,
    mutationFn: (ids: string[]) => licenseRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_LICENSES,
    mutationFn: (filters: QueryFilter[]) => licenseRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<ILicense[]>(queryKeys.FILTER_LICENSES, data);
    },
  });
};

const UserCheckIn = () => {
  return useMutation({
    mutationKey: queryKeys.USER_CHECK_IN_LICENSE,
    mutationFn: (dto: UserProductCheckInDto) =>
      licenseRequests.userCheckIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.USER_CHECK_IN_LICENSE);
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSES);
    },
  });
};

const Lookup = () => {
  return useQuery(queryKeys.LOOKUP_LICENSES, licenseRequests.lookup);
};

const AssetCheckIn = () => {
  return useMutation({
    mutationKey: queryKeys.ASSET_CHECK_IN_LICENSE,
    mutationFn: (dto: AssetProductCheckInDto) =>
      licenseRequests.assetCheckIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.ASSET_CHECK_IN_LICENSE);
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSES);
    },
  });
};

const UserCheckOut = () => {
  useMutation({
    mutationKey: queryKeys.USER_CHECK_OUT_LICENSE,
    mutationFn: (dto: UserProductCheckOutDto) =>
      licenseRequests.userCheckOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.USER_CHECK_OUT_LICENSE);
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSES);
    },
  });
};

const AssetCheckOut = () => {
  useMutation({
    mutationKey: queryKeys.ASSET_CHECK_OUT_LICENSE,
    mutationFn: (dto: AssetProductCheckOutDto) =>
      licenseRequests.assetCheckOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.ASSET_CHECK_OUT_LICENSE);
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSES);
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
