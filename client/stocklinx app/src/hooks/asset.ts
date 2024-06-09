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
  LOOKUP_ASSETS = "LOOKUP_ASSETS",
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

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_ASSET,
    mutationFn: (asset: IAsset) => assetRequests.create(asset),
    onSuccess: (asset) => {
      queryClient.invalidateQueries(queryKeys.FETCH_ASSET);
      queryClient.setQueryData<IAsset[]>(queryKeys.FETCH_ASSETS, (old) => {
        return old ? [...old, asset] : [asset];
      });
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_ASSET,
    mutationFn: (assets: IAsset[]) => assetRequests.createRange(assets),
    onSuccess: (assets) => {
      queryClient.setQueryData<IAsset[]>(queryKeys.FETCH_ASSETS, (old) => {
        return old ? [...old, ...assets] : assets;
      });
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_ASSET,
    mutationFn: (asset: IAsset) => assetRequests.update(asset),
    onSuccess: (asset) => {
      queryClient.setQueryData<IAsset[]>(queryKeys.FETCH_ASSETS, (old) => {
        if (old) {
          const index = old.findIndex((x) => x.id === asset.id);
          old[index] = asset;
          return [...old];
        }
        return [asset];
      });
      queryClient.setQueryData<IAsset>(
        [queryKeys.FETCH_ASSET, asset.id],
        asset
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_ASSET,
    mutationFn: (id: string) => assetRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_ASSET,
    mutationFn: (ids: string[]) => assetRequests.removeRange(ids),
    onSuccess: () => {
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

const Lookup = () => {
  return useQuery(queryKeys.LOOKUP_ASSETS, assetRequests.lookup);
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
  return useMutation({
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
  Lookup,
  CheckIn,
  CheckOut,
};
