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
}

const GetAll = () => {
  return useQuery<ILicense[]>(queryKeys.FETCH_LICENSES, licenseRequests.getAll);
};

const Get =(id: string) => {
  return useQuery<ILicense>({
    queryKey: [queryKeys.FETCH_LICENSE, id],
    queryFn: () => licenseRequests.get(id),
  });
};

const Create =(license: ILicense) => {
  return useMutation<ILicense>({
    mutationKey: queryKeys.CREATE_LICENSE,
    mutationFn: () => licenseRequests.create(license),
    onSuccess: () => {
      queryClient.setQueryData<ILicense[]>(queryKeys.CREATE_LICENSE, (old) => {
        return old ? [...old, license] : [license];
      });
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSES);
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSE);
    },
  });
};

const CreateRange = (licenses: ILicense[]) => {
  return useMutation<ILicense[]>({
    mutationKey: queryKeys.CREATE_RANGE_LICENSE,
    mutationFn: () => licenseRequests.createRange(licenses),
    onSuccess: () => {
      queryClient.setQueriesData<ILicense[]>(
        queryKeys.CREATE_RANGE_LICENSE,
        (old) => {
          return old ? [...old, ...licenses] : licenses;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_LICENSE);
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSES);
    },
  });
};

const Update = (license: ILicense) => {
  return useMutation<ILicense>({
    mutationKey: queryKeys.UPDATE_LICENSE,
    mutationFn: () => licenseRequests.update(license),
    onSuccess: () => {
      queryClient.setQueryData<ILicense[]>(queryKeys.UPDATE_LICENSE, (old) => {
        return old
          ? old.map((item) => (item.id === license.id ? license : item))
          : [];
      });
      queryClient.invalidateQueries(queryKeys.UPDATE_LICENSE);
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSES);
      queryClient.invalidateQueries([queryKeys.FETCH_LICENSE, license.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_LICENSE,
    mutationFn: () => licenseRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<ILicense[]>(queryKeys.DELETE_LICENSE, (old) => {
        return old ? old.filter((item) => item.id !== id) : [];
      });
      queryClient.invalidateQueries(queryKeys.DELETE_LICENSE);
      queryClient.invalidateQueries(queryKeys.FETCH_LICENSES);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_LICENSE,
    mutationFn: () => licenseRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<ILicense[]>(
        queryKeys.DELETE_RANGE_LICENSE,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_LICENSE);
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
  UserCheckIn,
  UserCheckOut,
  AssetCheckIn,
  AssetCheckOut,
};
