import SignCanva from "@/components/generic/SignCanva";
import AccessoryForm from "@/forms/accessory/AccessoryForm";
import AssetForm from "@/forms/asset/AssetForm";
import CategoryForm from "@/forms/category/CategoryForm";
import AssetCheckInForm from "@/forms/checkInOut/AssetCheckInForm";
import AssetCheckOutForm from "@/forms/checkInOut/AssetCheckOutForm";
import AssetProductCheckOutForm from "@/forms/checkInOut/AssetProductCheckOutForm";
import CheckInForm from "@/forms/checkInOut/CheckInForm";
import EmployeeProductCheckOutForm from "@/forms/checkInOut/EmployeeProductCheckOutForm";
import CompanyForm from "@/forms/company/CompanyForm";
import ComponentForm from "@/forms/component/ComponentForm";
import ConsumableForm from "@/forms/consumable/ConsumableForm";
import DepartmentForm from "@/forms/department/DepartmentForm";
import EmployeeForm from "@/forms/employee/EmployeeForm";
import LicenseForm from "@/forms/license/LicenseForm";
import LocationForm from "@/forms/location/LocationForm";
import ManufacturerForm from "@/forms/manufacturer/ManufacturerForm";
import ModelForm from "@/forms/model/ModelForm";
import PermissionForm from "@/forms/permission/PermissionForm";
import ProductStatusForm from "@/forms/productStatus/ProductStatusForm";
import SupplierForm from "@/forms/supplier/SupplierForm";
import UserForm from "@/forms/user/UserForm";
import { SubmissionFormProps } from "@/forms/submission/SubmissionForm";
import {
  AssetCheckInDto,
  AssetCheckOutDto,
  AssetProductCheckOutDto,
  EmployeeProductCheckOutDto,
} from "@/interfaces/dtos";
import {
  IAccessory,
  IAsset,
  IAssetProduct,
  ICategory,
  ICompany,
  IComponent,
  IConsumable,
  IDepartment,
  ILicense,
  ILocation,
  IManufacturer,
  IModel,
  IProductStatus,
  ISupplier,
  IUser,
  IEmployeeProduct,
  IEmployee,
} from "@/interfaces/serverInterfaces";
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

export const closeModal = (modalId: string) => modals.close(modalId);

const getCanBack = (modalId: string, canBack?: boolean) =>
  canBack ? { onBack: () => modals.close(modalId) } : {};

const getTitle = (entity: any, title: string) => {
  if (!entity) return "Create " + title;
  if (entity && entity?.id == "") return "Copy " + title;
  return "Update " + title;
};

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
    modalId: "category-modal",
    title: getTitle(category, "Category"),
    children: (
      <CategoryForm
        category={category}
        {...getCanBack("category-modal", canBack)}
      />
    ),
    size: "md",
  });

export const openCompanyModal = (company?: ICompany) =>
  modals.open({
    modalId: "company-modal",
    title: getTitle(company, "Company"),
    children: <CompanyForm company={company} />,
    size: "md",
  });

export const openDepartmentModal = (
  department?: IDepartment,
  canBack?: boolean
) =>
  modals.open({
    modalId: "department-modal",
    title: getTitle(department, "Department"),
    children: (
      <DepartmentForm
        department={department}
        {...getCanBack("department-modal", canBack)}
      />
    ),
    size: "lg",
  });

export const openLocationModal = (location?: ILocation, canBack?: boolean) =>
  modals.open({
    modalId: "location-modal",
    title: getTitle(location, "Location"),
    children: (
      <LocationForm
        location={location}
        {...getCanBack("location-modal", canBack)}
      />
    ),
    size: "lg",
  });

export const openManufacturerModal = (
  manufacturer?: IManufacturer,
  canBack?: boolean
) =>
  modals.open({
    modalId: "manufacturer-modal",
    title: getTitle(manufacturer, "Manufacturer"),
    children: (
      <ManufacturerForm
        manufacturer={manufacturer}
        {...getCanBack("manufacturer-modal", canBack)}
      />
    ),
    size: "lg",
  });

export const openModelModal = (model?: IModel, canBack?: boolean) =>
  modals.open({
    modalId: "model-modal",
    title: getTitle(model, "Model"),
    children: (
      <ModelForm model={model} {...getCanBack("model-modal", canBack)} />
    ),
  });

