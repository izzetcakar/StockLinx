import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import { IUser } from "@interfaces/serverInterfaces";
import { IUserLoginDto, TokenDto } from "@/interfaces/dtos";
import { request } from "@request";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "User/";

const getAll = () => {
  return baseRequests.getAll<IUser>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<IUser>(requestUrl, id);
};

const create = (user: IUser) => {
  return baseRequests.create<IUser>(requestUrl, user);
};

const createRange = (users: IUser[]) => {
  return baseRequests.createRange<IUser>(requestUrl, users);
};

const update = (user: IUser) => {
  return baseRequests.update<IUser>(requestUrl, user);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<IUser>(requestUrl, queryFilters);
};

const lookup = () => {
  return baseRequests.lookup(requestUrl, ["firstName", "lastName"]);
};

const signIn = async (loginDto: IUserLoginDto): Promise<TokenDto> => {
  return (
    await request<TokenDto>({
      requestUrl: requestUrl + "login",
      queryData: loginDto,
      apiType: "post",
    })
  ).data as TokenDto;
};

const getWithToken = async (): Promise<IUser> => {
  return (
    await request<IUser>({
      requestUrl: requestUrl + "getWithToken",
      apiType: "get",
    })
  ).data as IUser;
};

export default {
  getAll,
  get,
  signIn,
  getWithToken,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
  lookup,
};
