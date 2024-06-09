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
  LOOKUP_COMPANIES = "LOOKUP_COMPANIES",
}

const GetAll = () => {
  return useQuery<ICompany[]>(
    queryKeys.FETCH_COMPANIES,
    companyRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<ICompany>({
    queryKey: [queryKeys.FETCH_COMPANY, id],
    queryFn: () => companyRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_COMPANY,
    mutationFn: (company: ICompany) => companyRequests.create(company),
    onSuccess: (company) => {
      queryClient.invalidateQueries(queryKeys.FETCH_COMPANY);
      queryClient.setQueryData<ICompany[]>(queryKeys.FETCH_COMPANIES, (old) => {
        return old ? [...old, company] : [company];
      });
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_COMPANY,
    mutationFn: (companies: ICompany[]) =>
      companyRequests.createRange(companies),
    onSuccess: (companies) => {
      queryClient.setQueryData<ICompany[]>(queryKeys.FETCH_COMPANIES, (old) => {
        return old ? [...old, ...companies] : companies;
      });
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_COMPANY,
    mutationFn: (company: ICompany) => companyRequests.update(company),
    onSuccess: (company) => {
      queryClient.setQueryData<ICompany[]>(queryKeys.FETCH_COMPANIES, (old) => {
        if (old) {
          const index = old.findIndex((x) => x.id === company.id);
          old[index] = company;
          return [...old];
        }
        return [company];
      });
      queryClient.setQueryData<ICompany>(
        [queryKeys.FETCH_COMPANY, company.id],
        company
      );
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_COMPANY,
    mutationFn: (id: string) => companyRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_COMPANIES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_COMPANY,
    mutationFn: (ids: string[]) => companyRequests.removeRange(ids),
    onSuccess: () => {
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

const Lookup = () => {
  return useQuery(queryKeys.LOOKUP_COMPANIES, companyRequests.lookup);
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
  Lookup,
};
