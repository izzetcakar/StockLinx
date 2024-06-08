import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IUserProduct } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { userProductRequests } from "@/server/requests/userProduct";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_USERPRODUCTS = "FETCH_USERPRODUCTS",
  FETCH_USERPRODUCT = "FETCH_USERPRODUCT",
  CREATE_USERPRODUCT = "CREATE_USERPRODUCT",
  UPDATE_USERPRODUCT = "UPDATE_USERPRODUCT",
  DELETE_USERPRODUCT = "DELETE_USERPRODUCT",
  CREATE_RANGE_USERPRODUCT = "CREATE_RANGE_USERPRODUCT",
  DELETE_RANGE_USERPRODUCT = "DELETE_RANGE_USERPRODUCT",
  CHECK_IN_USERPRODUCT = "CHECK_IN_USERPRODUCT",
  CHECK_OUT_USERPRODUCT = "CHECK_OUT_USERPRODUCT",
  FILTER_USERPRODUCTS = "FILTER_USERPRODUCTS",
}

const GetAll = () => {
  return useQuery<IUserProduct[]>(
    queryKeys.FETCH_USERPRODUCTS,
    userProductRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<IUserProduct>({
    queryKey: [queryKeys.FETCH_USERPRODUCT, id],
    queryFn: () => userProductRequests.get(id),
  });
};

const Create =(userProduct: IUserProduct) => {
  return useMutation<IUserProduct>({
    mutationKey: queryKeys.CREATE_USERPRODUCT,
    mutationFn: () => userProductRequests.create(userProduct),
    onSuccess: () => {
      queryClient.setQueryData<IUserProduct[]>(
        queryKeys.CREATE_USERPRODUCT,
        (old) => {
          return old ? [...old, userProduct] : [userProduct];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries(queryKeys.FETCH_USERPRODUCT);
    },
  });
};

const CreateRange = (userProducts: IUserProduct[]) => {
  return useMutation<IUserProduct[]>({
    mutationKey: queryKeys.CREATE_RANGE_USERPRODUCT,
    mutationFn: () => userProductRequests.createRange(userProducts),
    onSuccess: () => {
      queryClient.setQueriesData<IUserProduct[]>(
        queryKeys.CREATE_RANGE_USERPRODUCT,
        (old) => {
          return old ? [...old, ...userProducts] : userProducts;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_USERPRODUCT);
      queryClient.invalidateQueries(queryKeys.FETCH_USERPRODUCTS);
    },
  });
};

const Update = (userProduct: IUserProduct) => {
  return useMutation<IUserProduct>({
    mutationKey: queryKeys.UPDATE_USERPRODUCT,
    mutationFn: () => userProductRequests.update(userProduct),
    onSuccess: () => {
      queryClient.setQueryData<IUserProduct[]>(
        queryKeys.UPDATE_USERPRODUCT,
        (old) => {
          return old
            ? old.map((item) =>
                item.id === userProduct.id ? userProduct : item
              )
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_USERPRODUCT);
      queryClient.invalidateQueries(queryKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries([
        queryKeys.FETCH_USERPRODUCT,
        userProduct.id,
      ]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_USERPRODUCT,
    mutationFn: () => userProductRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IUserProduct[]>(
        queryKeys.DELETE_USERPRODUCT,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_USERPRODUCT);
      queryClient.invalidateQueries(queryKeys.FETCH_USERPRODUCTS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_USERPRODUCT,
    mutationFn: () => userProductRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IUserProduct[]>(
        queryKeys.DELETE_RANGE_USERPRODUCT,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_USERPRODUCT);
      queryClient.invalidateQueries(queryKeys.FETCH_USERPRODUCTS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_USERPRODUCTS,
    mutationFn: (filters: QueryFilter[]) => userProductRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IUserProduct[]>(
        queryKeys.FILTER_USERPRODUCTS,
        data
      );
    },
  });
};

export const useUserProduct = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
};
