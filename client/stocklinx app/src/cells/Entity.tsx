import {
  useAccessory,
  useAsset,
  useCategory,
  useCompany,
  useComponent,
  useConsumable,
  useCustomField,
  useDepartment,
  useFieldSet,
  useLicense,
  useLocation,
  useManufacturer,
  useModel,
  useProductStatus,
  useSupplier,
  useUser,
  useEmployee,
} from "@queryhooks";

const Accessory = (id: string | null) => {
  const { data: accessory } = useAccessory.Get(id || "");
  return <div>{accessory?.tag || ""}</div>;
};

const Asset = (id: string | null) => {
  const { data: asset } = useAsset.Get(id || "");
  return <div>{asset?.tag || ""}</div>;
};

const Category = (id: string | null) => {
  const { data: category } = useCategory.Get(id || "");
  return <div>{category?.name || ""}</div>;
};

const Company = (id: string | null) => {
  const { data: company } = useCompany.Get(id || "");
  return <div>{company?.name || ""}</div>;
};

const Component = (id: string | null) => {
  const { data: component } = useComponent.Get(id || "");
  return <div>{component?.tag || ""}</div>;
};

const Consumable = (id: string | null) => {
  const { data: consumable } = useConsumable.Get(id || "");
  return <div>{consumable?.tag || ""}</div>;
};

const CustomField = (id: string | null) => {
  const { data: customField } = useCustomField.Get(id || "");
  return <div>{customField?.name || ""}</div>;
};

const Department = (id: string | null) => {
  const { data: department } = useDepartment.Get(id || "");
  return <div>{department?.name || ""}</div>;
};

const FieldSet = (id: string | null) => {
  const { data: fieldSet } = useFieldSet.Get(id || "");
  return <div>{fieldSet?.name || ""}</div>;
};

const License = (id: string | null) => {
  const { data: license } = useLicense.Get(id || "");
  return <div>{license?.tag || ""}</div>;
};

const Location = (id: string | null) => {
  const { data: location } = useLocation.Get(id || "");
  return <div>{location?.name || ""}</div>;
};

const Manufacturer = (id: string | null) => {
  const { data: manufacturer } = useManufacturer.Get(id || "");
  return <div>{manufacturer?.name || ""}</div>;
};

const Model = (id: string | null) => {
  const { data: model } = useModel.Get(id || "");
  return <div>{model?.name || ""}</div>;
};

const ProductStatus = (id: string | null) => {
  const { data: productStatus } = useProductStatus.Get(id || "");

  return <div>{productStatus?.name || ""}</div>;
};

const Supplier = (id: string | null) => {
  const { data: supplier } = useSupplier.Get(id || "");
  return <div>{supplier?.name || ""}</div>;
};

const User = (id: string | null) => {
  const { data: user } = useUser.Get(id || "");
  return <div>{user?.firstName + user?.lastName || ""}</div>;
};

const Employee = (id: string | null) => {
  const { data: employee } = useEmployee.Get(id || "");
  return <div>{employee?.firstName + employee?.lastName || ""}</div>;
};

export const EntityCells = {
  Accessory,
  Asset,
  Category,
  Company,
  Component,
  Consumable,
  CustomField,
  Department,
  FieldSet,
  License,
  Location,
  Manufacturer,
  Model,
  ProductStatus,
  Supplier,
  User,
  Employee,
};
