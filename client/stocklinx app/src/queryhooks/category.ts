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
}

const GetAll = () => {
  return useQuery<ICategory[]>(
    queryKeys.FETCH_CATEGORIES,
    categoryRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<ICategory>({
    queryKey: [queryKeys.FETCH_CATEGORY, id],
    queryFn: () => categoryRequests.get(id),
  });
};

const Create =(category: ICategory) => {
  return useMutation<ICategory>({
    mutationKey: queryKeys.CREATE_CATEGORY,
    mutationFn: () => categoryRequests.create(category),
    onSuccess: () => {
      queryClient.setQueryData<ICategory[]>(
        queryKeys.CREATE_CATEGORY,
        (old) => {
          return old ? [...old, category] : [category];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_CATEGORIES);
      queryClient.invalidateQueries(queryKeys.FETCH_CATEGORY);
    },
  });
};

const CreateRange = (categories: ICategory[]) => {
  return useMutation<ICategory[]>({
    mutationKey: queryKeys.CREATE_RANGE_CATEGORY,
    mutationFn: () => categoryRequests.createRange(categories),
    onSuccess: () => {
      queryClient.setQueriesData<ICategory[]>(
        queryKeys.CREATE_RANGE_CATEGORY,
        (old) => {
          return old ? [...old, ...categories] : categories;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_CATEGORY);
      queryClient.invalidateQueries(queryKeys.FETCH_CATEGORIES);
    },
  });
};

const Update = (category: ICategory) => {
  return useMutation<ICategory>({
    mutationKey: queryKeys.UPDATE_CATEGORY,
    mutationFn: () => categoryRequests.update(category),
    onSuccess: () => {
      queryClient.setQueryData<ICategory[]>(
        queryKeys.UPDATE_CATEGORY,
        (old) => {
          return old
            ? old.map((item) => (item.id === category.id ? category : item))
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_CATEGORY);
      queryClient.invalidateQueries(queryKeys.FETCH_CATEGORIES);
      queryClient.invalidateQueries([queryKeys.FETCH_CATEGORY, category.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_CATEGORY,
    mutationFn: () => categoryRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<ICategory[]>(
        queryKeys.DELETE_CATEGORY,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_CATEGORY);
      queryClient.invalidateQueries(queryKeys.FETCH_CATEGORIES);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_CATEGORY,
    mutationFn: () => categoryRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<ICategory[]>(
        queryKeys.DELETE_RANGE_CATEGORY,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_CATEGORY);
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

export const useCategory = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
};
