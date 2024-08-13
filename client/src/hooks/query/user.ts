import { IUserLoginDto, TokenDto } from "@/interfaces/dtos";
import { queryClient } from "@/main";
import { userRequests } from "@requests";
import { useMutation, useQuery } from "react-query";
import { baseHooks } from "./baseHooks";
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
  return useQuery({
    queryKey: userKeys.GET_WITH_TOKEN_USER,
    queryFn: userRequests.getWithToken,
  });
};

export default {
  GetAll,
  Get,
  Create,
  CreateRange,
  Update,
  Remove,
  RemoveRange,
  Lookup,
  SignIn,
  GetWithToken,
};
