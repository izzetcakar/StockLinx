import AccessoryForm from "@/forms/accessory/AccessoryForm";
import AssetForm from "@/forms/asset/AssetForm";
import CategoryForm from "@/forms/category/CategoryForm";
import AssetCheckInForm from "@/forms/checkInOut/AssetCheckInForm";
import AssetCheckOutForm from "@/forms/checkInOut/AssetCheckOutForm";
import AssetProductCheckOutForm from "@/forms/checkInOut/AssetProductCheckOutForm";
import CheckInForm from "@/forms/checkInOut/CheckInForm";
import UserProductCheckOutForm from "@/forms/checkInOut/UserProductCheckOutForm";
import CompanyForm from "@/forms/company/CompanyForm";
import ComponentForm from "@/forms/component/ComponentForm";
import ConsumableForm from "@/forms/consumable/ConsumableForm";
import CustomFieldForm from "@/forms/customField/CustomFieldForm";
import DepartmentForm from "@/forms/department/DepartmentForm";
import FieldSetForm from "@/forms/fieldSet/FieldSetForm";
import LicenseForm from "@/forms/license/LicenseForm";
import LocationForm from "@/forms/location/LocationForm";
import ManufacturerForm from "@/forms/manufacturer/ManufacturerForm";
import ModelForm from "@/forms/model/ModelForm";
import PermissionForm from "@/forms/permission/PermissionForm";
import ProductStatusForm from "@/forms/productStatus/ProductStatusForm";
import SupplierForm from "@/forms/supplier/SupplierForm";
import UserForm from "@/forms/user/UserForm";
import {
  AssetCheckInDto,
  AssetCheckOutDto,
  AssetProductCheckOutDto,
  UserProductCheckOutDto,
} from "@/interfaces/dtos";
import {
  IAccessory,
  IAsset,
  IAssetProduct,
  ICategory,
  ICompany,
  IComponent,
  IConsumable,
  ICustomField,
  IDepartment,
  IFieldSet,
  ILicense,
  ILocation,
  IManufacturer,
  IModel,
  IProductStatus,
  ISupplier,
  IUser,
  IUserProduct,
} from "@/interfaces/serverInterfaces";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

export const closeModal = (modalId: string) => modals.close(modalId);

const getCanBack = (modalId: string, canBack?: boolean) =>
  canBack ? { onBack: () => modals.close(modalId) } : {};

