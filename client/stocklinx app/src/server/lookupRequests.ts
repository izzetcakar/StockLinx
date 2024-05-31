import { IAsset } from "@/interfaces/serverInterfaces";
import { lookupRequest } from "./api";

export const lookupRequests = () => {
  const accessory = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["tag", "name"],
      valueKey: "id",
      requestUrl: "/accessory",
    });
  };

  const asset = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["tag", "name"],
      valueKey: "id",
      requestUrl: "/asset",
    });
  };

  const branch = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "/branch",
    });
  };

  const category = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "/category",
    });
  };

  const company = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "/company",
    });
  };

  const component = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["tag", "name"],
      valueKey: "id",
      requestUrl: "/component",
    });
  };

  const department = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "/department",
    });
  };

  const license = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["tag", "name"],
      valueKey: "id",
      requestUrl: "/license",
    });
  };

  const location = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "/location",
    });
  };

  const manufacturer = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "/manufacturer",
    });
  };

  const model = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "/model",
    });
  };

  const status = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "/productStatus",
    });
  };

  const supplier = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["name"],
      valueKey: "id",
      requestUrl: "/supplier",
    });
  };

  const user = async () => {
    return await lookupRequest<IAsset>({
      labelKeys: ["firstName", "lastName"],
      valueKey: "id",
      requestUrl: "/user",
    });
  };

  return {
    accessory,
    asset,
    branch,
    category,
    company,
    component,
    department,
    license,
    location,
    manufacturer,
    model,
    status,
    supplier,
    user,
  };
};
