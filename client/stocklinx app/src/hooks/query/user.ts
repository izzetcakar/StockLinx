import { IUserLoginDto, TokenDto } from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { userRequests } from "@/server/requests/user";
import { useMutation, useQuery } from "react-query";
import { baseHooks } from "./baseHooks";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { userKeys } from "./keys";

const hooks = baseHooks("USER");

const GetAll = () => {
  return hooks.GetAll(userRequests.getAll);
};

const Get = (id: string) => {
  return hooks.Get(id, userRequests.get);
};

const Create = () => {
  return hooks.Create(userRequests.create);
};

const CreateRange = () => {
  return hooks.CreateRange(userRequests.createRange);
};

const Update = () => {
  return hooks.Update(userRequests.update);
};

const Remove = () => {
  return hooks.Remove(userRequests.remove);
};

const RemoveRange = () => {
  return hooks.RemoveRange(userRequests.removeRange);
};

const Filter = (filters: QueryFilter[]) => {
  return hooks.Filter(filters, userRequests.filter);
};

const ApplyFilters = () => {
  return hooks.ApplyFilter(userRequests.filter);
};

const Lookup = () => {
  return hooks.Lookup(userRequests.lookup);
};
const SignIn = () => {
  return useMutation<TokenDto, Error, IUserLoginDto>({
    mutationKey: userKeys.SIGN_IN_USER,
    mutationFn: (loginDto: IUserLoginDto) => userRequests.signIn(loginDto),
    onSuccess: (data: TokenDto) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries(userKeys.GET_WITH_TOKEN_USER);
    },
  });
};

const GetWithToken = () => {
  return useQuery(userKeys.GET_WITH_TOKEN_USER, userRequests.getWithToken);
};

export const useUser = {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Filter,
  ApplyFilters,
  Lookup,
  SignIn,
  GetWithToken,
};
