import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { ICategory } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { categoryRequests } from "@/server/requests/category";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
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
    queryKeys.FETCH_CATEGORIES,
    categoryRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<ICategory>({
    queryKey: [queryKeys.FETCH_CATEGORY, id],
    queryFn: () => categoryRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_CATEGORY,
    mutationFn: (category: ICategory) => categoryRequests.create(category),
    onSuccess: (category) => {
      queryClient.invalidateQueries(queryKeys.FETCH_CATEGORY);
      queryClient.setQueryData<ICategory[]>(
        queryKeys.FETCH_CATEGORIES,
        (old) => {
          return old ? [...old, category] : [category];
        }
      );
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_CATEGORY,
    mutationFn: (categories: ICategory[]) =>
      categoryRequests.createRange(categories),
    onSuccess: (categories) => {
      queryClient.setQueryData<ICategory[]>(
        queryKeys.FETCH_CATEGORIES,
        (old) => {
          return old ? [...old, ...categories] : categories;
        }
      );
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_CATEGORY,
    mutationFn: (category: ICategory) => categoryRequests.update(category),
    onSuccess: (category) => {
      queryClient.setQueryData<ICategory[]>(
        queryKeys.FETCH_CATEGORIES,
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
        [queryKeys.FETCH_CATEGORY, category.id],
        category
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_CATEGORY,
    mutationFn: (id: string) => categoryRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_CATEGORIES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_CATEGORY,
    mutationFn: (ids: string[]) => categoryRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_CATEGORIES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_CATEGORIES,
    mutationFn: (filters: QueryFilter[]) => categoryRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<ICategory[]>(queryKeys.FILTER_CATEGORIES, data);
    },
  });
};

const Lookup = () => {
  return useQuery(queryKeys.LOOKUP_CATEGORIES, categoryRequests.lookup);
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
