import { TokenDto } from "@/interfaces/clientInterfaces";
import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IUser, IUserLoginDto } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { userRequests } from "@/server/requests/user";
import { useMutation, useQuery } from "react-query";

export enum userKeys {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USER = "FETCH_USER",
  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
  CREATE_RANGE_USER = "CREATE_RANGE_USER",
  DELETE_RANGE_USER = "DELETE_RANGE_USER",
  CHECK_IN_USER = "CHECK_IN_USER",
  CHECK_OUT_USER = "CHECK_OUT_USER",
  FILTER_USERS = "FILTER_USERS",
  SIGN_IN_USER = "SIGN_IN_USER",
  GET_WITH_TOKEN_USER = "GET_WITH_TOKEN_USER",
  LOOKUP_USERS = "LOOKUP_USERS",
}

const GetAll = () => {
  return useQuery<IUser[]>(userKeys.FETCH_USERS, userRequests.getAll);
};

const Get = (id: string) => {
  return useQuery<IUser>({
    queryKey: [userKeys.FETCH_USER, id],
    queryFn: () => userRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: userKeys.CREATE_USER,
    mutationFn: (user: IUser) => userRequests.create(user),
    onSuccess: (user) => {
      queryClient.setQueryData<IUser[]>(userKeys.FETCH_USERS, (old) => {
        return old ? [...old, user] : [user];
      });
      queryClient.invalidateQueries(userKeys.LOOKUP_USERS);
      queryClient.invalidateQueries(userKeys.FILTER_USERS);
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: userKeys.CREATE_RANGE_USER,
    mutationFn: (users: IUser[]) => userRequests.createRange(users),
    onSuccess: (users) => {
      queryClient.setQueryData<IUser[]>(userKeys.FETCH_USERS, (old) => {
        return old ? [...old, ...users] : users;
      });
      queryClient.invalidateQueries(userKeys.LOOKUP_USERS);
      queryClient.invalidateQueries(userKeys.FILTER_USERS);
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: userKeys.UPDATE_USER,
    mutationFn: (user: IUser) => userRequests.update(user),
    onSuccess: (user) => {
      queryClient.setQueryData<IUser[]>(userKeys.FETCH_USERS, (old) => {
        if (old) {
          const index = old.findIndex((x) => x.id === user.id);
          old[index] = user;
          return [...old];
        }
        return [user];
      });
      queryClient.setQueryData<IUser>([userKeys.FETCH_USER, user.id], user);
      queryClient.invalidateQueries(userKeys.LOOKUP_USERS);
      queryClient.invalidateQueries(userKeys.FILTER_USERS);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: userKeys.DELETE_USER,
    mutationFn: (id: string) => userRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(userKeys.FETCH_USERS);
      queryClient.invalidateQueries(userKeys.LOOKUP_USERS);
      queryClient.invalidateQueries(userKeys.FILTER_USERS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: userKeys.DELETE_RANGE_USER,
    mutationFn: (ids: string[]) => userRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(userKeys.FETCH_USERS);
      queryClient.invalidateQueries(userKeys.LOOKUP_USERS);
      queryClient.invalidateQueries(userKeys.FILTER_USERS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: userKeys.FILTER_USERS,
    mutationFn: (filters: QueryFilter[]) => userRequests.filter(filters),
    onSuccess(data: IUser[]) {
      queryClient.setQueryData<IUser[]>(userKeys.FILTER_USERS, data);
    },
  });
};

const Lookup = () => {
  return useQuery(userKeys.LOOKUP_USERS, userRequests.lookup);
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
  Lookup,
  SignIn,
  GetWithToken,
};
