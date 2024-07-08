import {
  EmployeeProductCheckInDto,
  EmployeeProductCheckOutDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { accessoryRequests } from "@/server/requests/accessory";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import {
  handleCheckOutEmployeeProduct,
  setCheckedRecord,
} from "@/utils/checkInOutUtils";
import { openNotificationSuccess } from "@/utils/notificationUtils";
import { accessoryKeys } from "./keys";
import { closeModal } from "@/utils/modalUtils";

const hooks = baseHooks("ACCESSORY");

const GetAll = () => {
  return hooks.GetAll(accessoryRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, accessoryRequests.get);
};

const Create = () => {
  return hooks.Create(accessoryRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(accessoryRequests.createRange);
};

const Update = () => {
  return hooks.Update(accessoryRequests.update);
};

const Remove = () => {
  return hooks.Remove(accessoryRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(accessoryRequests.removeRange);
};

const Filter = () => {
  return hooks.Filter();
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(accessoryRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(accessoryRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: accessoryKeys.CHECK_IN_ACCESSORY,
    mutationFn: (dto: EmployeeProductCheckInDto) => accessoryRequests.checkIn(dto),
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
      openNotificationSuccess("Accessory Check In Successfully");
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: accessoryKeys.CHECK_OUT_ACCESSORY,
    mutationFn: (dto: EmployeeProductCheckOutDto) =>
      accessoryRequests.checkOut(dto),
    onSuccess: (res, req) => {
      queryClient.setQueryData("FETCH_ALL_EMPLOYEEPRODUCT", (data: any) => {
        return handleCheckOutEmployeeProduct(data, req, res);
      });
      queryClient.setQueryData("FILTER_EMPLOYEEPRODUCT", (data: any) => {
        return handleCheckOutEmployeeProduct(data, req, res);
      });
      queryClient.setQueryData(["FETCH_EMPLOYEEPRODUCT", req.employeeProductId], () => {
        return res;
      });
      closeModal("user_product_checkOut_modal");
      openNotificationSuccess("Accessory Checked Out Successfully");
    },
  });
};

export const useAccessory = {
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