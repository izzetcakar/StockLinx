import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
  EmployeeProductCheckInDto,
  EmployeeProductCheckOutDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { licenseRequests } from "@requests";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import {
  handleCheckOutAssetProduct,
  handleCheckOutEmployeeProduct,
  setCheckedRecord,
} from "@/utils/checkInOutUtils";
import { closeModal } from "@/utils/modalUtils";
import { openNotificationSuccess } from "@/utils/notificationUtils";
import { licenseKeys } from "./keys";

const hooks = baseHooks("LICENSE");

const GetAll = () => {
  return hooks.GetAll(licenseRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, licenseRequests.get);
};

const Create = () => {
  return hooks.Create(licenseRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(licenseRequests.createRange);
};

const Update = () => {
  return hooks.Update(licenseRequests.update);
};

const Remove = () => {
  return hooks.Remove(licenseRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(licenseRequests.removeRange);
};

const Lookup = () => {
  return hooks.Lookup(licenseRequests.lookup);
};

const EmployeeCheckIn = () => {
  return useMutation({
    mutationKey: licenseKeys.USER_CHECK_IN_LICENSE,
    mutationFn: (dto: EmployeeProductCheckInDto) =>
      licenseRequests.employeeCheckIn(dto),
    onSuccess: (res) => {
      queryClient.setQueryData("FETCH_ALL_EMPLOYEEPRODUCT", (data: any) => {
        return setCheckedRecord(data, res);
      });
      queryClient.setQueryData("FILTER_EMPLOYEEPRODUCT", (data: any) => {
        return setCheckedRecord(data, res);
      });
      queryClient.setQueryData(["FETCH_EMPLOYEEPRODUCT", res.id], () => {
        return res;
      });
      queryClient.setQueryData("FETCH_ALL_LICENSE", (data: any) => {
        return data.map((x: any) => {
          if (x.id === res.licenseId) {
            x.availableQuantity -= res.quantity;
          }
          return x;
        });
      });
      queryClient.setQueryData(
        ["FETCH_LICENSE", res.licenseId],
        (data: any) => {
          return {
            ...data,
            availableQuantity: data?.availableQuantity - res.quantity,
          };
        }
      );
      closeModal("product-checkin-modal");
      openNotificationSuccess("License checked in successfully");
    },
  });
};

const EmployeeCheckOut = () => {
  return useMutation({
    mutationKey: licenseKeys.USER_CHECK_OUT_LICENSE,
    mutationFn: (dto: EmployeeProductCheckOutDto) =>
      licenseRequests.employeeCheckOut(dto),
    onSuccess: (res, req) => {
      queryClient.setQueryData("FETCH_ALL_EMPLOYEEPRODUCT", (data: any) => {
        return handleCheckOutEmployeeProduct(data, req, res);
      });
      queryClient.setQueryData("FILTER_EMPLOYEEPRODUCT", (data: any) => {
        return handleCheckOutEmployeeProduct(data, req, res);
      });
      queryClient.setQueryData(
        ["FETCH_EMPLOYEEPRODUCT", req.employeeProductId],
        () => {
          return res;
        }
      );
      closeModal("employee-product-checkout-modal");
      openNotificationSuccess("License Checked Out Successfully");
    },
  });
};

const AssetCheckIn = () => {
  return useMutation({
    mutationKey: licenseKeys.ASSET_CHECK_IN_LICENSE,
    mutationFn: (dto: AssetProductCheckInDto) =>
      licenseRequests.assetCheckIn(dto),
    onSuccess: (res) => {
      queryClient.setQueryData("FETCH_ALL_ASSETPRODUCT", (data: any) => {
        return setCheckedRecord(data, res);
      });
      queryClient.setQueryData("FILTER_ASSETPRODUCT", (data: any) => {
        return setCheckedRecord(data, res);
      });
      queryClient.setQueryData(["FETCH_ASSETPRODUCT", res.id], () => {
        return res;
      });
      queryClient.setQueryData("FETCH_ALL_LICENSE", (data: any) => {
        return data.map((x: any) => {
          if (x.id === res.licenseId) {
            x.availableQuantity -= res.quantity;
          }
          return x;
        });
      });
      queryClient.setQueryData(
        ["FETCH_LICENSE", res.licenseId],
        (data: any) => {
          return {
            ...data,
            availableQuantity: data?.availableQuantity - res.quantity,
          };
        }
      );
      closeModal("product-checkin-modal");
      openNotificationSuccess("License checked in successfully");
    },
  });
};

const AssetCheckOut = () => {
  return useMutation({
    mutationKey: licenseKeys.ASSET_CHECK_OUT_LICENSE,
    mutationFn: (dto: AssetProductCheckOutDto) =>
      licenseRequests.assetCheckOut(dto),
    onSuccess: (res, req) => {
      queryClient.setQueryData("FETCH_ALL_ASSETPRODUCT", (data: any) => {
        return handleCheckOutAssetProduct(data, req, res);
      });
      queryClient.setQueryData("FILTER_ASSETPRODUCT", (data: any) => {
        return handleCheckOutAssetProduct(data, req, res);
      });
      queryClient.setQueryData(
        ["FETCH_ASSETPRODUCT", req.assetProductId],
        () => {
          return res;
        }
      );
      closeModal("asset-product-checkout-modal");
      openNotificationSuccess("License Checked Out Successfully");
    },
  });
};

export default {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Lookup,
  EmployeeCheckIn,
  EmployeeCheckOut,
  AssetCheckIn,
  AssetCheckOut,
};
