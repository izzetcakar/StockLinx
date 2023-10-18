import { IProductCount } from "../../interfaces/interfaces";
import { request } from "../../server/api";

const requestUrl = "Generic/";

const getCounts = () => {
  return request<IProductCount>({
    requestUrl: requestUrl + "productCount",
    apiType: "get",
  });
};
const getStatusCounts = () => {
  return request<IProductCount>({
    requestUrl: requestUrl + "productStatus",
    apiType: "get",
  });
};

export const productRequests = {
  getCounts,
  getStatusCounts,
};