export const openAccessoryModal = (accessory?: IAccessory) =>
  modals.open({
    modalId: "accessory-modal",
    title: getTitle(accessory, "Accessory"),
    children: <AccessoryForm accessory={accessory} />,
  });

export const openAssetModal = (asset?: IAsset) =>
  modals.open({
    modalId: "asset-modal",
    title: getTitle(asset, "Asset"),
    children: <AssetForm asset={asset} />,
  });

export const openComponentModal = (component?: IComponent) =>
  modals.open({
    modalId: "component-modal",
    title: getTitle(component, "Component"),
    children: <ComponentForm component={component} />,
  });

export const openConsumableModal = (consumable?: IConsumable) =>
  modals.open({
    modalId: "consumable-modal",
    title: getTitle(consumable, "Consumable"),
    children: <ConsumableForm consumable={consumable} />,
  });

export const openLicenseModal = (license?: ILicense) =>
  modals.open({
    modalId: "license-modal",
    title: getTitle(license, "License"),
    children: <LicenseForm license={license} />,
  });

export const openProductStatusModal = (
  productStatus?: IProductStatus,
  canBack?: boolean
) =>
  modals.open({
    modalId: "productstatus-modal",
    title: getTitle(productStatus, "Product Status"),
    children: (
      <ProductStatusForm
        productStatus={productStatus}
        {...getCanBack("productstatus-modal", canBack)}
      />
    ),
    size: "md",
  });

export const openSupplierModal = (supplier?: ISupplier, canBack?: boolean) =>
  modals.open({
    modalId: "supplier-modal",
    title: getTitle(supplier, "Supplier"),
    children: (
      <SupplierForm
        supplier={supplier}
        {...getCanBack("asset-modal", canBack)}
      />
    ),
    size: "lg",
  });

export const openUserModal = (user?: IUser) =>
  modals.open({
    modalId: "user-modal",
    title: getTitle(user, "User"),
    children: <UserForm user={user} />,
    size: "xl",
  });

export const openEmployeeModal = (employee?: IEmployee) =>
  modals.open({
    modalId: "employee-modal",
    title: getTitle(employee, "Employee"),
    children: <EmployeeForm employee={employee} />,
    size: "xl",
  });

export const openCheckInModal = (
  companyId: string,
  segment: string[] = ["Employee"],
  employeeProduct?: IEmployeeProduct,
  employeeCheckIn?: (data: IEmployeeProduct) => void,
  assetProduct?: IAssetProduct,
  assetCheckIn?: (data: IAssetProduct) => void
) => {
  modals.open({
    modalId: "product-checkin-modal",
    title: "Check In",
    children: (
      <CheckInForm
        companyId={companyId}
        segment={segment}
        employeeProduct={employeeProduct}
        employeeCheckIn={employeeCheckIn}
        assetProduct={assetProduct}
        assetCheckIn={assetCheckIn}
      />
    ),
    size: "lg",
  });
};

export const openAssetCheckInModal = (checkInDto: AssetCheckInDto) => {
  modals.open({
    modalId: "asset-checkin-modal",
    title: "Check In",
    children: <AssetCheckInForm checkInDto={checkInDto} />,
    size: "lg",
  });
};

export const openAssetCheckOutModal = (checkOutDto: AssetCheckOutDto) => {
  modals.open({
    modalId: "asset-checkout-modal",
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
    modalId: "asset-product-checkout-modal",
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

export const openEmployeeProductCheckOutModal = (
  checkOutDto: EmployeeProductCheckOutDto,
  employeeCheckOut: (data: EmployeeProductCheckOutDto) => void
) => {
  modals.open({
    modalId: "employee-product-checkout-modal",
    title: "Check Out",
    children: (
      <EmployeeProductCheckOutForm
        checkOutDto={checkOutDto}
        employeeCheckOut={employeeCheckOut}
      />
    ),
    size: "lg",
  });
};

export const openPermissionModal = () => {
  modals.open({
    modalId: "permission-modal",
    title: "Permission",
    children: <PermissionForm />,
    size: "lg",
  });
};

export const openSignCanvaModal = (formProps: SubmissionFormProps) => {
  modals.open({
    modalId: "sign-canva-modal",
    children: <SignCanva formProps={formProps} />,
  });
};
