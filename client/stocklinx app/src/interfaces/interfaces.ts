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
export enum ApiStatus {
  Idle,
  Success,
  Loading,
  Failed,
}
export interface SelectData {
  value: string;
  label: string;
}

//Server side interfaces
export interface BaseEntity {
  id: string;
  createdDate?: Date | null;
  updatedDate?: Date | null;
  deletedDate?: Date | null;
}
export interface IProductStatus extends BaseEntity {
  name: string;
}
interface IBaseProduct extends BaseEntity {
  categoryId: string | null;
  locationId: string | null;
  companyId: string | null;
  statusId: string | null;
  imagePath: string | null;
  name: string;
  serialNo: string | null;
  orderNo: string | null;
  notes: string | null;
  purchaseCost: number | null;
  purchaseDate: Date | null;
  checkInCounter?: number | null;
  checkOutCounter?: number | null;
}
export interface IAccessory extends IBaseProduct {
  manufacturerId: string | null;
  supplierId: string | null;
  quantity: number;
  warrantyDate: Date | null;
}
export interface IAsset extends IBaseProduct {
  manufacturerId: string | null;
  modelId: string | null;
  tagNo: string | null;
  overageAssets?:
    | [
        {
          serialNo: string;
          tagNo: string;
        }
      ]
    | null;
}
export interface IComponent extends IBaseProduct {
  quantity: number;
}
export interface ILicense extends IBaseProduct {
  supplierId: string | null;
  licenseKey: string;
  licenseEmail: string | null;
  maintained: boolean;
  reassignable: boolean;
  expirationDate: Date | null;
  terminationDate: Date | null;
}
export interface IConsumable extends IBaseProduct {
  modelNo: string | null;
  itemNo: string | null;
  tagNo: string | null;
  quantity: number;
}
export interface IModel extends BaseEntity {
  categoryId: string | null;
  manufacturerId: string | null;
  name: string;
  imagePath: string | null;
  modelNo: string | null;
  notes: string | null;
}
export interface ICategory extends BaseEntity {
  imagePath: string | null;
  name: string;
}
export interface ICompany extends BaseEntity {
  name: string;
  imagePath: string | null;
}
export interface IDepartment extends BaseEntity {
  companyId: string;
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
  name: string;
  imagePath: string | null;
  country: string;
  state: string | null;
  city: string;
  address: string | null;
  address2: string | null;
  zipCode: string | null;
  currency: string | null;
  notes: string | null;
}
export interface IManufacturer extends BaseEntity {
  name: string;
  imagePath: string | null;
  supportPhone: string | null;
  supportEmail: string | null;
  website: string | null;
}
export interface ISupplier extends BaseEntity {
  locationId: string | null;
  name: string;
  imagePath: string | null;
  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  website: string | null;
  fax: string | null;
  notes: string | null;
}
export interface IUser extends BaseEntity {
  imagePath: string | null;
  companyId: string;
  departmentId: string;
  locationId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo: string | null;
  language: string | null;
  jobTitle: string | null;
  website: string | null;
  startDate: Date;
  endDate: Date | null;
  notes: string | null;
}
export interface IUserLoginDto {
  email: string;
  password: string;
}
export interface IToken {
  token: string;
}
