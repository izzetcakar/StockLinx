import { AssetCheckInDto, AssetCheckOutDto } from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { assetRequests } from "@/server/requests/asset";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAsset, IUserProduct } from "@/interfaces/serverInterfaces";

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
    onSuccess: (dto, checkInDto) => {
      queryClient.invalidateQueries("FETCH_ALL_USERPRODUCT");
      queryClient.setQueryData<IUserProduct[]>(
        "FETCH_ALL_USERPRODUCT",
        (data) => {
          return data ? [...data, dto] : [dto];
        }
      );
      queryClient.setQueryData<IUserProduct[]>("FILTER_USERPRODUCT", (data) => {
        return data ? [...data, dto] : [dto];
      });
      queryClient.setQueryData<IAsset[]>("FETCH_ALL_ASSET", (data) => {
        return data
          ? data.map((asset) =>
              asset.id === checkInDto.assetId
                ? { ...asset, productStatusId: checkInDto.productStatusId }
                : asset
            )
          : [];
      });
      queryClient.setQueryData<IAsset[]>("FILTER_ASSET", (data) => {
        return data
          ? data.map((asset) =>
              asset.id === checkInDto.assetId
                ? { ...asset, productStatusId: checkInDto.productStatusId }
                : asset
            )
          : [];
      });
      queryClient.setQueryData(["GET_ASSET", checkInDto.assetId], (data) => {
        return data
          ? { ...data, productStatusId: checkInDto.productStatusId }
          : data;
      });
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: assetKeys.CHECK_OUT_ASSET,
    mutationFn: (dto: AssetCheckOutDto) => assetRequests.checkOut(dto),
    onSuccess: (_, dto) => {
      queryClient.setQueryData<IUserProduct[]>(
        "FETCH_ALL_USERPRODUCT",
        (data) => {
          return data
            ? data?.filter((userProduct) => userProduct.assetId !== dto.assetId)
            : [];
        }
      );
      queryClient.setQueryData<IUserProduct[]>("FILTER_USERPRODUCT", (data) => {
        return data
          ? data?.filter((userProduct) => userProduct.assetId !== dto.assetId)
          : [];
      });
      queryClient.setQueryData<IAsset[]>("FETCH_ALL_ASSET", (data) => {
        return data
          ? data.map((asset) =>
              asset.id === dto.assetId
                ? { ...asset, productStatusId: dto.productStatusId }
                : asset
            )
          : [];
      });
      queryClient.setQueryData<IAsset[]>("FILTER_ASSET", (data) => {
        return data
          ? data.map((asset) =>
              asset.id === dto.assetId
                ? { ...asset, productStatusId: dto.productStatusId }
                : asset
            )
          : [];
      });
      queryClient.setQueryData(["GET_ASSET", dto.assetId], (data) => {
        return data ? { ...data, productStatusId: dto.productStatusId } : data;
      });
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
