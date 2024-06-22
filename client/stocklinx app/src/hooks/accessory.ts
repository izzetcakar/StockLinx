import {
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { accessoryRequests } from "@/server/requests/accessory";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import {
  handleCheckOutUserProduct,
  setCheckedRecord,
} from "@/utils/checkInOutUtils";
import { closeModal } from "@/modals/modals";
import { openNotificationSuccess } from "@/notification/Notification";

export enum accessoryKeys {
  CHECK_IN_ACCESSORY = "CHECK_IN_ACCESSORY",
  CHECK_OUT_ACCESSORY = "CHECK_OUT_ACCESSORY",
}

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

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, accessoryRequests.filter);
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
    mutationFn: (dto: UserProductCheckInDto) => accessoryRequests.checkIn(dto),
    onSuccess: (res) => {
      queryClient.setQueryData("FETCH_ALL_USERPRODUCT", (data: any) => {
        return setCheckedRecord(data, res);
      });
      queryClient.setQueryData("FILTER_USERPRODUCT", (data: any) => {
        return setCheckedRecord(data, res);
      });
      queryClient.setQueryData(["FETCH_USERPRODUCT", res.id], () => {
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
    mutationFn: (dto: UserProductCheckOutDto) =>
      accessoryRequests.checkOut(dto),
    onSuccess: (res, req) => {
      queryClient.setQueryData("FETCH_ALL_USERPRODUCT", (data: any) => {
        return handleCheckOutUserProduct(data, req, res);
      });
      queryClient.setQueryData("FILTER_USERPRODUCT", (data: any) => {
        return handleCheckOutUserProduct(data, req, res);
      });
      queryClient.setQueryData(["FETCH_USERPRODUCT", req.userProductId], () => {
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
