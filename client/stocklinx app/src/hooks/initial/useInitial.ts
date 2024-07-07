import { CategoryType, ProductStatusType } from "@/interfaces/enums";
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
import { getImage } from "@/utils/imageUtils";

export const useInitial = () => {
  const Accessory = (entity: IAccessory | undefined) => {
    let initialValues: IAccessory = {
      id: "",
      companyId: "",
      tag: "",
      name: "",
      manufacturerId: null,
      supplierId: null,
      categoryId: null,
      modelNo: "",
      quantity: 1,
      orderNo: null,
      purchaseCost: null,
      purchaseDate: null,
      notes: null,
      imagePath: null,
    };

    if (entity) {
      initialValues = { ...entity };
      initialValues.imagePath = getImage(entity.imagePath);
    }

    return initialValues;
  };

  const Asset = (entity: IAsset | undefined) => {
    let initialValues: IAsset = {
      id: "",
      companyId: "",
      productStatusId: "",
      supplierId: null,
      tag: "",
      name: "",
      imagePath: null,
      serialNo: null,
      orderNo: null,
      purchaseCost: null,
      purchaseDate: null,
      notes: null,
      modelId: null,
      overageAssets: [],
      quantity: 1,
    };

    if (entity) {
      initialValues = { ...entity };
      initialValues.imagePath = getImage(entity.imagePath);
    }

    return initialValues;
  };

  const Category = (entity: ICategory | undefined) => {
    let initialValues: ICategory = {
      id: "",
      type: CategoryType.ASSET,
      name: "",
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const Company = (entity: ICompany | undefined) => {
    let initialValues: ICompany = {
      id: "",
      tag: "",
      name: "",
      email: null,
      locationId: null,
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const Component = (entity: IComponent | undefined) => {
    let initialValues: IComponent = {
      id: "",
      companyId: "",
      tag: "",
      name: "",
      serialNo: null,
      orderNo: null,
      purchaseCost: null,
      purchaseDate: null,
      quantity: 1,
      categoryId: "",
      supplierId: null,
      notes: null,
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const Consumable = (entity: IConsumable | undefined) => {
    let initialValues: IConsumable = {
      id: "",
      companyId: "",
      tag: "",
      name: "",
      categoryId: "",
      manufacturerId: null,
      supplierId: null,
      itemNo: null,
      modelNo: null,
      orderNo: null,
      purchaseCost: null,
      purchaseDate: null,
      quantity: 1,
      notes: null,
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const Department = (entity: IDepartment | undefined) => {
    let initialValues: IDepartment = {
      id: "",
      companyId: "",
      locationId: null,
      name: "",
      notes: null,
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const License = (entity: ILicense | undefined) => {
    let initialValues: ILicense = {
      id: "",
      companyId: "",
      categoryId: "",
      tag: "",
      name: "",
      orderNo: null,
      purchaseCost: null,
      purchaseDate: null,
      notes: null,
      manufacturerId: null,
      supplierId: null,
      licenseKey: "",
      licenseEmail: null,
      licensedTo: null,
      maintained: false,
      reassignable: false,
      expirationDate: null,
      terminationDate: null,
      quantity: 1,
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const Location = (entity: ILocation | undefined) => {
    let initialValues: ILocation = {
      id: "",
      name: "",
      country: null,
      state: null,
      city: null,
      address: null,
      address2: null,
      currency: null,
      zipCode: null,
      notes: null,
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const Manufacturer = (entity: IManufacturer | undefined) => {
    let initialValues: IManufacturer = {
      id: "",
      name: "",
      url: null,
      supportURL: null,
      supportEmail: null,
      supportPhone: null,
      notes: null,
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const Model = (entity: IModel | undefined) => {
    let initialValues: IModel = {
      id: "",
      name: "",
      categoryId: "",
      fieldSetId: null,
      manufacturerId: null,
      modelNo: null,
      imagePath: null,
      modelFieldData: [],
      notes: null,
    };

    if (entity) {
      initialValues = { ...entity };
      initialValues.imagePath = getImage(entity.imagePath);
    }

    return initialValues;
  };

  const ProductStatus = (entity: IProductStatus | undefined) => {
    let initialValues: IProductStatus = {
      id: "",
      type: ProductStatusType.AVAILABLE,
      name: "",
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const Supplier = (entity: ISupplier | undefined) => {
    let initialValues: ISupplier = {
      id: "",
      locationId: null,
      name: "",
      contactName: null,
      contactPhone: null,
      contactEmail: null,
      website: null,
      fax: null,
      notes: null,
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const User = (entity: IUser | undefined) => {
    let initialValues: IUser = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      notes: null,
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const Employee = (entity: IEmployee | undefined) => {
    let initialValues: IEmployee = {
      id: "",
      departmentId: "",
      firstName: "",
      lastName: "",
      jobTitle: null,
      phoneNo: null,
      notes: null,
    };

    if (entity) {
      initialValues = { ...entity };
    }

    return initialValues;
  };

  const EmployeeProduct: IEmployeeProduct = {
    id: "",
    employeeId: "",
    accessoryId: null,
    assetId: null,
    licenseId: null,
    consumableId: null,
    productStatusId: "",
    assignDate: new Date(),
    notes: null,
    quantity: 1,
  };

  const AssetProduct: IAssetProduct = {
    id: "",
    componentId: null,
    assetId: "",
    licenseId: null,
    assignDate: new Date(),
    notes: null,
    quantity: 1,
  };

  return {
    Accessory,
    Asset,
    Category,
    Company,
    Component,
    Consumable,
    Department,
    License,
    Location,
    Manufacturer,
    Model,
    ProductStatus,
    Supplier,
    User,
    Employee,
    EmployeeProduct,
    AssetProduct,
  };
};
