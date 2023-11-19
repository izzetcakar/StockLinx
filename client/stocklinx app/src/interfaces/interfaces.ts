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
export enum ProductStatusType {
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
export interface ICompany extends BaseEntity {
  locationId: string | null;
  name: string;
  email: string | null;
  imagePath: string | null;
}
export interface IBranch extends BaseEntity {
  companyId: string;
  locationId: string | null;
  name: string;
}
export interface IDepartment extends BaseEntity {
  companyId?: string;
  branchId: string;
  locationId: string | null;
  managerId: string | null;
  name: string;
  notes: string | null;
}
export interface ILocation extends BaseEntity {
  name: string;
  imagePath: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  address2: string | null;
  zipCode: string | null;
  currency: string | null;
  notes: string | null;
}
export interface ICategory extends BaseEntity {
  name: string;
  type: CategoryType;
}
export interface IBaseProduct extends BaseEntity {
  companyId?: string;
  branchId: string;
  name: string;
  imagePath: string | null;
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
  categoryId: string;
  modelNo: string;
  quantity: number;
}
export interface IAsset extends IBaseProduct {
  modelId: string | null;
  productStatusId: string;
  tagNo: string | null;
  serialNo: string | null;
  overageAssets?: OverageAsset[];
}
export interface OverageAsset {
  serialNo: string;
  tagNo: string;
}
export interface IComponent extends IBaseProduct {
  categoryId: string;
  supplierId: string | null;
  serialNo: string | null;
  quantity: number;
}
export interface ILicense extends IBaseProduct {
  categoryId: string;
  manufacturerId: string | null;
  supplierId: string | null;
  licenseKey: string;
  licenseEmail: string | null;
  licensedTo: string | null;
  maintained: boolean;
  reassignable: boolean;
  expirationDate: Date | null;
  terminationDate: Date | null;
  quantity: number;
}
export interface IConsumable extends IBaseProduct {
  categoryId: string;
  supplierId: string | null;
  manufacturerId: string | null;
  modelNo: string | null;
  itemNo: string | null;
  quantity: number;
}
export interface IModel extends BaseEntity {
  manufacturerId: string | null;
  categoryId: string;
  name: string;
  imagePath: string | null;
  modelNo: string | null;
  notes: string | null;
}
export interface IDeployedProduct extends BaseEntity {
  userId: string;
  accessoryId: string | null;
  assetId: string | null;
  componentId: string | null;
  licenseId: string | null;
  consumableId: string | null;
  assignDate: Date | null;
  notes: string | null;
}
export interface IManufacturer extends BaseEntity {
  name: string;
  imagePath: string | null;
  url: string | null;
  supportURL: string | null;
  supportPhone: string | null;
  supportEmail: string | null;
  notes: string | null;
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
  departmentId: string;
  employeeNo: string;
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
export interface IProductStatus extends BaseEntity {
  name: string;
  type: ProductStatusType;
}
