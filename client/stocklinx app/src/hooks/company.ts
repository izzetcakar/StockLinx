import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { ICompany } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { companyRequests } from "@/server/requests/company";
import { useMutation, useQuery } from "react-query";

export enum companyKeys {
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
    companyKeys.FETCH_COMPANIES,
    companyRequests.getAll
  );
};

const Get = (id: string) => {
  return useQuery<ICompany>({
    queryKey: [companyKeys.FETCH_COMPANY, id],
    queryFn: () => companyRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: companyKeys.CREATE_COMPANY,
    mutationFn: (company: ICompany) => companyRequests.create(company),
    onSuccess: (company) => {
      queryClient.setQueryData<ICompany[]>(
        companyKeys.FETCH_COMPANIES,
        (old) => {
          return old ? [...old, company] : [company];
        }
      );
      queryClient.invalidateQueries(companyKeys.LOOKUP_COMPANIES);
      queryClient.invalidateQueries(companyKeys.FILTER_COMPANIES);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: companyKeys.CREATE_RANGE_COMPANY,
    mutationFn: (companies: ICompany[]) =>
      companyRequests.createRange(companies),
    onSuccess: (companies) => {
      queryClient.setQueryData<ICompany[]>(
        companyKeys.FETCH_COMPANIES,
        (old) => {
          return old ? [...old, ...companies] : companies;
        }
      );
      queryClient.invalidateQueries(companyKeys.LOOKUP_COMPANIES);
      queryClient.invalidateQueries(companyKeys.FILTER_COMPANIES);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: companyKeys.UPDATE_COMPANY,
    mutationFn: (company: ICompany) => companyRequests.update(company),
    onSuccess: (company) => {
      queryClient.setQueryData<ICompany[]>(
        companyKeys.FETCH_COMPANIES,
        (old) => {
          if (old) {
            const index = old.findIndex((x) => x.id === company.id);
            old[index] = company;
            return [...old];
          }
          return [company];
        }
      );
      queryClient.setQueryData<ICompany>(
        [companyKeys.FETCH_COMPANY, company.id],
        company
      );
      queryClient.invalidateQueries(companyKeys.LOOKUP_COMPANIES);
      queryClient.invalidateQueries(companyKeys.FILTER_COMPANIES);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: companyKeys.DELETE_COMPANY,
    mutationFn: (id: string) => companyRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(companyKeys.FETCH_COMPANIES);
      queryClient.invalidateQueries(companyKeys.LOOKUP_COMPANIES);
      queryClient.invalidateQueries(companyKeys.FILTER_COMPANIES);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: companyKeys.DELETE_RANGE_COMPANY,
    mutationFn: (ids: string[]) => companyRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(companyKeys.FETCH_COMPANIES);
      queryClient.invalidateQueries(companyKeys.LOOKUP_COMPANIES);
      queryClient.invalidateQueries(companyKeys.FILTER_COMPANIES);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: companyKeys.FILTER_COMPANIES,
    mutationFn: (filters: QueryFilter[]) => companyRequests.filter(filters),
    onSuccess(data: ICompany[]) {
      queryClient.setQueryData<ICompany[]>(companyKeys.FILTER_COMPANIES, data);
    },
  });
};

const Lookup = () => {
  return useQuery(companyKeys.LOOKUP_COMPANIES, companyRequests.lookup);
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
