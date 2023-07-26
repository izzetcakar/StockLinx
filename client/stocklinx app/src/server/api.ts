import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL as string;

interface ApiResponse<T> {
  data: T | null;
  message: string;
  success: boolean;
  status?: number;
}

const getToken = (): string => {
  var userData = localStorage.getItem("token");
  if (userData === null) return "";
  var user = JSON.parse(userData);
  return user;
};

export const request = async <T>({
  requestUrl,
  apiType,
  queryData,
}: {
  requestUrl: string;
  apiType: "get" | "delete" | "deleteAll" | "put" | "post";
  queryData?: any;
}): Promise<ApiResponse<T>> => {
  let data: T | null, status: number, response: AxiosResponse<T>;
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      "Access-Control-Allow-Private-Network": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers":
        "origin, content-type, accept, authorization",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${getToken()}`,
    },
    data: queryData,
  };
  try {
    switch (apiType) {
      case "get":
        response = await axios.get<T>(`${BASE_URL}${requestUrl}`, axiosConfig);
        break;
      case "delete":
        response = await axios.delete<T>(
          `${BASE_URL}${requestUrl}`,
          axiosConfig
        );
        break;
      case "deleteAll":
        response = await axios.delete<T>(
          `${BASE_URL}${requestUrl}`,
          axiosConfig
        );
        break;
      case "put":
        response = await axios.put<T>(
          `${BASE_URL}${requestUrl}`,
          queryData,
          axiosConfig
        );
        break;
      case "post":
        response = await axios.post<T>(
          `${BASE_URL}${requestUrl}`,
          queryData,
          axiosConfig
        );
        break;
      default:
        throw new Error("Invalid API type");
    }
    data = response.data;
    status = response.status;
    switch (status) {
      case 200 || 201:
        return {
          data: data as T,
          message: "Success",
          success: true,
          status,
        };
      case 204:
        return { data: null, message: "Login Error", success: true, status };
      default:
        return { data: null, message: "Api Error", success: true, status };
    }
  } catch (error: any) {
    const message = error.response?.data.errors[0] ?? "Network Error";
    status = error.response?.status ?? 500;
    switch (status) {
      case 400:
        return {
          data: null,
          message: `${status} - Bad Request. Message: ${
            error.response?.data ?? ""
          }`,
          success: false,
          status,
        };
      case 401:
        return {
          data: null,
          message: `${status} - Unauthorized`,
          success: false,
          status,
        };
      case 403:
        return {
          data: null,
          message: `${status} - Forbidden`,
          success: false,
          status,
        };
      case 404:
        return {
          data: null,
          message: `${status} - Page Not Found`,
          success: false,
          status,
        };
      case 408:
        return {
          data: null,
          message: `${status} - Timeout Error`,
          success: false,
          status,
        };
      case 409:
        return {
          data: null,
          message: `${status} - Record already exists`,
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
