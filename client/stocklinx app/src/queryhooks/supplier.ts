import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { ISupplier } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { supplierRequests } from "@/server/requests/supplier";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_SUPPLIERS = "FETCH_SUPPLIERS",
  FETCH_SUPPLIER = "FETCH_SUPPLIER",
  CREATE_SUPPLIER = "CREATE_SUPPLIER",
  UPDATE_SUPPLIER = "UPDATE_SUPPLIER",
  DELETE_SUPPLIER = "DELETE_SUPPLIER",
  CREATE_RANGE_SUPPLIER = "CREATE_RANGE_SUPPLIER",
  DELETE_RANGE_SUPPLIER = "DELETE_RANGE_SUPPLIER",
  CHECK_IN_SUPPLIER = "CHECK_IN_SUPPLIER",
  CHECK_OUT_SUPPLIER = "CHECK_OUT_SUPPLIER",
  FILTER_SUPPLIERS = "FILTER_SUPPLIERS",
}

const GetAll = () => {
  return useQuery<ISupplier[]>(
    queryKeys.FETCH_SUPPLIERS,
    supplierRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<ISupplier>({
    queryKey: [queryKeys.FETCH_SUPPLIER, id],
    queryFn: () => supplierRequests.get(id),
  });
};

const Create =(supplier: ISupplier) => {
  return useMutation<ISupplier>({
    mutationKey: queryKeys.CREATE_SUPPLIER,
    mutationFn: () => supplierRequests.create(supplier),
    onSuccess: () => {
      queryClient.setQueryData<ISupplier[]>(
        queryKeys.CREATE_SUPPLIER,
        (old) => {
          return old ? [...old, supplier] : [supplier];
        }
      );
      queryClient.invalidateQueries(queryKeys.FETCH_SUPPLIERS);
      queryClient.invalidateQueries(queryKeys.FETCH_SUPPLIER);
    },
  });
};

const CreateRange = (suppliers: ISupplier[]) => {
  return useMutation<ISupplier[]>({
    mutationKey: queryKeys.CREATE_RANGE_SUPPLIER,
    mutationFn: () => supplierRequests.createRange(suppliers),
    onSuccess: () => {
      queryClient.setQueriesData<ISupplier[]>(
        queryKeys.CREATE_RANGE_SUPPLIER,
        (old) => {
          return old ? [...old, ...suppliers] : suppliers;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_SUPPLIER);
      queryClient.invalidateQueries(queryKeys.FETCH_SUPPLIERS);
    },
  });
};

const Update = (supplier: ISupplier) => {
  return useMutation<ISupplier>({
    mutationKey: queryKeys.UPDATE_SUPPLIER,
    mutationFn: () => supplierRequests.update(supplier),
    onSuccess: () => {
      queryClient.setQueryData<ISupplier[]>(
        queryKeys.UPDATE_SUPPLIER,
        (old) => {
          return old
            ? old.map((item) => (item.id === supplier.id ? supplier : item))
            : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.UPDATE_SUPPLIER);
      queryClient.invalidateQueries(queryKeys.FETCH_SUPPLIERS);
      queryClient.invalidateQueries([queryKeys.FETCH_SUPPLIER, supplier.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_SUPPLIER,
    mutationFn: () => supplierRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<ISupplier[]>(
        queryKeys.DELETE_SUPPLIER,
        (old) => {
          return old ? old.filter((item) => item.id !== id) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_SUPPLIER);
      queryClient.invalidateQueries(queryKeys.FETCH_SUPPLIERS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_SUPPLIER,
    mutationFn: () => supplierRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<ISupplier[]>(
        queryKeys.DELETE_RANGE_SUPPLIER,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_SUPPLIER);
      queryClient.invalidateQueries(queryKeys.FETCH_SUPPLIERS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_SUPPLIERS,
    mutationFn: (filters: QueryFilter[]) => supplierRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<ISupplier[]>(queryKeys.FILTER_SUPPLIERS, data);
    },
  });
};

export const useSupplier = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
};
