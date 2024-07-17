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

const Filter = () => {
  return hooks.Filter();
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(licenseRequests.filter);
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
      closeModal("product_checkIn_modal");
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
      closeModal("user_product_checkOut_modal");
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
      closeModal("product_checkIn_modal");
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
      closeModal("asset_product_checkOut_modal");
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
  Filter,
  ApplyFilters,
  Lookup,
  EmployeeCheckIn,
  EmployeeCheckOut,
  AssetCheckIn,
  AssetCheckOut,
};
