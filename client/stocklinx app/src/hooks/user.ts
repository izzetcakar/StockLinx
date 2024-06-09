import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IUser, IUserLoginDto } from "@/interfaces/serverInterfaces";
import { queryClient } from "@/main";
import { userRequests } from "@/server/requests/user";
import { useMutation, useQuery } from "react-query";

enum queryKeys {
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
  SIGN_IN = "SIGN_IN",
  GET_WITH_TOKEN = "GET_WITH_TOKEN",
  LOOKUP_USERS = "LOOKUP_USERS",
}

const GetAll = () => {
  return useQuery<IUser[]>(queryKeys.FETCH_USERS, userRequests.getAll);
};

const GetWithToken = () => {
  return useQuery(queryKeys.GET_WITH_TOKEN, userRequests.getWithToken);
};

const Get = (id: string) => {
  return useQuery<IUser>({
    queryKey: [queryKeys.FETCH_USER, id],
    queryFn: () => userRequests.get(id),
  });
};

const Create = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_USER,
    mutationFn: (user: IUser) => userRequests.create(user),
    onSuccess: (user) => {
      queryClient.invalidateQueries(queryKeys.FETCH_USER);
      queryClient.setQueryData<IUser[]>(queryKeys.FETCH_USERS, (old) => {
        return old ? [...old, user] : [user];
      });
    },
  });
};

const CreateRange = () => {
  return useMutation({
    mutationKey: queryKeys.CREATE_RANGE_USER,
    mutationFn: (users: IUser[]) => userRequests.createRange(users),
    onSuccess: (users) => {
      queryClient.setQueryData<IUser[]>(queryKeys.FETCH_USERS, (old) => {
        return old ? [...old, ...users] : users;
      });
    },
  });
};

const Update = () => {
  return useMutation({
    mutationKey: queryKeys.UPDATE_USER,
    mutationFn: (user: IUser) => userRequests.update(user),
    onSuccess: (user) => {
      queryClient.setQueryData<IUser[]>(queryKeys.FETCH_USERS, (old) => {
        if (old) {
          const index = old.findIndex((x) => x.id === user.id);
          old[index] = user;
          return [...old];
        }
        return [user];
      });
      queryClient.setQueryData<IUser>([queryKeys.FETCH_USER, user.id], user);
    },
  });
};

const Remove = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_USER,
    mutationFn: (id: string) => userRequests.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_USERS);
    },
  });
};

const RemoveRange = () => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_USER,
    mutationFn: (ids: string[]) => userRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.FETCH_USERS);
    },
  });
};

const Filter = () => {
  return useMutation({
    mutationKey: queryKeys.FILTER_USERS,
    mutationFn: (filters: QueryFilter[]) => userRequests.filter(filters),
    onSuccess(data) {
      queryClient.setQueryData<IUser[]>(queryKeys.FILTER_USERS, data);
    },
  });
};

const Lookup = () => {
  return useQuery(queryKeys.LOOKUP_USERS, userRequests.lookup);
};

const SignIn = () => {
  return useMutation({
    mutationKey: queryKeys.SIGN_IN,
    mutationFn: (loginDto: IUserLoginDto) => userRequests.signIn(loginDto),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.SIGN_IN);
      queryClient.invalidateQueries(queryKeys.FETCH_USERS);
    },
  });
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
