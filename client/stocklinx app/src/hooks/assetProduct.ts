import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IAssetProduct } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { assetProductRequests } from "@/server/requests/assetProduct";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_ACCESSORIES = "FETCH_ACCESSORIES",
  FETCH_ASSETPRODUCT = "FETCH_ASSETPRODUCT",
  CREATE_ASSETPRODUCT = "CREATE_ASSETPRODUCT",
  UPDATE_ASSETPRODUCT = "UPDATE_ASSETPRODUCT",
  DELETE_ASSETPRODUCT = "DELETE_ASSETPRODUCT",
  CREATE_RANGE_ASSETPRODUCT = "CREATE_RANGE_ASSETPRODUCT",
  DELETE_RANGE_ASSETPRODUCT = "DELETE_RANGE_ASSETPRODUCT",
  CHECK_IN_ASSETPRODUCT = "CHECK_IN_ASSETPRODUCT",
  CHECK_OUT_ASSETPRODUCT = "CHECK_OUT_ASSETPRODUCT",
  FILTER_ACCESSORIES = "FILTER_ACCESSORIES",
}

const GetAll = () => {
  return useQuery<IAssetProduct[]>(
    queryKeys.FETCH_ACCESSORIES,
    assetProductRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<IAssetProduct>({
    queryKey: [queryKeys.FETCH_ASSETPRODUCT, id],
    queryFn: () => assetProductRequests.get(id),
  });
};

const Create =(assetProduct: IAssetProduct) => {
  return useMutation<IAssetProduct>({
    mutationKey: queryKeys.CREATE_ASSETPRODUCT,
    mutationFn: () => assetProductRequests.create(assetProduct),
    onSuccess: () => {
      queryClient.setQueryData<IAssetProduct[]>(
        queryKeys.CREATE_ASSETPRODUCT,
        (old) => {
          return old ? [...old, assetProduct] : [assetProduct];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_ASSETPRODUCT);
    },
  });
};

const CreateRange = (assetProducts: IAssetProduct[]) => {
  return useMutation<IAssetProduct[]>({
    mutationKey: queryKeys.CREATE_RANGE_ASSETPRODUCT,
    mutationFn: () => assetProductRequests.createRange(assetProducts),
    onSuccess: () => {
      queryClient.setQueriesData<IAssetProduct[]>(
        queryKeys.CREATE_RANGE_ASSETPRODUCT,
        (old) => {
          return old ? [...old, ...assetProducts] : assetProducts;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_ASSETPRODUCT);
    },
  });
};

const Update = (assetProduct: IAssetProduct) => {
  return useMutation<IAssetProduct>({
    mutationKey: queryKeys.UPDATE_ASSETPRODUCT,
    mutationFn: () => assetProductRequests.update(assetProduct),
    onSuccess: () => {
      queryClient.setQueryData<IAssetProduct[]>(
        queryKeys.UPDATE_ASSETPRODUCT,
        (old) => {
          return old
            ? old.map((item) =>
                item.id === assetProduct.id ? assetProduct : item
              )
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_ASSETPRODUCT);
      queryClient.invalidateQueries([
        queryKeys.FETCH_ASSETPRODUCT,
        assetProduct.id,
      ]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_ASSETPRODUCT,
    mutationFn: () => assetProductRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IAssetProduct[]>(
        queryKeys.DELETE_ASSETPRODUCT,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_ASSETPRODUCT);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_ASSETPRODUCT,
    mutationFn: () => assetProductRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IAssetProduct[]>(
        queryKeys.DELETE_RANGE_ASSETPRODUCT,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_ASSETPRODUCT);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_ACCESSORIES,
    mutationFn: (filters: QueryFilter[]) =>
      assetProductRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IAssetProduct[]>(
        queryKeys.FILTER_ACCESSORIES,
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
