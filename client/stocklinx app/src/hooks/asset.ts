import { AssetCheckInDto, AssetCheckOutDto } from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAsset } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { assetRequests } from "@/server/requests/asset";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_ASSETS = "FETCH_ASSETS",
  FETCH_ASSET = "FETCH_ASSET",
  CREATE_ASSET = "CREATE_ASSET",
  UPDATE_ASSET = "UPDATE_ASSET",
  DELETE_ASSET = "DELETE_ASSET",
  CREATE_RANGE_ASSET = "CREATE_RANGE_ASSET",
  DELETE_RANGE_ASSET = "DELETE_RANGE_ASSET",
  CHECK_IN_ASSET = "CHECK_IN_ASSET",
  CHECK_OUT_ASSET = "CHECK_OUT_ASSET",
  FILTER_ASSETS = "FILTER_ASSETS",
  CHEDKED_USER = "CHECKED_USER",
}

const GetAll = () => {
  return useQuery<IAsset[]>(queryKeys.FETCH_ASSETS, assetRequests.getAll);
};

const Get = (id: string) => {
  return useQuery<IAsset>({
    queryKey: [queryKeys.FETCH_ASSET, id],
    queryFn: () => assetRequests.get(id),
  });
};

const Create = (asset: IAsset) => {
  return useMutation<IAsset>({
    mutationKey: queryKeys.CREATE_ASSET,
    mutationFn: () => assetRequests.create(asset),
    onSuccess: () => {
      queryClient.setQueryData<IAsset[]>(queryKeys.CREATE_ASSET, (old) => {
        return old ? [...old, asset] : [asset];
      });
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETS);
      queryClient.invalidateQueries(queryKeys.FETCH_ASSET);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_ASSET,
    mutationFn: (assets: IAsset[]) => assetRequests.createRange(assets),
    onSuccess: (assets: IAsset[]) => {
      queryClient.setQueryData<IAsset[]>(
        queryKeys.CREATE_RANGE_ASSET,
        (old) => {
          return old ? [...old, ...assets] : assets;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_ASSET);
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETS);
    },
  });
};

const Update = (asset: IAsset) => {
  return useMutation<IAsset>({
    mutationKey: queryKeys.UPDATE_ASSET,
    mutationFn: () => assetRequests.update(asset),
    onSuccess: () => {
      queryClient.setQueryData<IAsset[]>(queryKeys.UPDATE_ASSET, (old) => {
        return old
          ? old.map((item) => (item.id === asset.id ? asset : item))
          : [];
      });
      queryClient.invalidateQueries(queryKeys.UPDATE_ASSET);
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETS);
      queryClient.invalidateQueries([queryKeys.FETCH_ASSET, asset.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_ASSET,
    mutationFn: () => assetRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IAsset[]>(queryKeys.DELETE_ASSET, (old) => {
        return old ? old.filter((item) => item.id !== id) : [];
      });
      queryClient.invalidateQueries(queryKeys.DELETE_ASSET);
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_ASSET,
    mutationFn: () => assetRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IAsset[]>(
        queryKeys.DELETE_RANGE_ASSET,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_ASSET);
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_ASSETS,
    mutationFn: (filters: QueryFilter[]) => assetRequests.filter(filters),
    onSuccess(data: IAsset[]) {
      queryClient.setQueryData<IAsset[]>(queryKeys.FILTER_ASSETS, data);
    },
  });
};

const CheckIn = () => {
  return useMutation({
    mutationKey: queryKeys.CHECK_IN_ASSET,
    mutationFn: (dto: AssetCheckInDto) => assetRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.CHECK_IN_ASSET);
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETS);
    },
  });
};

const CheckOut = () => {
  useMutation({
    mutationKey: queryKeys.CHECK_OUT_ASSET,
    mutationFn: (dto: AssetCheckOutDto) => assetRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.CHECK_OUT_ASSET);
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETS);
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
  CheckIn,
  CheckOut,
};
