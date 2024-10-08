import {
  EmployeeProductCheckInDto,
  EmployeeProductCheckOutDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { consumableRequests } from "@requests";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import {
  handleCheckOutEmployeeProduct,
  setCheckedRecord,
} from "@/utils/checkInOutUtils";
import { closeModal } from "@/utils/modalUtils";
import { openNotificationSuccess } from "@/utils/notificationUtils";
import { consumableKeys } from "./keys";

const hooks = baseHooks("CONSUMABLE");

const GetAll = () => {
  return hooks.GetAll(consumableRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, consumableRequests.get);
};

const Create = () => {
  return hooks.Create(consumableRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(consumableRequests.createRange);
};

const Update = () => {
  return hooks.Update(consumableRequests.update);
};

const Remove = () => {
  return hooks.Remove(consumableRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(consumableRequests.removeRange);
};

const Lookup = () => {
  return hooks.Lookup(consumableRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: consumableKeys.CHECK_IN_CONSUMABLE,
    mutationFn: (dto: EmployeeProductCheckInDto) =>
      consumableRequests.checkIn(dto),
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
      queryClient.setQueryData("FETCH_ALL_CONSUMABLE", (data: any) => {
        return data.map((x: any) => {
          if (x.id === res.consumableId) {
            x.availableQuantity -= res.quantity;
          }
          return x;
        });
      });
      queryClient.setQueryData(
        ["FETCH_COnsumable", res.consumableId],
        (data: any) => {
          return {
            ...data,
            availableQuantity: data?.availableQuantity - res.quantity,
          };
        }
      );
      closeModal("product-checkin-modal");
      openNotificationSuccess("Consumable checked in successfully");
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: consumableKeys.CHECK_OUT_CONSUMABLE,
    mutationFn: (dto: EmployeeProductCheckOutDto) =>
      consumableRequests.checkOut(dto),
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
      openNotificationSuccess("Consumable Checked Out Successfully");
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
