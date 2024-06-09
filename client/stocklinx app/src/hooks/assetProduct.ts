import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAssetProduct } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { assetProductRequests } from "@/server/requests/assetProduct";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_ASSETPRODUCTS = "FETCH_ASSETPRODUCTS",
  FETCH_ASSETPRODUCT = "FETCH_ASSETPRODUCT",
  CREATE_ASSETPRODUCT = "CREATE_ASSETPRODUCT",
  UPDATE_ASSETPRODUCT = "UPDATE_ASSETPRODUCT",
  DELETE_ASSETPRODUCT = "DELETE_ASSETPRODUCT",
  CREATE_RANGE_ASSETPRODUCT = "CREATE_RANGE_ASSETPRODUCT",
  DELETE_RANGE_ASSETPRODUCT = "DELETE_RANGE_ASSETPRODUCT",
  CHECK_IN_ASSETPRODUCT = "CHECK_IN_ASSETPRODUCT",
  CHECK_OUT_ASSETPRODUCT = "CHECK_OUT_ASSETPRODUCT",
  FILTER_ASSETPRODUCTS = "FILTER_ASSETPRODUCTS",
}

const GetAll = () => {
  return useQuery<IAssetProduct[]>(
    queryKeys.FETCH_ASSETPRODUCTS,
    assetProductRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IAssetProduct>({
    queryKey: [queryKeys.FETCH_ASSETPRODUCT, id],
    queryFn: () => assetProductRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_ASSETPRODUCT,
    mutationFn: (assetProduct: IAssetProduct) =>
      assetProductRequests.create(assetProduct),
    onSuccess: (assetProduct) => {
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETPRODUCT);
      queryClient.setQueryData<IAssetProduct[]>(
        queryKeys.FETCH_ASSETPRODUCTS,
        (old) => {
          return old ? [...old, assetProduct] : [assetProduct];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_ASSETPRODUCT,
    mutationFn: (assetProducts: IAssetProduct[]) =>
      assetProductRequests.createRange(assetProducts),
    onSuccess: (assetProducts) => {
      queryClient.setQueryData<IAssetProduct[]>(
        queryKeys.FETCH_ASSETPRODUCTS,
        (old) => {
          return old ? [...old, ...assetProducts] : assetProducts;
        }
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_ASSETPRODUCT,
    mutationFn: (assetProduct: IAssetProduct) =>
      assetProductRequests.update(assetProduct),
    onSuccess: (assetProduct) => {
      queryClient.setQueryData<IAssetProduct[]>(
        queryKeys.FETCH_ASSETPRODUCTS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === assetProduct.id);
            old[index] = assetProduct;
            return [...old];
          }
          return [assetProduct];
        }
      );
      queryClient.setQueryData<IAssetProduct>(
        [queryKeys.FETCH_ASSETPRODUCT, assetProduct.id],
        assetProduct
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_ASSETPRODUCT,
    mutationFn: (id: string) => assetProductRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETPRODUCTS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_ASSETPRODUCT,
    mutationFn: (ids: string[]) => assetProductRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETPRODUCTS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_ASSETPRODUCTS,
    mutationFn: (filters: QueryFilter[]) =>
      assetProductRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IAssetProduct[]>(
        queryKeys.FILTER_ASSETPRODUCTS,
        data
      );
    },
  });
};

export const useAssetProduct = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
};