export const genericConfirmModal = (onConfirm: () => void) =>
  modals.openConfirmModal({
    title: "Please confirm your action",
    children: <Text size="sm">Do you want to delete this item?</Text>,
    labels: { confirm: "Confirm", cancel: "Cancel" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => onConfirm(),
  });

export const openCategoryModal = (category?: ICategory, canBack?: boolean) =>
  modals.open({
    modalId: "category_modal",
    title: category ? "Edit Category" : "Create Category",
    children: (
      <CategoryForm
        category={category}
        {...getCanBack("category_modal", canBack)}
      />
    ),
    size: "md",
  });

export const openCompanyModal = (company?: ICompany) =>
  modals.open({
    modalId: "company_modal",
    title: company ? "Update Company" : "Create Company",
    children: <CompanyForm company={company} />,
    size: "md",
  });

export const openDepartmentModal = (
  department?: IDepartment,
  canBack?: boolean
) =>
  modals.open({
    modalId: "department_modal",
    title: department ? "Update Department" : "Create Department",
    children: (
      <DepartmentForm
        department={department}
        {...getCanBack("department_modal", canBack)}
      />
    ),
    size: "lg",
  });

export const openLocationModal = (location?: ILocation, canBack?: boolean) =>
  modals.open({
    modalId: "location_modal",
    title: location ? "Update Location" : "Create Location",
    children: (
      <LocationForm
        location={location}
        {...getCanBack("location_modal", canBack)}
      />
    ),
    size: "lg",
  });

export const openManufacturerModal = (
  manufacturer?: IManufacturer,
  canBack?: boolean
) =>
  modals.open({
    modalId: "manufacturer_modal",
    title: manufacturer ? "Update Manufacturer" : "Create Manufacturer",
    children: (
      <ManufacturerForm
        manufacturer={manufacturer}
        {...getCanBack("manufacturer_modal", canBack)}
      />
    ),
    size: "lg",
  });

export const openModelModal = (model?: IModel) =>
  modals.open({
    modalId: "model_modal",
    title: model ? "Update Model" : "Create Model",
    children: <ModelForm model={model} />,
  });

export const openAccessoryModal = (accessory?: IAccessory) =>
  modals.open({
    modalId: "accessory_modal",
    title: accessory ? "Update Accessory" : "Create Accessory",
    children: <AccessoryForm accessory={accessory} />,
  });

export const openAssetModal = (asset?: IAsset) =>
  modals.open({
    modalId: "asset_modal",
    title: asset ? "Update Asset" : "Create Asset",
    children: <AssetForm asset={asset} />,
  });

export const openComponentModal = (component?: IComponent) =>
  modals.open({
    modalId: "component_modal",
    title: component ? "Update Component" : "Create Component",
    children: <ComponentForm component={component} />,
  });

export const openConsumableModal = (consumable?: IConsumable) =>
  modals.open({
    modalId: "consumable_modal",
    title: consumable ? "Update Consumable" : "Create Consumable",
    children: <ConsumableForm consumable={consumable} />,
  });

export const openLicenseModal = (license?: ILicense) =>
  modals.open({
    modalId: "license_modal",
    title: license ? "Update License" : "Create License",
    children: <LicenseForm license={license} />,
  });

export const openProductStatusModal = (
  productStatus?: IProductStatus,
  canBack?: boolean
) =>
  modals.open({
    modalId: "productStatus_modal",
    title: productStatus ? "Update ProductStatus" : "Create ProductStatus",
    children: (
      <ProductStatusForm
        productStatus={productStatus}
        {...getCanBack("productStatus_modal", canBack)}
      />
    ),
    size: "md",
  });

export const openSupplierModal = (supplier?: ISupplier, canBack?: boolean) =>
  modals.open({
    modalId: "supplier_modal",
    title: supplier ? "Update Supplier" : "Create Supplier",
    children: (
      <SupplierForm
        supplier={supplier}
        {...getCanBack("asset_modal", canBack)}
      />
    ),
    size: "lg",
  });

export const openUserModal = (user?: IUser) =>
  modals.open({
    modalId: "user_modal",
    title: user ? "Update User" : "Create User",
    children: <UserForm user={user} />,
    size: "xl",
  });

export const openFieldSetModal = (fieldSet?: IFieldSet) => {
  modals.open({
    modalId: "fieldSet_modal",
    title: fieldSet ? "Update FieldSet" : "Create FieldSet",
    children: <FieldSetForm fieldSet={fieldSet} />,
  });
};

export const openCustomFieldModal = (customField?: ICustomField) => {
  modals.open({
    modalId: "customField_modal",
    title: customField ? "Update CustomField" : "Create CustomField",
    children: <CustomFieldForm customField={customField} />,
  });
};

export const openCheckInModal = (
  segment: string[] = ["User"],
  userProduct?: IUserProduct,
  userCheckIn?: (data: IUserProduct) => void,
  assetProduct?: IAssetProduct,
  assetCheckIn?: (data: IAssetProduct) => void
) => {
  modals.open({
    modalId: "product_checkIn_modal",
    title: "Check In",
    children: (
      <CheckInForm
        segment={segment}
        userProduct={userProduct}
        userCheckIn={userCheckIn}
        assetProduct={assetProduct}
        assetCheckIn={assetCheckIn}
      />
    ),
    size: "lg",
  });
};

export const openAssetCheckInModal = (checkInDto: AssetCheckInDto) => {
  modals.open({
    modalId: "asset_checkIn_modal",
    title: "Check In",
    children: <AssetCheckInForm checkInDto={checkInDto} />,
  });
};

export const openAssetCheckOutModal = (checkOutDto: AssetCheckOutDto) => {
  modals.open({
    modalId: "asset_checkOut_modal",
    title: "Check Out",
    children: <AssetCheckOutForm checkOutDto={checkOutDto} />,
    size: "lg",
  });
};

export const openAssetProductCheckOutModal = (
  checkOutDto: AssetProductCheckOutDto,
  assetCheckOut: (data: AssetProductCheckOutDto) => void
) => {
  modals.open({
    modalId: "asset_product_checkOut_modal",
    title: "Check Out",
    children: (
      <AssetProductCheckOutForm
        checkOutDto={checkOutDto}
        assetCheckOut={assetCheckOut}
      />
    ),
    size: "lg",
  });
};

export const openUserProductCheckOutModal = (
  checkOutDto: UserProductCheckOutDto,
  userCheckOut: (data: UserProductCheckOutDto) => void
) => {
  modals.open({
    modalId: "user_product_checkOut_modal",
    title: "Check Out",
    children: (
      <UserProductCheckOutForm
        checkOutDto={checkOutDto}
        userCheckOut={userCheckOut}
      />
    ),
    size: "lg",
  });
};

export const openPermissionModal = () => {
  modals.open({
    modalId: "permission_modal",
    title: "Permission",
    children: <PermissionForm />,
    size: "lg",
  });
};
