import { AssetCheckInDto, AssetCheckOutDto } from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAsset } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { assetRequests } from "@/server/requests/asset";
import { useMutation, useQuery } from "react-query";
import { userProductKeys } from "./userProduct";

export enum assetKeys {
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
  return useQuery<IAsset[]>(assetKeys.FETCH_ASSETS, assetRequests.getAll);
};

const Get = (id: string) => {
  return useQuery<IAsset>({
    queryKey: [assetKeys.FETCH_ASSET, id],
    queryFn: () => assetRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: assetKeys.CREATE_ASSET,
    mutationFn: (asset: IAsset) => assetRequests.create(asset),
    onSuccess: (asset) => {
      queryClient.setQueryData<IAsset[]>(assetKeys.FETCH_ASSETS, (old) => {
        return old ? [...old, asset] : [asset];
      });
      queryClient.invalidateQueries(assetKeys.LOOKUP_ASSETS);
      queryClient.invalidateQueries(assetKeys.FILTER_ASSETS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: assetKeys.CREATE_RANGE_ASSET,
    mutationFn: (assets: IAsset[]) => assetRequests.createRange(assets),
    onSuccess: (assets) => {
      queryClient.setQueryData<IAsset[]>(assetKeys.FETCH_ASSETS, (old) => {
        return old ? [...old, ...assets] : assets;
      });
      queryClient.invalidateQueries(assetKeys.LOOKUP_ASSETS);
      queryClient.invalidateQueries(assetKeys.FILTER_ASSETS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: assetKeys.UPDATE_ASSET,
    mutationFn: (asset: IAsset) => assetRequests.update(asset),
    onSuccess: (asset) => {
      queryClient.setQueryData<IAsset[]>(assetKeys.FETCH_ASSETS, (old) => {
        if (old) {
          const index = old.findIndex((x) => x.id === asset.id);
          old[index] = asset;
          return [...old];
        }
        return [asset];
      });
      queryClient.setQueryData<IAsset>(
        [assetKeys.FETCH_ASSET, asset.id],
        asset
      );
      queryClient.invalidateQueries(assetKeys.LOOKUP_ASSETS);
      queryClient.invalidateQueries(assetKeys.FILTER_ASSETS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: assetKeys.DELETE_ASSET,
    mutationFn: (id: string) => assetRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(assetKeys.FETCH_ASSETS);
      queryClient.invalidateQueries(assetKeys.LOOKUP_ASSETS);
      queryClient.invalidateQueries(assetKeys.FILTER_ASSETS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: assetKeys.DELETE_RANGE_ASSET,
    mutationFn: (ids: string[]) => assetRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(assetKeys.FETCH_ASSETS);
      queryClient.invalidateQueries(assetKeys.LOOKUP_ASSETS);
      queryClient.invalidateQueries(assetKeys.FILTER_ASSETS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: assetKeys.FILTER_ASSETS,
    mutationFn: (filters: QueryFilter[]) => assetRequests.filter(filters),
    onSuccess(data: IAsset[]) {
      queryClient.setQueryData<IAsset[]>(assetKeys.FILTER_ASSETS, data);
    },
  });
};

const Lookup = () => {
  return useQuery(assetKeys.LOOKUP_ASSETS, assetRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: assetKeys.CHECK_IN_ASSET,
    mutationFn: (dto: AssetCheckInDto) => assetRequests.checkIn(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(userProductKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: assetKeys.CHECK_OUT_ASSET,
    mutationFn: (dto: AssetCheckOutDto) => assetRequests.checkOut(dto),
    onSuccess: () => {
      queryClient.invalidateQueries(userProductKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
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
