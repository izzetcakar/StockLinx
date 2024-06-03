import { AssetCheckInDto, AssetCheckOutDto } from "@/interfaces/dtos";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAsset } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { assetRequests } from "@/redux/asset/requests";
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
}

export const useAssets = async (): Promise<IAsset[]> => {
  return (
    (await useQuery<IAsset[]>(queryKeys.FETCH_ASSETS, assetRequests.getAll)
      .data) || []
  );
};

export const useAsset = async (id: string): Promise<IAsset | null> => {
  return (
    (
      await useQuery<IAsset>({
        queryKey: [queryKeys.FETCH_ASSET, id],
        queryFn: () => assetRequests.get(id),
      })
    ).data || null
  );
};

export const useCreateAsset = async (asset: IAsset): Promise<IAsset | null> => {
  return (
    (
      await useMutation<IAsset>({
        mutationKey: queryKeys.CREATE_ASSET,
        mutationFn: () => assetRequests.create(asset),
        onSuccess: () => {
          queryClient.setQueryData<IAsset[]>(queryKeys.CREATE_ASSET, (old) => {
            return old ? [...old, asset] : [asset];
          });
          queryClient.invalidateQueries(queryKeys.FETCH_ASSETS);
          queryClient.invalidateQueries(queryKeys.FETCH_ASSET);
        },
      })
    ).data || null
  );
};

export const useUpdateAsset = (asset: IAsset) => {
  useMutation<IAsset>({
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

export const useDeleteAsset = (id: string) => {
  useMutation({
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

export const useCreateRangeAsset = (assets: IAsset[]) => {
  useMutation<IAsset[]>({
    mutationKey: queryKeys.CREATE_RANGE_ASSET,
    mutationFn: () => assetRequests.createRange(assets),
    onSuccess: () => {
      queryClient.setQueriesData<IAsset[]>(
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

export const useDeleteRangeAsset = (ids: string[]) => {
  useMutation({
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

export const useFilterAssets = (filters: QueryFilter[]) => {
  return useQuery({
    queryKey: queryKeys.FILTER_ASSETS,
    queryFn: () => assetRequests.filter(filters),
  });
};
