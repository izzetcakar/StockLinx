import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const getToken = () => {
  var userData = localStorage.getItem("token");
  if (userData === null) return "";
  var user = JSON.parse(userData);
  return user;
};
export const request = async ({ requestUrl, queryData, apiType }) => {
  var data, status, response;
  const axiosConfig = {
    headers: {
      "Access-Control-Allow-Private-Network": true,
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
        response = await axios.get(`${BASE_URL}${requestUrl}`, axiosConfig);
        break;
      case "delete":
        response = await axios.delete(`${BASE_URL}${requestUrl}`, axiosConfig);
        break;
      case "deleteAll":
        response = await axios.delete(`${BASE_URL}${requestUrl}`, axiosConfig);
        break;
      case "put":
        response = await axios.put(
          `${BASE_URL}${requestUrl}`,
          queryData,
          axiosConfig
        );
        break;
      case "post":
        response = await axios.post(
          `${BASE_URL}${requestUrl}`,
          queryData,
          axiosConfig
        );
        break;
      default:
        return;
    }
    data = response.data;
    status = response.status;
    switch (status) {
      case 200 || 201:
        return { data: data.data, message: "Success", success: true, status };
      case 204:
        return { data, message: "Login Error", success: true, status };
      default:
        return { data, message: "Api Error", success: true, status };
    }
  } catch (error) {
    const message = error.response ? error.response.data.errors[0] : null;
    if (message) {
      return { data: null, message: message, success: false, status };
    } else {
      switch (status) {
        case 400:
          return {
            data: null,
            message: `${status} - Bad Request. Message : ${error.response?.data}`,
            success: false,
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
            message: `${status} - Record already exist`,
            success: false,
            status,
          };
        default:
          return {
            data: null,
            message: "Network Error",
            success: false,
            status,
          };
      }
    }
  }
};
