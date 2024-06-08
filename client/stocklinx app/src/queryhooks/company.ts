import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { ICompany } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { companyRequests } from "@/server/requests/company";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
  FETCH_COMPANIES = "FETCH_COMPANIES",
  FETCH_COMPANY = "FETCH_COMPANY",
  CREATE_COMPANY = "CREATE_COMPANY",
  UPDATE_COMPANY = "UPDATE_COMPANY",
  DELETE_COMPANY = "DELETE_COMPANY",
  CREATE_RANGE_COMPANY = "CREATE_RANGE_COMPANY",
  DELETE_RANGE_COMPANY = "DELETE_RANGE_COMPANY",
  CHECK_IN_COMPANY = "CHECK_IN_COMPANY",
  CHECK_OUT_COMPANY = "CHECK_OUT_COMPANY",
  FILTER_COMPANIES = "FILTER_COMPANIES",
}

const GetAll = () => {
  return useQuery<ICompany[]>(
    queryKeys.FETCH_COMPANIES,
    companyRequests.getAll
  );
};

const Get =(id: string) => {
  return useQuery<ICompany>({
    queryKey: [queryKeys.FETCH_COMPANY, id],
    queryFn: () => companyRequests.get(id),
  });
};

const Create =(company: ICompany) => {
  return useMutation<ICompany>({
    mutationKey: queryKeys.CREATE_COMPANY,
    mutationFn: () => companyRequests.create(company),
    onSuccess: () => {
      queryClient.setQueryData<ICompany[]>(queryKeys.CREATE_COMPANY, (old) => {
        return old ? [...old, company] : [company];
      });
      queryClient.invalidateQueries(queryKeys.FETCH_COMPANIES);
      queryClient.invalidateQueries(queryKeys.FETCH_COMPANY);
    },
  });
};

const CreateRange = (companies: ICompany[]) => {
  return useMutation<ICompany[]>({
    mutationKey: queryKeys.CREATE_RANGE_COMPANY,
    mutationFn: () => companyRequests.createRange(companies),
    onSuccess: () => {
      queryClient.setQueriesData<ICompany[]>(
        queryKeys.CREATE_RANGE_COMPANY,
        (old) => {
          return old ? [...old, ...companies] : companies;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_COMPANY);
      queryClient.invalidateQueries(queryKeys.FETCH_COMPANIES);
    },
  });
};

const Update = (company: ICompany) => {
  return useMutation<ICompany>({
    mutationKey: queryKeys.UPDATE_COMPANY,
    mutationFn: () => companyRequests.update(company),
    onSuccess: () => {
      queryClient.setQueryData<ICompany[]>(queryKeys.UPDATE_COMPANY, (old) => {
        return old
          ? old.map((item) => (item.id === company.id ? company : item))
          : [];
      });
      queryClient.invalidateQueries(queryKeys.UPDATE_COMPANY);
      queryClient.invalidateQueries(queryKeys.FETCH_COMPANIES);
      queryClient.invalidateQueries([queryKeys.FETCH_COMPANY, company.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_COMPANY,
    mutationFn: () => companyRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<ICompany[]>(queryKeys.DELETE_COMPANY, (old) => {
        return old ? old.filter((item) => item.id !== id) : [];
      });
      queryClient.invalidateQueries(queryKeys.DELETE_COMPANY);
      queryClient.invalidateQueries(queryKeys.FETCH_COMPANIES);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_COMPANY,
    mutationFn: () => companyRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<ICompany[]>(
        queryKeys.DELETE_RANGE_COMPANY,
        (old) => {
          return old ? old.filter((item) => !ids.includes(item.id)) : [];
        }
      );
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_COMPANY);
      queryClient.invalidateQueries(queryKeys.FETCH_COMPANIES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_COMPANIES,
    mutationFn: (filters: QueryFilter[]) => companyRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<ICompany[]>(queryKeys.FILTER_COMPANIES, data);
    },
  });
};

export const useCompany = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
};
