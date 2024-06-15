import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAssetProduct } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { assetProductRequests } from "@/server/requests/assetProduct";
import { useMutation, useQuery } from "react-query";

export enum assetProductKeys {
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
    assetProductKeys.FETCH_ASSETPRODUCTS,
    assetProductRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IAssetProduct>({
    queryKey: [assetProductKeys.FETCH_ASSETPRODUCT, id],
    queryFn: () => assetProductRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: assetProductKeys.CREATE_ASSETPRODUCT,
    mutationFn: (assetProduct: IAssetProduct) =>
      assetProductRequests.create(assetProduct),
    onSuccess: (assetProduct) => {
      queryClient.setQueryData<IAssetProduct[]>(
        assetProductKeys.FETCH_ASSETPRODUCTS,
        (old) => {
          return old ? [...old, assetProduct] : [assetProduct];
        }
      );
      queryClient.invalidateQueries(assetProductKeys.FILTER_ASSETPRODUCTS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: assetProductKeys.CREATE_RANGE_ASSETPRODUCT,
    mutationFn: (assetProducts: IAssetProduct[]) =>
      assetProductRequests.createRange(assetProducts),
    onSuccess: (assetProducts) => {
      queryClient.setQueryData<IAssetProduct[]>(
        assetProductKeys.FETCH_ASSETPRODUCTS,
        (old) => {
          return old ? [...old, ...assetProducts] : assetProducts;
        }
      );
      queryClient.invalidateQueries(assetProductKeys.FILTER_ASSETPRODUCTS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: assetProductKeys.UPDATE_ASSETPRODUCT,
    mutationFn: (assetProduct: IAssetProduct) =>
      assetProductRequests.update(assetProduct),
    onSuccess: (assetProduct) => {
      queryClient.setQueryData<IAssetProduct[]>(
        assetProductKeys.FETCH_ASSETPRODUCTS,
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
        [assetProductKeys.FETCH_ASSETPRODUCT, assetProduct.id],
        assetProduct
      );
      queryClient.invalidateQueries(assetProductKeys.FILTER_ASSETPRODUCTS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: assetProductKeys.DELETE_ASSETPRODUCT,
    mutationFn: (id: string) => assetProductRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(assetProductKeys.FETCH_ASSETPRODUCTS);
      queryClient.invalidateQueries(assetProductKeys.FILTER_ASSETPRODUCTS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: assetProductKeys.DELETE_RANGE_ASSETPRODUCT,
    mutationFn: (ids: string[]) => assetProductRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(assetProductKeys.FETCH_ASSETPRODUCTS);
      queryClient.invalidateQueries(assetProductKeys.FILTER_ASSETPRODUCTS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: assetProductKeys.FILTER_ASSETPRODUCTS,
    mutationFn: (filters: QueryFilter[]) =>
      assetProductRequests.filter(filters),
    onSuccess(data: IAssetProduct[]) {
      queryClient.setQueryData<IAssetProduct[]>(
        assetProductKeys.FILTER_ASSETPRODUCTS,
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
