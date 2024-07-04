import {
  AssetCheckInDto,
  AssetCheckOutDto,
  UserProductDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { assetRequests } from "@/server/requests/asset";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import { IAsset, IUserProduct } from "@/interfaces/serverInterfaces";
import { setAssetCheckStatus } from "@/utils/checkInOutUtils";
import { closeModal } from "@/utils/modalUtils";
import { openNotificationSuccess } from "@/utils/notificationUtils";
import { assetKeys } from "./keys";

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

const Filter = () => {
  return hooks.Filter();
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
    onSuccess: (res, req) => {
      queryClient.invalidateQueries("FETCH_ALL_USERPRODUCT");
      queryClient.setQueryData<IUserProduct[]>(
        "FETCH_ALL_USERPRODUCT",
        (data) => {
          return data ? [...data, res] : [res];
        }
      );
      queryClient.setQueryData<IUserProduct[]>("FILTER_USERPRODUCT", (data) => {
        return data ? [...data, res] : [res];
      });
      queryClient.setQueryData<IAsset[]>("FETCH_ALL_ASSET", (data) => {
        return data ? setAssetCheckStatus(data, req) : [];
      });
      queryClient.setQueryData<IAsset[]>("FILTER_ASSET", (data) => {
        return data ? setAssetCheckStatus(data, req) : [];
      });
      queryClient.setQueryData(["GET_ASSET", req.assetId], (data) => {
        return data ? { ...data, productStatusId: req.productStatusId } : data;
      });
      closeModal("asset_checkIn_modal");
      openNotificationSuccess("Asset Checked In Successfully");
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: assetKeys.CHECK_OUT_ASSET,
    mutationFn: (dto: AssetCheckOutDto) => assetRequests.checkOut(dto),
    onSuccess: (res, req) => {
      queryClient.setQueryData<IUserProduct[]>(
        "FETCH_ALL_USERPRODUCT",
        (data) => {
          return handleCheckOutData(data, req, res);
        }
      );
      queryClient.setQueryData<IUserProduct[]>("FILTER_USERPRODUCT", (data) => {
        return handleCheckOutData(data, req, res);
      });
      queryClient.setQueryData<IAsset[]>("FETCH_ALL_ASSET", (data) => {
        return data ? setAssetCheckStatus(data, req) : [];
      });
      queryClient.setQueryData<IAsset[]>("FILTER_ASSET", (data) => {
        return data ? setAssetCheckStatus(data, req) : [];
      });
      queryClient.invalidateQueries("GET_ASSET");
      closeModal("asset_checkOut_modal");
      openNotificationSuccess("Asset Checked Out Successfully");
    },
  });
};

const handleCheckOutData = (
  data: any,
  req: AssetCheckOutDto,
  res: UserProductDto | null
) => {
  if (!data) {
    if (res) {
      return [res];
    }
  }
  if (res) {
    const filtered = data?.filter(
      (userProduct: UserProductDto) => userProduct.id !== req.userProductId
    );
    return [...filtered, res];
  }
  return data.filter(
    (userProduct: UserProductDto) => userProduct.id !== req.userProductId
  );
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
