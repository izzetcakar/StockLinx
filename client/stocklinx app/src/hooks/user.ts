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

const Create = (user: IUser) => {
  return useMutation<IUser>({
    mutationKey: queryKeys.CREATE_USER,
    mutationFn: () => userRequests.create(user),
    onSuccess: () => {
      queryClient.setQueryData<IUser[]>(queryKeys.CREATE_USER, (old) => {
        return old ? [...old, user] : [user];
      });
      queryClient.invalidateQueries(queryKeys.FETCH_USERS);
      queryClient.invalidateQueries(queryKeys.FETCH_USER);
    },
  });
};

const CreateRange = (users: IUser[]) => {
  return useMutation<IUser[]>({
    mutationKey: queryKeys.CREATE_RANGE_USER,
    mutationFn: () => userRequests.createRange(users),
    onSuccess: () => {
      queryClient.setQueriesData<IUser[]>(
        queryKeys.CREATE_RANGE_USER,
        (old) => {
          return old ? [...old, ...users] : users;
        }
      );
      queryClient.invalidateQueries(queryKeys.CREATE_RANGE_USER);
      queryClient.invalidateQueries(queryKeys.FETCH_USERS);
    },
  });
};

const Update = (user: IUser) => {
  return useMutation<IUser>({
    mutationKey: queryKeys.UPDATE_USER,
    mutationFn: () => userRequests.update(user),
    onSuccess: () => {
      queryClient.setQueryData<IUser[]>(queryKeys.UPDATE_USER, (old) => {
        return old
          ? old.map((item) => (item.id === user.id ? user : item))
          : [];
      });
      queryClient.invalidateQueries(queryKeys.UPDATE_USER);
      queryClient.invalidateQueries(queryKeys.FETCH_USERS);
      queryClient.invalidateQueries([queryKeys.FETCH_USER, user.id]);
    },
  });
};

const Remove = (id: string) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_USER,
    mutationFn: () => userRequests.remove(id),
    onSuccess: () => {
      queryClient.setQueryData<IUser[]>(queryKeys.DELETE_USER, (old) => {
        return old ? old.filter((item) => item.id !== id) : [];
      });
      queryClient.invalidateQueries(queryKeys.DELETE_USER);
      queryClient.invalidateQueries(queryKeys.FETCH_USERS);
    },
  });
};

const RemoveRange = (ids: string[]) => {
  return useMutation({
    mutationKey: queryKeys.DELETE_RANGE_USER,
    mutationFn: () => userRequests.removeRange(ids),
    onSuccess: () => {
      queryClient.setQueryData<IUser[]>(queryKeys.DELETE_RANGE_USER, (old) => {
        return old ? old.filter((item) => !ids.includes(item.id)) : [];
      });
      queryClient.invalidateQueries(queryKeys.DELETE_RANGE_USER);
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
  SignIn,
  GetWithToken,
};
