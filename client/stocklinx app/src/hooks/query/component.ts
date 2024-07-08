import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
} from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { componentRequests } from "@/server/requests/component";
import { useMutation } from "react-query";
import { baseHooks } from "./baseHooks";
import {
  handleCheckOutAssetProduct,
  setCheckedRecord,
} from "@/utils/checkInOutUtils";
import { closeModal } from "@/utils/modalUtils";
import { openNotificationSuccess } from "@/utils/notificationUtils";
import { componentKeys } from "./keys";

const hooks = baseHooks("COMPONENT");

const GetAll = () => {
  return hooks.GetAll(componentRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, componentRequests.get);
};

const Create = () => {
  return hooks.Create(componentRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(componentRequests.createRange);
};

const Update = () => {
  return hooks.Update(componentRequests.update);
};

const Remove = () => {
  return hooks.Remove(componentRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(componentRequests.removeRange);
};

const Filter = () => {
  return hooks.Filter();
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(componentRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(componentRequests.lookup);
};

const CheckIn = () => {
  return useMutation({
    mutationKey: componentKeys.CHECK_IN_COMPONENT,
    mutationFn: (dto: AssetProductCheckInDto) => componentRequests.checkIn(dto),
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
      openNotificationSuccess("Component Checked In Successfully");
    },
  });
};

const CheckOut = () => {
  return useMutation({
    mutationKey: componentKeys.CHECK_OUT_COMPONENT,
    mutationFn: (dto: AssetProductCheckOutDto) =>
      componentRequests.checkOut(dto),
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
      openNotificationSuccess("Component Checked Out Successfully");
    },
  });
};

export const useComponent = {
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