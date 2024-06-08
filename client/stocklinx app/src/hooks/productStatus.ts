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
}

const GetAll = () => {
  return useQuery<IProductStatus[]>(
    queryKeys.FETCH_PRODUCTSTATUSS,
    productStatusRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<IProductStatus>({
    queryKey: [queryKeys.FETCH_PRODUCTSTATUS, id],
    queryFn: () => productStatusRequests.get(id),
  });
};

const Create =(productStatus: IProductStatus) => {
  return useMutation<IProductStatus>({
    mutationKey: queryKeys.CREATE_PRODUCTSTATUS,
    mutationFn: () => productStatusRequests.create(productStatus),
    onSuccess: () => {
      queryClient.setQueryData<IProductStatus[]>(
        queryKeys.CREATE_PRODUCTSTATUS,
        (old) => {
          return old ? [...old, productStatus] : [productStatus];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_PRODUCTSTATUSS);
      queryClient.invalidateQueries(queryKeys.FETCH_PRODUCTSTATUS);
    },
  });
};

const CreateRange = (productStatuss: IProductStatus[]) => {
  return useMutation<IProductStatus[]>({
    mutationKey: queryKeys.CREATE_RANGE_PRODUCTSTATUS,
    mutationFn: () => productStatusRequests.createRange(productStatuss),
    onSuccess: () => {
      queryClient.setQueriesData<IProductStatus[]>(
        queryKeys.CREATE_RANGE_PRODUCTSTATUS,
        (old) => {
          return old ? [...old, ...productStatuss] : productStatuss;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_PRODUCTSTATUS);
      queryClient.invalidateQueries(queryKeys.FETCH_PRODUCTSTATUSS);
    },
  });
};

const Update = (productStatus: IProductStatus) => {
  return useMutation<IProductStatus>({
    mutationKey: queryKeys.UPDATE_PRODUCTSTATUS,
    mutationFn: () => productStatusRequests.update(productStatus),
    onSuccess: () => {
      queryClient.setQueryData<IProductStatus[]>(
        queryKeys.UPDATE_PRODUCTSTATUS,
        (old) => {
          return old
            ? old.map((item) =>
                item.id === productStatus.id ? productStatus : item
              )
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_PRODUCTSTATUS);
      queryClient.invalidateQueries(queryKeys.FETCH_PRODUCTSTATUSS);
      queryClient.invalidateQueries([
        queryKeys.FETCH_PRODUCTSTATUS,
        productStatus.id,
      ]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_PRODUCTSTATUS,
    mutationFn: () => productStatusRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IProductStatus[]>(
        queryKeys.DELETE_PRODUCTSTATUS,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_PRODUCTSTATUS);
      queryClient.invalidateQueries(queryKeys.FETCH_PRODUCTSTATUSS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_PRODUCTSTATUS,
    mutationFn: () => productStatusRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IProductStatus[]>(
        queryKeys.DELETE_RANGE_PRODUCTSTATUS,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_PRODUCTSTATUS);
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

export const useProductStatus = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
};
