import { QueryFilter } from "@/interfaces/gridTableInterfaces";
import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
  AssetProductDto,
  EmployeeProductCheckInDto,
  EmployeeProductCheckOutDto,
  EmployeeProductDto,
} from "@interfaces/dtos";
import { ILicense } from "@interfaces/serverInterfaces";
import { request } from "@request";
import { baseRequests } from "@/utils/requestUtils";

const requestUrl = "License/";

const getAll = () => {
  return baseRequests.getAll<ILicense>(requestUrl);
};

const get = (id: string) => {
  return baseRequests.get<ILicense>(requestUrl, id);
};

const create = (license: ILicense) => {
  return baseRequests.create<ILicense>(requestUrl, license);
};

const createRange = (licenses: ILicense[]) => {
  return baseRequests.createRange<ILicense>(requestUrl, licenses);
};

const update = (license: ILicense) => {
  return baseRequests.update<ILicense>(requestUrl, license);
};

const remove = (id: string) => {
  return baseRequests.remove(requestUrl, id);
};

const removeRange = (ids: string[]) => {
  return baseRequests.removeRange(requestUrl, ids);
};

const filter = (queryFilters: QueryFilter[]) => {
  return baseRequests.filter<ILicense>(requestUrl, queryFilters);
};

const lookup = () => {
  return baseRequests.lookup(requestUrl, ["tag", "name"]);
};

const employeeCheckIn = async (
  checkInDto: EmployeeProductCheckInDto
): Promise<EmployeeProductDto> => {
  return (
    await request<EmployeeProductDto>({
      requestUrl: requestUrl + "checkin/employee",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as EmployeeProductDto;
};

const employeeCheckOut = async (
  checkOutDto: EmployeeProductCheckOutDto
): Promise<EmployeeProductDto[]> => {
  return (
    await request<EmployeeProductDto>({
      requestUrl: requestUrl + "checkout/employee",
      apiType: "post",
      queryData: checkOutDto,
    })
  ).data as EmployeeProductDto[];
};

const assetCheckIn = async (
  checkInDto: AssetProductCheckInDto
): Promise<AssetProductDto> => {
  return (
    await request<AssetProductDto>({
      requestUrl: requestUrl + "checkin/asset",
      apiType: "post",
      queryData: checkInDto,
    })
  ).data as AssetProductDto;
};

const assetCheckOut = async (
  checkOutDto: AssetProductCheckOutDto
): Promise<AssetProductDto[]> => {
  return (
    await request<AssetProductDto>({
      requestUrl: requestUrl + "checkout/asset",
      apiType: "post",
      queryData: checkOutDto,
    })
  ).data as AssetProductDto[];
};

export const licenseRequests = {
  getAll,
  get,
  create,
  createRange,
  update,
  remove,
  removeRange,
  filter,
  lookup,
  employeeCheckIn,
  assetCheckIn,
  employeeCheckOut,
  assetCheckOut,
};
