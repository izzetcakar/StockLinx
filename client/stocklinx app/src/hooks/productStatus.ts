import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IProductStatus } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { productStatusRequests } from "@/server/requests/productStatus";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
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
    queryKeys.FETCH_PRODUCTSTATUSS,
    productStatusRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IProductStatus>({
    queryKey: [queryKeys.FETCH_PRODUCTSTATUS, id],
    queryFn: () => productStatusRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_PRODUCTSTATUS,
    mutationFn: (productStatus: IProductStatus) =>
      productStatusRequests.create(productStatus),
    onSuccess: (productStatus) => {
      queryClient.invalidateQueries(queryKeys.FETCH_PRODUCTSTATUS);
      queryClient.setQueryData<IProductStatus[]>(
        queryKeys.FETCH_PRODUCTSTATUSS,
        (old) => {
          return old ? [...old, productStatus] : [productStatus];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_PRODUCTSTATUS,
    mutationFn: (productStatuss: IProductStatus[]) =>
      productStatusRequests.createRange(productStatuss),
    onSuccess: (productStatuss) => {
      queryClient.setQueryData<IProductStatus[]>(
        queryKeys.FETCH_PRODUCTSTATUSS,
        (old) => {
          return old ? [...old, ...productStatuss] : productStatuss;
        }
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_PRODUCTSTATUS,
    mutationFn: (productStatus: IProductStatus) =>
      productStatusRequests.update(productStatus),
    onSuccess: (productStatus) => {
      queryClient.setQueryData<IProductStatus[]>(
        queryKeys.FETCH_PRODUCTSTATUSS,
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
        [queryKeys.FETCH_PRODUCTSTATUS, productStatus.id],
        productStatus
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_PRODUCTSTATUS,
    mutationFn: (id: string) => productStatusRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_PRODUCTSTATUSS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_PRODUCTSTATUS,
    mutationFn: (ids: string[]) => productStatusRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_PRODUCTSTATUSS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_PRODUCTSTATUSS,
    mutationFn: (filters: QueryFilter[]) =>
      productStatusRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IProductStatus[]>(
        queryKeys.FILTER_PRODUCTSTATUSS,
        data
      );
    },
  });
};

const Lookup = () => {
  return useQuery(
    queryKeys.LOOKUP_PRODUCTSTATUSS,
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
