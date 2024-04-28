export enum ProductStatusType {
  AVAILABLE = 0,
  DEPLOYED = 1,
  ORDERED = 2,
  OUT_OF_STOCK = 3,
  DAMAGED = 4,
}
export enum CategoryType {
  ASSET = 0,
  LICENSE = 1,
  ACCESSORY = 2,
  CONSUMABLE = 3,
  COMPONENT = 4,
}
export interface BaseEntity {
  id: string;
  createdDate?: Date;
  updatedDate?: Date | null;
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
export interface IProductStatus extends BaseEntity {
  name: string;
  type: ProductStatusType;
}
export interface IBaseProduct extends BaseEntity {
  branchId: string;
  productStatusId: string | null;
  supplierId: string | null;
  name: string;
  orderNo: string | null;
  notes: string | null;
  purchaseCost: number | null;
  purchaseDate: Date | null;
  quantity: number;
  checkInCounter?: number | null;
  checkOutCounter?: number | null;
  availableQuantity?: number;
}
export interface IAccessory extends IBaseProduct {
  manufacturerId: string | null;
  categoryId: string | null;
  imagePath: string | null;
  modelNo: string;
}
export interface IAsset extends IBaseProduct {
  modelId: string | null;
  imagePath: string | null;
  tagNo: string | null;
  serialNo: string | null;
  overageAssets?: OverageAsset[];
}
export interface OverageAsset {
  serialNo: string;
  tagNo: string;
}
export interface IComponent extends IBaseProduct {
  categoryId: string | null;
  serialNo: string | null;
}
export interface ILicense extends IBaseProduct {
  categoryId: string | null;
  manufacturerId: string | null;
  licenseKey: string;
  licenseEmail: string | null;
  licensedTo: string | null;
  maintained: boolean;
  reassignable: boolean;
  expirationDate: Date | null;
  terminationDate: Date | null;
}
export interface IConsumable extends IBaseProduct {
  categoryId: string | null;
  manufacturerId: string | null;
  modelNo: string | null;
  itemNo: string | null;
}
export interface IModel extends BaseEntity {
  categoryId: string | null;
  manufacturerId: string | null;
  fieldSetId: string | null;
  name: string;
  imagePath: string | null;
  modelNo: string | null;
  modelFieldData: IModelFieldData[];
  notes: string | null;
}
export interface IFieldSet extends BaseEntity {
  name: string;
}
export interface ICustomField extends BaseEntity {
  name: string;
  type: string;
  isRequired: boolean;
  helpText: string | null;
  defaultValue: string | null;
  validationRegex: string | null;
  validationText: string | null;
  fieldSetCustomFields?: IFieldSetCustomField[];
}
export interface IModelFieldData extends BaseEntity {
  modelId: string;
  customFieldId: string;
  value: string;
}
export interface IFieldSetCustomField extends BaseEntity {
  fieldSetId: string;
  customFieldId: string;
}
export interface IDeployedProduct extends BaseEntity {
  userId: string;
  accessoryId: string | null;
  assetId: string | null;
  componentId: string | null;
  licenseId: string | null;
  consumableId: string | null;
  productStatusId: string | null;
  assignDate: Date | null;
  notes: string | null;
  quantity: number;
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
export interface IEntityCount {
  entityName: string;
  count: number;
}
export interface IProductStatusCount {
  status: string;
  count: number;
}
export interface IProductLocationCount {
  locationId: string;
  locationName: string;
  productCount: number;
  assignedCount: number;
}
export interface IProductCategoryCount {
  categoryId: string;
  categoryName: string;
  productName: string;
  productCount: number;
}
export interface ICustomLog {
  id: string;
  userId: string;
  itemId: string;
  targetId: string | null;
  date: Date;
  action: string;
  item: string;
  itemController: string;
  target: string | null;
  targetController: string | null;
}
export interface IPermission extends BaseEntity {
  companyId?: string;
  branchId: string;
  userId: string;
}