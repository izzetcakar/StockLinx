import {
  AssetCheckInDto,
  AssetCheckOutDto,
  EmployeeProductDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import { IAsset, IEmployeeProduct } from "@/interfaces/serverInterfaces";
import { setAssetCheckStatus } from "@/utils/checkInOutUtils";
import { closeModal } from "@/utils/modalUtils";
import { openNotificationSuccess } from "@/utils/notificationUtils";
import { assetKeys } from "./keys";
import { assetRequests } from "@requests";

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
      queryClient.invalidateQueries("FETCH_ALL_EMPLOYEEPRODUCT");
      queryClient.setQueryData<IEmployeeProduct[]>(
        "FETCH_ALL_EMPLOYEEPRODUCT",
        (data) => {
          return data ? [...data, res] : [res];
        }
      );
      queryClient.setQueryData<IEmployeeProduct[]>(
        "FILTER_EMPLOYEEPRODUCT",
        (data) => {
          return data ? [...data, res] : [res];
        }
      );
      queryClient.setQueryData<IAsset[]>("FETCH_ALL_ASSET", (data) => {
        return data ? setAssetCheckStatus(data, req) : [];
      });
      queryClient.setQueryData<IAsset[]>("FILTER_ASSET", (data) => {
        return data ? setAssetCheckStatus(data, req) : [];
      });
      queryClient.setQueryData(["FETCH_ASSET", req.assetId], (data) => {
        return data ? { ...data, productStatusId: req.productStatusId } : data;
      });
      closeModal("asset-checkin-modal");
      openNotificationSuccess("Asset Checked In Successfully");
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: assetKeys.CHECK_OUT_ASSET,
    mutationFn: (dto: AssetCheckOutDto) => assetRequests.checkOut(dto),
    onSuccess: (res, req) => {
      queryClient.setQueryData<IEmployeeProduct[]>(
        "FETCH_ALL_EMPLOYEEPRODUCT",
        (data) => {
          return handleCheckOutData(data, req, res);
        }
      );
      queryClient.setQueryData<IEmployeeProduct[]>(
        "FILTER_EMPLOYEEPRODUCT",
        (data) => {
          return handleCheckOutData(data, req, res);
        }
      );
      queryClient.setQueryData<IAsset[]>("FETCH_ALL_ASSET", (data) => {
        return data ? setAssetCheckStatus(data, req) : [];
      });
      queryClient.setQueryData<IAsset[]>("FILTER_ASSET", (data) => {
        return data ? setAssetCheckStatus(data, req) : [];
      });
      queryClient.invalidateQueries("FETCH_ASSET");
      closeModal("asset-checkout-modal");
      openNotificationSuccess("Asset Checked Out Successfully");
    },
  });
};

const handleCheckOutData = (
  data: any,
  req: AssetCheckOutDto,
  res: EmployeeProductDto | null
) => {
  if (!data) {
    if (res) {
      return [res];
    }
  }
  if (res) {
    const filtered = data?.filter(
      (employeeProduct: EmployeeProductDto) =>
        employeeProduct.id !== req.employeeProductId
    );
    return [...filtered, res];
  }
  return data.filter(
    (employeeProduct: EmployeeProductDto) =>
      employeeProduct.id !== req.employeeProductId
  );
};

export default {
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
