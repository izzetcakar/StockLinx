import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IProductStatus } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { productStatusRequests } from "@/server/requests/productStatus";
import { useMutation, useQuery } from "react-query";

export enum productStatusKeys {
  FETCH_PRODUCTSTATUSS = "FETCH_PRODUCTSTATUSS",
  FETCH_PRODUCTSTATUS = "FETCH_PRODUCTSTATUS",
  CREATE_PRODUCTSTATUS = "CREATE_PRODUCTSTATUS",
  UPDATE_PRODUCTSTATUS = "UPDATE_PRODUCTSTATUS",
  DELETE_PRODUCTSTATUS = "DELETE_PRODUCTSTATUS",
  CREATE_RANGE_PRODUCTSTATUS = "CREATE_RANGE_PRODUCTSTATUS",
  DELETE_RANGE_PRODUCTSTATUS = "DELETE_RANGE_PRODUCTSTATUS",
  CHECK_IN_PRODUCTSTATUS = "CHECK_IN_PRODUCTSTATUS",
  CHECK_OUT_PRODUCTSTATUS = "CHECK_OUT_PRODUCTSTATUS",
  FILTER_PRODUCTSTATUSS = "FILTER_PRODUCTSTATUSS",
  LOOKUP_PRODUCTSTATUSS = "LOOKUP_PRODUCTSTATUSS",
}

const GetAll = () => {
  return useQuery<IProductStatus[]>(
    productStatusKeys.FETCH_PRODUCTSTATUSS,
    productStatusRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IProductStatus>({
    queryKey: [productStatusKeys.FETCH_PRODUCTSTATUS, id],
    queryFn: () => productStatusRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: productStatusKeys.CREATE_PRODUCTSTATUS,
    mutationFn: (productStatus: IProductStatus) =>
      productStatusRequests.create(productStatus),
    onSuccess: (productStatus) => {
      queryClient.setQueryData<IProductStatus[]>(
        productStatusKeys.FETCH_PRODUCTSTATUSS,
        (old) => {
          return old ? [...old, productStatus] : [productStatus];
        }
      );
      queryClient.invalidateQueries(productStatusKeys.LOOKUP_PRODUCTSTATUSS);
      queryClient.invalidateQueries(productStatusKeys.FILTER_PRODUCTSTATUSS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: productStatusKeys.CREATE_RANGE_PRODUCTSTATUS,
    mutationFn: (productStatuss: IProductStatus[]) =>
      productStatusRequests.createRange(productStatuss),
    onSuccess: (productStatuss) => {
      queryClient.setQueryData<IProductStatus[]>(
        productStatusKeys.FETCH_PRODUCTSTATUSS,
        (old) => {
          return old ? [...old, ...productStatuss] : productStatuss;
        }
      );
      queryClient.invalidateQueries(productStatusKeys.LOOKUP_PRODUCTSTATUSS);
      queryClient.invalidateQueries(productStatusKeys.FILTER_PRODUCTSTATUSS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: productStatusKeys.UPDATE_PRODUCTSTATUS,
    mutationFn: (productStatus: IProductStatus) =>
      productStatusRequests.update(productStatus),
    onSuccess: (productStatus) => {
      queryClient.setQueryData<IProductStatus[]>(
        productStatusKeys.FETCH_PRODUCTSTATUSS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === productStatus.id);
            old[index] = productStatus;
            return [...old];
          }
          return [productStatus];
        }
      );
      queryClient.setQueryData<IProductStatus>(
        [productStatusKeys.FETCH_PRODUCTSTATUS, productStatus.id],
        productStatus
      );
      queryClient.invalidateQueries(productStatusKeys.LOOKUP_PRODUCTSTATUSS);
      queryClient.invalidateQueries(productStatusKeys.FILTER_PRODUCTSTATUSS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: productStatusKeys.DELETE_PRODUCTSTATUS,
    mutationFn: (id: string) => productStatusRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(productStatusKeys.FETCH_PRODUCTSTATUSS);
      queryClient.invalidateQueries(productStatusKeys.LOOKUP_PRODUCTSTATUSS);
      queryClient.invalidateQueries(productStatusKeys.FILTER_PRODUCTSTATUSS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: productStatusKeys.DELETE_RANGE_PRODUCTSTATUS,
    mutationFn: (ids: string[]) => productStatusRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(productStatusKeys.FETCH_PRODUCTSTATUSS);
      queryClient.invalidateQueries(productStatusKeys.LOOKUP_PRODUCTSTATUSS);
      queryClient.invalidateQueries(productStatusKeys.FILTER_PRODUCTSTATUSS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: productStatusKeys.FILTER_PRODUCTSTATUSS,
    mutationFn: (filters: QueryFilter[]) =>
      productStatusRequests.filter(filters),
    onSuccess(data: IProductStatus[]) {
      queryClient.setQueryData<IProductStatus[]>(
        productStatusKeys.FILTER_PRODUCTSTATUSS,
        data
      );
    },
  });
};

const Lookup = () => {
  return useQuery(
    productStatusKeys.LOOKUP_PRODUCTSTATUSS,
    productStatusRequests.lookup
  );
};

export const useProductStatus = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  Lookup,
};
