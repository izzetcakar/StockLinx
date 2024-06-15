import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IUserProduct } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { userProductRequests } from "@/server/requests/userProduct";
import { useMutation, useQuery } from "react-query";

export enum userProductKeys {
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
    userProductKeys.FETCH_USERPRODUCTS,
    userProductRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<IUserProduct>({
    queryKey: [userProductKeys.FETCH_USERPRODUCT, id],
    queryFn: () => userProductRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: userProductKeys.CREATE_USERPRODUCT,
    mutationFn: (userProduct: IUserProduct) =>
      userProductRequests.create(userProduct),
    onSuccess: (userProduct) => {
      queryClient.setQueryData<IUserProduct[]>(
        userProductKeys.FETCH_USERPRODUCTS,
        (old) => {
          return old ? [...old, userProduct] : [userProduct];
        }
      );
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: userProductKeys.CREATE_RANGE_USERPRODUCT,
    mutationFn: (userProducts: IUserProduct[]) =>
      userProductRequests.createRange(userProducts),
    onSuccess: (userProducts) => {
      queryClient.setQueryData<IUserProduct[]>(
        userProductKeys.FETCH_USERPRODUCTS,
        (old) => {
          return old ? [...old, ...userProducts] : userProducts;
        }
      );
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: userProductKeys.UPDATE_USERPRODUCT,
    mutationFn: (userProduct: IUserProduct) =>
      userProductRequests.update(userProduct),
    onSuccess: (userProduct) => {
      queryClient.setQueryData<IUserProduct[]>(
        userProductKeys.FETCH_USERPRODUCTS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === userProduct.id);
            old[index] = userProduct;
            return [...old];
          }
          return [userProduct];
        }
      );
      queryClient.setQueryData<IUserProduct>(
        [userProductKeys.FETCH_USERPRODUCT, userProduct.id],
        userProduct
      );
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: userProductKeys.DELETE_USERPRODUCT,
    mutationFn: (id: string) => userProductRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(userProductKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: userProductKeys.DELETE_RANGE_USERPRODUCT,
    mutationFn: (ids: string[]) => userProductRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(userProductKeys.FETCH_USERPRODUCTS);
      queryClient.invalidateQueries(userProductKeys.FILTER_USERPRODUCTS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: userProductKeys.FILTER_USERPRODUCTS,
    mutationFn: (filters: QueryFilter[]) => userProductRequests.filter(filters),
    onSuccess(data: IUserProduct[]) {
      queryClient.setQueryData<IUserProduct[]>(
        userProductKeys.FILTER_USERPRODUCTS,
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
