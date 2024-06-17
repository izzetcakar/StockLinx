import { useAccessory } from "@/hooks/accessory";
import { useAsset } from "@/hooks/asset";
import { useBranch } from "@/hooks/branch";
import { useCategory } from "@/hooks/category";
import { useCompany } from "@/hooks/company";
import { useComponent } from "@/hooks/component";
import { useConsumable } from "@/hooks/consumable";
import { useCustomField } from "@/hooks/customField";
import { useDepartment } from "@/hooks/department";
import { useFieldSet } from "@/hooks/fieldSet";
import { useLicense } from "@/hooks/license";
import { useLocation } from "@/hooks/location";
import { useManufacturer } from "@/hooks/manufacturer";
import { useModel } from "@/hooks/model";
import { useProductStatus } from "@/hooks/productStatus";
import { useSupplier } from "@/hooks/supplier";
import { useUser } from "@/hooks/user";

const Accessory = (id: string | null) => {
  if (!id) return null;
  const { data: accessory } = useAccessory.Get(id);
  return <div>{accessory?.name || ""}</div>;
};

const Asset = (id: string | null) => {
  if (!id) return null;
  const { data: asset } = useAsset.Get(id);
  return <div>{asset?.name || ""}</div>;
};

const Branch = (id: string | null) => {
  if (!id) return null;
  const { data: branch } = useBranch.Get(id);
  return <div>{branch?.name || ""}</div>;
};

const Category = (id: string | null) => {
  if (!id) return null;
  const { data: category } = useCategory.Get(id);
  return <div>{category?.name || ""}</div>;
};

const Company = (id: string | null) => {
  if (!id) return null;
  const { data: company } = useCompany.Get(id);
  return <div>{company?.name || ""}</div>;
};

const Component = (id: string | null) => {
  if (!id) return null;
  const { data: component } = useComponent.Get(id);
  return <div>{component?.name || ""}</div>;
};

const Consumable = (id: string | null) => {
  if (!id) return null;
  const { data: consumable } = useConsumable.Get(id);
  return <div>{consumable?.name || ""}</div>;
};

const CustomField = (id: string | null) => {
  if (!id) return null;
  const { data: customField } = useCustomField.Get(id);
  return <div>{customField?.name || ""}</div>;
};

const Department = (id: string | null) => {
  if (!id) return null;
  const { data: department } = useDepartment.Get(id);
  return <div>{department?.name || ""}</div>;
};

const FieldSet = (id: string | null) => {
  if (!id) return null;
  const { data: fieldSet } = useFieldSet.Get(id);
  return <div>{fieldSet?.name || ""}</div>;
};

const License = (id: string | null) => {
  if (!id) return null;
  const { data: license } = useLicense.Get(id);
  return <div>{license?.name || ""}</div>;
};

const Location = (id: string | null) => {
  if (!id) return null;
  const { data: location } = useLocation.Get(id);
  return <div>{location?.name || ""}</div>;
};

const Manufacturer = (id: string | null) => {
  if (!id) return null;
  const { data: manufacturer } = useManufacturer.Get(id);
  return <div>{manufacturer?.name || ""}</div>;
};

const Model = (id: string | null) => {
  if (!id) return null;
  const { data: model } = useModel.Get(id);
  return <div>{model?.name || ""}</div>;
};

const ProductStatus = (id: string | null) => {
  if (!id) return null;
  const { data: productStatus } = useProductStatus.Get(id);

  return <div>{productStatus?.name || ""}</div>;
};

const Supplier = (id: string | null) => {
  if (!id) return null;
  const { data: supplier } = useSupplier.Get(id);
  return <div>{supplier?.name || ""}</div>;
};

const User = (id: string | null) => {
  if (!id) return null;
  const { data: user } = useUser.Get(id);
  return <div>{user?.firstName + user?.lastName || ""}</div>;
};

export const EntityCells = {
  Accessory,
  Asset,
  Branch,
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
};
