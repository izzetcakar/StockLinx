import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../interfaces/clientInterfaces";
import { LookupData } from "@/interfaces/gridTableInterfaces";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL as string;

export const getToken = (): string => {
  const token = localStorage.getItem("token");
  if (token === null || token === undefined) return "";
  return token;
};

export type BackendResponse<T> = {
  data: T | T[] | null;
  error: string | null;
  successMessage: string | null;
  status: number | null;
};
export interface ClientApiResponse<T> {
  data: T | T[] | null;
  message: string;
  success: boolean;
  status: number;
}
export interface ClientLookupResponse<T> {
  data: T[];
  message: string;
  success: boolean;
  status: number;
}

export const lookupRequest = async <T>({
  requestUrl,
  valueKey,
  labelKeys,
}: {
  requestUrl: string;
  valueKey: string;
  labelKeys: string[];
}): Promise<LookupData[]> => {
  let data: LookupData[] = [];
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      "Access-Control-Allow-Private-Network": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow__headers":
        "origin, content-type, accept, authorization",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${getToken()}`,
    },
  };
  try {
    const response = await axios.get<ClientLookupResponse<T>>(
      `${BASE_URL}${requestUrl}`,
      axiosConfig
    );
    let backendResponse: { [key: string]: any }[] = response.data.data as {
      [key: string]: any;
    }[];
    backendResponse = backendResponse.filter(
      (item) => item[valueKey] !== undefined
    );
    backendResponse = backendResponse.filter((item) =>
      labelKeys.every((key) => item[key] !== undefined)
    );
    data = backendResponse.map((item) => {
      return {
        value: item[valueKey],
        label: labelKeys.map((key) => item[key]).join("-"),
      };
    });
  } catch (error: any) {
    const message: string =
      (error.response?.data.error as string) ?? "Network Error";
    console.log("Error in lookupRequest: ", message);
    return [];
  }
  return data;
};

export const request = async <T>({
  requestUrl,
  apiType,
  queryData,
  params,
}: {
  requestUrl: string;
  apiType: "get" | "delete" | "put" | "post";
  // queryData?: T | T[] | string[] | null;
  queryData?: any;
  params?: any;
}): Promise<ApiResponse<T>> => {
  let data: T | T[] | null;
  let status: number;
  let backendResponse: BackendResponse<T>;
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      "Access-Control-Allow-Private-Network": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow__headers":
        "origin, content-type, accept, authorization",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `bearer ${getToken()}`,
    },
    data: queryData,
    params: params,
  };
  try {
    switch (apiType) {
      case "get": {
        const getResponse = await axios.get<BackendResponse<T>>(
          `${BASE_URL}${requestUrl}`,
          axiosConfig
        );
        backendResponse = getResponse.data;
        status = getResponse.status;
        break;
      }
      case "delete":
        {
          const deleteResponse = await axios.delete<BackendResponse<T>>(
            `${BASE_URL}${requestUrl}`,
            axiosConfig
          );
          backendResponse = deleteResponse.data;
          status = deleteResponse.status;
        }
        break;
      case "put": {
        const putResponse = await axios.put<BackendResponse<T>>(
          `${BASE_URL}${requestUrl}`,
          queryData,
          axiosConfig
        );
        backendResponse = putResponse.data;
        status = putResponse.status;
        break;
      }
      case "post": {
        const postResponse = await axios.post<BackendResponse<T>>(
          `${BASE_URL}${requestUrl}`,
          queryData,
          axiosConfig
        );
        backendResponse = postResponse.data;
        status = postResponse.status;
        break;
      }
      default:
        throw new Error("Invalid API type");
    }

    data = backendResponse.data;
    status = backendResponse.status || 200;

    const successMessage = backendResponse.successMessage;

    return {
      data,
      message: successMessage ? successMessage : "Success",
      success: true,
      status,
    };
  } catch (error: any) {
    const message: string =
      (error.response?.data.error as string) ?? "Network Error";
    status = error.response?.status ?? 500;
    throw new Error(message);
  }
};
