import {
  IAccessory,
  IAsset,
  ICategory,
  ICompany,
  IComponent,
  IDepartment,
  ILicense,
  ILocation,
  IManufacturer,
  IModel,
  IProductStatus,
  ISupplier,
  IUser,
} from "@interfaces/serverInterfaces";
import { lookupRequest } from "./api";

export const lookupRequests = () => {
  const accessory = async () => {
    return await lookupRequest<IAccessory>({
      labelKeys: ["tag", "name"],
      valueKey: "id",
      requestUrl: "accessory",
    });
  };

  const asset = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["tag", "name"],
      valueKey: "id",
      requestUrl: "asset",
    });
  };

  const category = async () => {
    return await lookupRequest<ICategory>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "category",
    });
  };

  const company = async () => {
    return await lookupRequest<ICompany>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "company",
    });
  };

  const component = async () => {
    return await lookupRequest<IComponent>({
      labelKeys: ["tag", "name"],
      valueKey: "id",
      requestUrl: "component",
    });
  };

  const department = async () => {
    return await lookupRequest<IDepartment>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "department",
    });
  };

  const license = async () => {
    return await lookupRequest<ILicense>({
      labelKeys: ["tag", "name"],
      valueKey: "id",
      requestUrl: "license",
    });
  };

  const location = async () => {
    return await lookupRequest<ILocation>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "location",
    });
  };

  const manufacturer = async () => {
    return await lookupRequest<IManufacturer>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "manufacturer",
    });
  };

  const model = async () => {
    return await lookupRequest<IModel>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "model",
    });
  };

  const productStatus = async () => {
    return await lookupRequest<IProductStatus>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "productStatus",
    });
  };

  const supplier = async () => {
    return await lookupRequest<ISupplier>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "supplier",
    });
  };

  const user = async () => {
    return await lookupRequest<IUser>({
      labelKeys: ["firstName", "lastName"],
      valueKey: "id",
      requestUrl: "user",
    });
  };

  return {
    accessory,
    asset,
    category,
    company,
    component,
    department,
    license,
    location,
    manufacturer,
    model,
    productStatus,
    supplier,
    user,
  };
};
