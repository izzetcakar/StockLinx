import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { ISupplier } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { supplierRequests } from "@/server/requests/supplier";
import { useMutation, useQuery } from "react-query";

export enum supplierKeys {
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
  LOOKUP_SUPPLIERS = "LOOKUP_SUPPLIERS",
}

const GetAll = () => {
  return useQuery<ISupplier[]>(
    supplierKeys.FETCH_SUPPLIERS,
    supplierRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<ISupplier>({
    queryKey: [supplierKeys.FETCH_SUPPLIER, id],
    queryFn: () => supplierRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: supplierKeys.CREATE_SUPPLIER,
    mutationFn: (supplier: ISupplier) => supplierRequests.create(supplier),
    onSuccess: (supplier) => {
      queryClient.setQueryData<ISupplier[]>(
        supplierKeys.FETCH_SUPPLIERS,
        (old) => {
          return old ? [...old, supplier] : [supplier];
        }
      );
      queryClient.invalidateQueries(supplierKeys.LOOKUP_SUPPLIERS);
      queryClient.invalidateQueries(supplierKeys.FILTER_SUPPLIERS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: supplierKeys.CREATE_RANGE_SUPPLIER,
    mutationFn: (suppliers: ISupplier[]) =>
      supplierRequests.createRange(suppliers),
    onSuccess: (suppliers) => {
      queryClient.setQueryData<ISupplier[]>(
        supplierKeys.FETCH_SUPPLIERS,
        (old) => {
          return old ? [...old, ...suppliers] : suppliers;
        }
      );
      queryClient.invalidateQueries(supplierKeys.LOOKUP_SUPPLIERS);
      queryClient.invalidateQueries(supplierKeys.FILTER_SUPPLIERS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: supplierKeys.UPDATE_SUPPLIER,
    mutationFn: (supplier: ISupplier) => supplierRequests.update(supplier),
    onSuccess: (supplier) => {
      queryClient.setQueryData<ISupplier[]>(
        supplierKeys.FETCH_SUPPLIERS,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === supplier.id);
            old[index] = supplier;
            return [...old];
          }
          return [supplier];
        }
      );
      queryClient.setQueryData<ISupplier>(
        [supplierKeys.FETCH_SUPPLIER, supplier.id],
        supplier
      );
      queryClient.invalidateQueries(supplierKeys.LOOKUP_SUPPLIERS);
      queryClient.invalidateQueries(supplierKeys.FILTER_SUPPLIERS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: supplierKeys.DELETE_SUPPLIER,
    mutationFn: (id: string) => supplierRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(supplierKeys.FETCH_SUPPLIERS);
      queryClient.invalidateQueries(supplierKeys.LOOKUP_SUPPLIERS);
      queryClient.invalidateQueries(supplierKeys.FILTER_SUPPLIERS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: supplierKeys.DELETE_RANGE_SUPPLIER,
    mutationFn: (ids: string[]) => supplierRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(supplierKeys.FETCH_SUPPLIERS);
      queryClient.invalidateQueries(supplierKeys.LOOKUP_SUPPLIERS);
      queryClient.invalidateQueries(supplierKeys.FILTER_SUPPLIERS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: supplierKeys.FILTER_SUPPLIERS,
    mutationFn: (filters: QueryFilter[]) => supplierRequests.filter(filters),
    onSuccess(data: ISupplier[]) {
      queryClient.setQueryData<ISupplier[]>(
        supplierKeys.FILTER_SUPPLIERS,
        data
      );
    },
  });
};

const Lookup = () => {
  return useQuery(supplierKeys.LOOKUP_SUPPLIERS, supplierRequests.lookup);
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
  Lookup,
};
