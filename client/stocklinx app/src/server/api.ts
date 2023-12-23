import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../interfaces/interfaces";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL as string;

export const getToken = (): string => {
  const userData = localStorage.getItem("token");
  if (userData === null || userData === undefined) return "";
  const user = JSON.parse(userData) as string;
  return user;
};

export interface BackendResponse<T> {
  data: T | T[] | null;
  error: string | null;
  successMessage: string | null;
  statusCode: number | null;
}
export interface ClientApiResponse<T> {
  data: T | T[] | null;
  message: string;
  success: boolean;
  status: number;
}

export const request = async <T>({
  requestUrl,
  apiType,
  queryData,
}: {
  requestUrl: string;
  apiType: "get" | "delete" | "put" | "post";
  // queryData?: T | T[] | string[] | null;
  queryData?: any;
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
      Authorization: `Bearer ${getToken()}`,
    },
    data: queryData,
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
    status = backendResponse.statusCode || 200;

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

    switch (status) {
      case 400:
        return {
          data: null,
          message: `${message} - Bad Request. Message: ${
            error.response?.data ?? ""
          }`,
          success: false,
          status,
        };
      case 401:
        return {
          data: null,
          message: `${message} - Unauthorized`,
          success: false,
          status,
        };
      case 403:
        return {
          data: null,
          message: `${message} - Forbidden`,
          success: false,
          status,
        };
      case 404:
        return {
          data: null,
          message: `${message} - Page Not Found`,
          success: false,
          status,
        };
      case 408:
        return {
          data: null,
          message: `${message} - Timeout Error`,
          success: false,
          status,
        };
      case 409:
        return {
          data: null,
          message: `${message} - Record already exists`,
          success: false,
          status,
        };
      default:
        return {
          data: null,
          message,
          success: false,
          status,
        };
    }
  }
};
