//Client side interfaces
export enum LngType {
  TURKISH,
  ENGLISH,
}
export enum ApiStatus {
  IDLE,
  SUCCESS,
  LOADING,
  FAILED,
}
export enum ProductStatus {
  AVAILABLE,
  DEPLOYED,
  ORDERED,
  OUT_OF_STOCK,
  DAMAGED,
}
export enum CategoryType {
  ASSET,
  LICENSE,
  ACCESSORY,
  CONSUMABLE,
  COMPONENT,
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
export interface SelectData {
  value: string;
  label: string;
}
export interface IdentifiableItem {
  id: string;
  name: string;
}

//Server side interfaces
export interface BaseEntity {
  id: string;
  createdDate?: Date;
  updatedDate?: Date | null;
  deletedDate?: Date | null;
}
export interface IBaseProduct extends BaseEntity {
  categoryId: string | null;
  locationId: string | null;
  companyId: string | null;
  productStatus: ProductStatus;
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
  modelNo: string | null;
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
  manufacturerId: string | null;
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
  name: string;
  type: CategoryType;
  imagePath: string | null;
}
export interface ICompany extends BaseEntity {
  name: string;
  email: string | null;
  imagePath: string | null;
}
export interface IDepartment extends BaseEntity {
  name: string;
  companyId: string;
  managerId: string | null;
  imagePath: string | null;
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
  url: string | null;
  supportUrl: string | null;
  supportPhone: string | null;
  supportEmail: string | null;
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

export interface ILocationCounts {
  locationId: string;
  locationName: string;
  productId: string;
  productCount: number;
  assignedCount: number;
  userCount: number;
}
export interface ICategoryCounts {
  categoryId: string;
  categoryName: string;
  assetCount: number;
  licenseCount: number;
  accessoryCount: number;
  consumableCount: number;
  componentCount: number;
}
export interface IProductCount {
  entityName: string;
  count: number;
}
export interface IProductStausCount {
  status: string;
  count: number;
}
