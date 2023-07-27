//Client side interfaces
export enum LngType {
  Turkish,
  English,
}
export interface IDropdownData {
  id: number;
  text: string;
}
export interface VerifyPopupData {
  visible: boolean;
  confirmAction: () => Promise<void> | void;
}
export interface ApiResponse<T> {
  data: T[] | T | null;
  message: string;
  success: boolean;
  status?: number;
}

//Server side interfaces
interface BaseEntity {
  id: string;
  createdDate?: Date | null;
  updatedDate?: Date | null;
  deletedDate?: Date | null;
}
export interface IStatus extends BaseEntity {
  name: string;
}
interface IBaseProduct extends BaseEntity {
  categoryId: string | null;
  locationId: string | null;
  companyId: string | null;
  statusId: string;
  imagePath: string | null;
  name: string;
  serialNo: string | null;
  orderNo: string | null;
  notes: string | null;
  purchaseCost: number | null;
  purchaseDate: Date | null;
  checkInCounter: number | null;
  checkOutCounter: number | null;
}
export interface IAccessory extends IBaseProduct {
  quantity: number | null;
  manufacturerId: string | null;
  supplierId: string | null;
  warrantyDate: Date | null;
}
export interface IAsset extends IBaseProduct {
  manufacturerId: string | null;
  modelId: string | null;
  tagNo: string | null;
  overageAssets?: [
    {
      serialNo: string;
      tagNo: string;
    }
  ];
}
export interface IComponent extends IBaseProduct {}
export interface ILicense extends IBaseProduct {
  supplierId: string | null;
  licenseNo: string | null;
  licenseKey: string;
  licenseEmail: string | null;
  maintained: boolean;
  reaassignable: boolean;
  expirationDate: Date | null;
  terminationDate: Date | null;
  quantity: number | null;
}
export interface IConsumable extends IBaseProduct {
  modelNo: string | null;
  itemNo: string | null;
  tagNo: string | null;
  quantity: number | null;
}
export interface IModel extends BaseEntity {
  manufacturerId: string | null;
  categoryId: string | null;
  imagePath: string | null;
  name: string;
  modelNo: string | null;
  notes: string | null;
}
export interface ICategory extends BaseEntity {
  imagePath: string | null;
  name: string;
}
export interface ICompany extends BaseEntity {
  imagePath: string | null;
  name: string;
}
export interface IDepartment extends BaseEntity {
  companyId: string | null;
  locationId: string | null;
  managerId: string | null;
  imagePath: string | null;
  name: string;
  notes: string | null;
}
export interface IDeployedProduct extends BaseEntity {
  userId: string;
  accessoryId: string | null;
  assetId: string | null;
  componentId: string | null;
  licenseId: string | null;
  consumableId: string | null;
  deployedDate: Date | null;
  returnedDate: Date | null;
  notes: string | null;
}
export interface ILocation extends BaseEntity {
  imagePath: string | null;
  name: string;
  city: string | null;
  country: string | null;
  address: string | null;
  address2: string | null;
  zipCode: string | null;
  state: string | null;
  currency: string | null;
  notes: string | null;
}
export interface IManufacturer extends BaseEntity {
  imagePath: string | null;
  name: string;
  supportPhone: string | null;
  supportEmail: string | null;
  website: string | null;
}
export interface ISupplier extends BaseEntity {
  imagePath: string | null;
  locationId: string | null;
  name: string;
  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  website: string | null;
  notes: string | null;
  fax: string | null;
}
export interface IUser extends BaseEntity {
  imagePath: string | null;
  companyId: string | null;
  departmentId: string | null;
  locationId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string | null;
  language: string | null;
  jobTitle: string | null;
  website: string | null;
  startDate: Date | null;
  endDate: Date | null;
  notes: string | null;
}
