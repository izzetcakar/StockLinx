import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import {
  IAccessory,
  IAsset,
  IBranch,
  ICategory,
  ICompany,
  IComponent,
  IConsumable,
  ICustomField,
  IDepartment,
  IDeployedProduct,
  IFieldSet,
  ILicense,
  ILocation,
  IManufacturer,
  IModel,
  IProductStatus,
  ISupplier,
  IUser,
} from "../interfaces/interfaces";
import CategoryForm from "../forms/category/CategoryForm";
import BranchForm from "../forms/branch/BranchForm";
import CompanyForm from "../forms/company/CompanyForm";
import DepartmentForm from "../forms/department/DepartmentForm";
import LocationForm from "../forms/location/LocationForm";
import ManufacturerForm from "../forms/manufacturer/ManufacturerForm";
import ModelForm from "../forms/model/ModelForm";
import AccessoryForm from "../forms/product/accessory/AccessoryForm";
import AssetForm from "../forms/product/asset/AssetForm";
import ComponentForm from "../forms/product/component/ComponentForm";
import ConsumableForm from "../forms/product/consumable/ConsumableForm";
import LicenseForm from "../forms/product/license/LicenseForm";
import ProductStatusForm from "../forms/productStatus/ProductStatusForm";
import SupplierForm from "../forms/supplier/SupplierForm";
import UserForm from "../forms/user/UserForm";
import FieldSetForm from "../forms/fieldSet/FieldSetForm";
import CustomFieldForm from "../forms/customField/CustomFieldForm";
import CheckInForm from "../forms/deployedProduct/CheckInForm";

export const genericConfirmModal = (onConfirm: () => void) =>
  modals.openConfirmModal({
    title: "Please confirm your action",
    children: <Text size="sm">Do you want to delete this item?</Text>,
    labels: { confirm: "Confirm", cancel: "Cancel" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => onConfirm(),
  });
export const openCategoryModal = (category?: ICategory) =>
  modals.open({
    modalId: "category-modal",
    title: category ? "Edit Category" : "Create Category",
    children: <CategoryForm category={category} />,
    xOffset: "auto",
    size: "auto",
  });
export const openBranchModal = (branch?: IBranch) =>
  modals.open({
    modalId: "branch-modal",
    title: branch ? "Edit Branch" : "Create Branch",
    children: <BranchForm branch={branch} />,
    xOffset: "auto",
    size: "auto",
  });
export const openCompanyModal = (company?: ICompany) =>
  modals.open({
    modalId: "company-modal",
    title: company ? "Update Company" : "Create Company",
    children: <CompanyForm company={company} />,
    xOffset: "auto",
    size: "auto",
  });
export const openDepartmentModal = (department?: IDepartment) =>
  modals.open({
    modalId: "department-modal",
    title: department ? "Update Department" : "Create Department",
    children: <DepartmentForm department={department} />,
    xOffset: "auto",
    size: "auto",
  });
export const openLocationModal = (location?: ILocation) =>
  modals.open({
    modalId: "location-modal",
    title: location ? "Edit Location" : "Update Location",
    children: <LocationForm location={location} />,
    xOffset: "auto",
    size: "auto",
  });
export const openManufacturerModal = (manufacturer?: IManufacturer) =>
  modals.open({
    modalId: "manufacturer-modal",
    title: manufacturer ? "Update Manufacturer" : "Create Manufacturer",
    children: <ManufacturerForm manufacturer={manufacturer} />,
    xOffset: "auto",
    size: "auto",
  });
export const openModelModal = (model?: IModel) =>
  modals.open({
    modalId: "model-modal",
    title: model ? "Update Model" : "Create Model",
    children: <ModelForm model={model} />,
    xOffset: "auto",
    size: "auto",
  });
export const openAccessoryModal = (accessory?: IAccessory) =>
  modals.open({
    modalId: "accessory-modal",
    title: accessory ? "Update Accessory" : "Create Accessory",
    children: <AccessoryForm accessory={accessory} />,
    xOffset: "auto",
    size: "auto",
  });
export const openAssetModal = (asset?: IAsset) =>
  modals.open({
    modalId: "asset-modal",
    title: asset ? "Update Asset" : "Create Asset",
    children: <AssetForm asset={asset} />,
    xOffset: "auto",
    size: "auto",
  });
export const openComponentModal = (component?: IComponent) =>
  modals.open({
    modalId: "component-modal",
    title: component ? "Update Component" : "Create Component",
    children: <ComponentForm component={component} />,
    xOffset: "auto",
    size: "auto",
  });
export const openConsumableModal = (consumable?: IConsumable) =>
  modals.open({
    modalId: "consumable-modal",
    title: consumable ? "Update Consumable" : "Create Consumable",
    children: <ConsumableForm consumable={consumable} />,
    xOffset: "auto",
    size: "auto",
  });
export const openLicenseModal = (license?: ILicense) =>
  modals.open({
    modalId: "license-modal",
    title: license ? "Update License" : "Create License",
    children: <LicenseForm license={license} />,
    xOffset: "auto",
    size: "auto",
  });
export const openProductStatusModal = (productStatus?: IProductStatus) =>
  modals.open({
    modalId: "productStatus-modal",
    title: productStatus ? "Update ProductStatus" : "Create ProductStatus",
    children: <ProductStatusForm productStatus={productStatus} />,
    xOffset: "auto",
    size: "auto",
  });
export const openSupplierModal = (supplier?: ISupplier) =>
  modals.open({
    modalId: "supplier-modal",
    title: supplier ? "Update Supplier" : "Create Supplier",
    children: <SupplierForm supplier={supplier} />,
    xOffset: "auto",
    size: "auto",
  });
export const openUserModal = (user?: IUser) =>
  modals.open({
    modalId: "user-modal",
    title: user ? "Update User" : "Create User",
    children: <UserForm user={user} />,
    xOffset: "auto",
    size: "auto",
  });
export const openFieldSetModal = (fieldSet?: IFieldSet) => {
  modals.open({
    modalId: "fieldSet-modal",
    title: fieldSet ? "Update FieldSet" : "Create FieldSet",
    children: <FieldSetForm fieldSet={fieldSet} />,
    xOffset: "auto",
    size: "auto",
  });
};
export const openCustomFieldModal = (customField?: ICustomField) => {
  modals.open({
    modalId: "customField-modal",
    title: customField ? "Update CustomField" : "Create CustomField",
    children: <CustomFieldForm customField={customField} />,
    xOffset: "auto",
    size: "auto",
  });
};
export const openCheckInModal = (deployedProduct: IDeployedProduct) => {
  modals.open({
    modalId: "checkIn-modal",
    title: "Check In",
    children: <CheckInForm deployedProduct={deployedProduct} />,
    xOffset: "auto",
    size: "auto",
  });
};
