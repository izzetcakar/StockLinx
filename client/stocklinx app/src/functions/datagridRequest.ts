import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../server/api";
import { confirm } from "devextreme/ui/dialog";
import {
  RowInsertingEvent,
  RowRemovingEvent,
  RowUpdatingEvent,
} from "devextreme/ui/data_grid";
import { notifyError } from "./notifyError";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_BASE_URL as string;
const header = {
  "Access-Control-Allow-Private-Network": "true",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "origin, content-type, accept, authorization",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT",
  "Content-Type": "application/json; charset=utf-8",
  Authorization: `Bearer ${getToken()}`,
};

export const datagridRequest = async (
  e: RowInsertingEvent | RowUpdatingEvent | RowRemovingEvent,
  requestUrl: string,
  apiType: string,
  queryData?: object | object[]
) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: header,
    data: queryData,
  };

  const isCanceled = new Promise((resolve, reject) => {
    const promptPromise = confirm("Are you sure?", "Confirm changes");
    promptPromise.then(async (dialogResult) => {
      if (dialogResult) {
        try {
          switch (apiType) {
            case "get": {
              await axios.get(`${BASE_URL}${requestUrl}`, axiosConfig);
              break;
            }
            case "post": {
              await axios.post(
                `${BASE_URL}${requestUrl}`,
                queryData,
                axiosConfig
              );
              break;
            }
            case "put": {
              await axios.put(
                `${BASE_URL}${requestUrl}`,
                queryData,
                axiosConfig
              );
              break;
            }
            case "delete": {
              await axios.delete(`${BASE_URL}${requestUrl}`, axiosConfig);
              break;
            }
            default:
              reject("Invalid API type");
          }
          return resolve(false);
        } catch (err) {
          notifyError((err as Error).message);
          return resolve(true);
        }
      } else {
        return resolve(true);
      }
    });
  });
  e.cancel = isCanceled as boolean | PromiseLike<void>;
};
