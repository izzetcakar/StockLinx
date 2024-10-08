import {
  EmployeeProductCheckInDto,
  EmployeeProductCheckOutDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import {
  handleCheckOutEmployeeProduct,
  setCheckedRecord,
} from "@/utils/checkInOutUtils";
import { openNotificationSuccess } from "@/utils/notificationUtils";
import { accessoryKeys } from "./keys";
import { closeModal } from "@/utils/modalUtils";
import { accessoryRequests } from "@requests";

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

const Lookup = () => {
  return hooks.Lookup(accessoryRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: accessoryKeys.CHECK_IN_ACCESSORY,
    mutationFn: (dto: EmployeeProductCheckInDto) =>
      accessoryRequests.checkIn(dto),
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
      queryClient.setQueryData("FETCH_ALL_ACCESSORY", (data: any) => {
        return data.map((x: any) => {
          if (x.id === res.accessoryId) {
            x.availableQuantity -= res.quantity;
          }
          return x;
        });
      });
      queryClient.setQueryData(
        ["FETCH_ACCESSORY", res.accessoryId],
        (data: any) => {
          return {
            ...data,
            availableQuantity: data?.availableQuantity - res.quantity,
          };
        }
      );
      closeModal("product-checkin-modal");
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
      queryClient.setQueryData(
        ["FETCH_EMPLOYEEPRODUCT", req.employeeProductId],
        () => {
          return res;
        }
      );
      closeModal("employee-product-checkout-modal");
      openNotificationSuccess("Accessory Checked Out Successfully");
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
  CheckIn,
  CheckOut,
};
