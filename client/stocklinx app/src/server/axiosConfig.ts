import { AxiosRequestConfig } from "axios";
import { getToken } from "./api";

export const axiosConfig: AxiosRequestConfig = {
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
};
