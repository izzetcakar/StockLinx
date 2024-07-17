import { CategoryType } from "@/interfaces/enums";
import {
  accessoryRequests,
  assetRequests,
  categoryRequests,
  companyRequests,
  componentRequests,
  consumableRequests,
  customFieldRequests,
  departmentRequests,
  employeeRequests,
  licenseRequests,
  locationRequests,
  manufacturerRequests,
  modelRequests,
  supplierRequests,
  userRequests,
  assetProductRequests,
  employeeProductRequests,
} from "@requests";
import CustomStore from "devextreme/data/custom_store";

export const accessoryDataStore = new CustomStore({
  key: "id",
  load: () => {
    return accessoryRequests.getAll();
  },
  byKey: (key) => {
    return accessoryRequests.get(key);
  },
});

export const assetDataStore = new CustomStore({
  key: "id",
  load: () => {
    return assetRequests.getAll();
  },
  byKey: (key) => {
    return assetRequests.get(key);
  },
});

export const categoryDataStore = new CustomStore({
  key: "id",
  load: () => {
    return categoryRequests.getAll();
  },
  byKey: (key) => {
    return categoryRequests.get(key);
  },
});

export const filterCategoryDataStore = (type: CategoryType) =>
  new CustomStore({
    key: "id",
    load: async () => {
      const res = await categoryRequests.getAll();
      return res.filter((category) => category.type === type);
    },
    byKey: (key) => {
      return categoryRequests.get(key);
    },
  });

export const companyDataStore = new CustomStore({
  key: "id",
  load: () => {
    return companyRequests.getAll();
  },
  byKey: (key) => {
    return companyRequests.get(key);
  },
});

export const componentDataStore = new CustomStore({
  key: "id",
  load: () => {
    return componentRequests.getAll();
  },
  byKey: (key) => {
    return componentRequests.get(key);
  },
});

export const consumableDataStore = new CustomStore({
  key: "id",
  load: () => {
    return consumableRequests.getAll();
  },
  byKey: (key) => {
    return consumableRequests.get(key);
  },
});

export const customFieldDataStore = new CustomStore({
  key: "id",
  load: () => {
    return customFieldRequests.getAll();
  },
  byKey: (key) => {
    return customFieldRequests.get(key);
  },
});

export const departmentDataStore = new CustomStore({
  key: "id",
  load: () => {
    return departmentRequests.getAll();
  },
  byKey: (key) => {
    return departmentRequests.get(key);
  },
});

export const employeeDataStore = new CustomStore({
  key: "id",
  load: () => {
    return employeeRequests.getAll();
  },
  byKey: (key) => {
    return employeeRequests.get(key);
  },
});

export const licenseDataStore = new CustomStore({
  key: "id",
  load: () => {
    return licenseRequests.getAll();
  },
  byKey: (key) => {
    return licenseRequests.get(key);
  },
});

export const locationDataStore = new CustomStore({
  key: "id",
  load: () => locationRequests.getAll(),
  byKey: (key) => {
    return locationRequests.get(key);
  },
});

export const manufacturerDataStore = new CustomStore({
  key: "id",
  load: () => {
    return manufacturerRequests.getAll();
  },
  byKey: (key) => {
    return manufacturerRequests.get(key);
  },
});

export const modelDataStore = new CustomStore({
  key: "id",
  load: () => {
    return modelRequests.getAll();
  },
  byKey: (key) => {
    return modelRequests.get(key);
  },
});

export const supplierDataStore = new CustomStore({
  key: "id",
  load: () => {
    return supplierRequests.getAll();
  },
  byKey: (key) => {
    return supplierRequests.get(key);
  },
});

export const userDataStore = new CustomStore({
  key: "id",
  load: () => {
    return userRequests.getAll();
  },
  byKey: (key) => {
    return userRequests.get(key);
  },
});

export const assetProductDataStore = new CustomStore({
  key: "id",
  load: () => {
    return assetProductRequests.getAll();
  },
  byKey: (key) => {
    return assetProductRequests.get(key);
  },
});

export const employeeProductDataStore = new CustomStore({
  key: "id",
  load: () => {
    return employeeProductRequests.getAll();
  },
  byKey: (key) => {
    return employeeProductRequests.get(key);
  },
});
