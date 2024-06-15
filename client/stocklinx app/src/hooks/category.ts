import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { ICategory } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { categoryRequests } from "@/server/requests/category";
import { useMutation, useQuery } from "react-query";

export enum categoryKeys {
  FETCH_CATEGORIES = "FETCH_CATEGORIES",
  FETCH_CATEGORY = "FETCH_CATEGORY",
  CREATE_CATEGORY = "CREATE_CATEGORY",
  UPDATE_CATEGORY = "UPDATE_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  CREATE_RANGE_CATEGORY = "CREATE_RANGE_CATEGORY",
  DELETE_RANGE_CATEGORY = "DELETE_RANGE_CATEGORY",
  CHECK_IN_CATEGORY = "CHECK_IN_CATEGORY",
  CHECK_OUT_CATEGORY = "CHECK_OUT_CATEGORY",
  FILTER_CATEGORIES = "FILTER_CATEGORIES",
  LOOKUP_CATEGORIES = "LOOKUP_CATEGORIES",
}

const GetAll = () => {
  return useQuery<ICategory[]>(
    categoryKeys.FETCH_CATEGORIES,
    categoryRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<ICategory>({
    queryKey: [categoryKeys.FETCH_CATEGORY, id],
    queryFn: () => categoryRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: categoryKeys.CREATE_CATEGORY,
    mutationFn: (category: ICategory) => categoryRequests.create(category),
    onSuccess: (category) => {
      queryClient.setQueryData<ICategory[]>(
        categoryKeys.FETCH_CATEGORIES,
        (old) => {
          return old ? [...old, category] : [category];
        }
      );
      queryClient.invalidateQueries(categoryKeys.LOOKUP_CATEGORIES);
      queryClient.invalidateQueries(categoryKeys.FILTER_CATEGORIES);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: categoryKeys.CREATE_RANGE_CATEGORY,
    mutationFn: (categories: ICategory[]) =>
      categoryRequests.createRange(categories),
    onSuccess: (categories) => {
      queryClient.setQueryData<ICategory[]>(
        categoryKeys.FETCH_CATEGORIES,
        (old) => {
          return old ? [...old, ...categories] : categories;
        }
      );
      queryClient.invalidateQueries(categoryKeys.LOOKUP_CATEGORIES);
      queryClient.invalidateQueries(categoryKeys.FILTER_CATEGORIES);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: categoryKeys.UPDATE_CATEGORY,
    mutationFn: (category: ICategory) => categoryRequests.update(category),
    onSuccess: (category) => {
      queryClient.setQueryData<ICategory[]>(
        categoryKeys.FETCH_CATEGORIES,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === category.id);
            old[index] = category;
            return [...old];
          }
          return [category];
        }
      );
      queryClient.setQueryData<ICategory>(
        [categoryKeys.FETCH_CATEGORY, category.id],
        category
      );
      queryClient.invalidateQueries(categoryKeys.LOOKUP_CATEGORIES);
      queryClient.invalidateQueries(categoryKeys.FILTER_CATEGORIES);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: categoryKeys.DELETE_CATEGORY,
    mutationFn: (id: string) => categoryRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(categoryKeys.FETCH_CATEGORIES);
      queryClient.invalidateQueries(categoryKeys.LOOKUP_CATEGORIES);
      queryClient.invalidateQueries(categoryKeys.FILTER_CATEGORIES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: categoryKeys.DELETE_RANGE_CATEGORY,
    mutationFn: (ids: string[]) => categoryRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(categoryKeys.FETCH_CATEGORIES);
      queryClient.invalidateQueries(categoryKeys.LOOKUP_CATEGORIES);
      queryClient.invalidateQueries(categoryKeys.FILTER_CATEGORIES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: categoryKeys.FILTER_CATEGORIES,
    mutationFn: (filters: QueryFilter[]) => categoryRequests.filter(filters),
    onSuccess(data: ICategory[]) {
      queryClient.setQueryData<ICategory[]>(
        categoryKeys.FILTER_CATEGORIES,
        data
      );
    },
  });
};

const Lookup = () => {
  return useQuery(categoryKeys.LOOKUP_CATEGORIES, categoryRequests.lookup);
};

export const useCategory = {
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
