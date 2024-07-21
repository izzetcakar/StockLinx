export interface BaseDto {
  id: string;
  createdDate?: Date;
  updatedDate?: Date | null;
}
export interface IUserLoginDto {
  email: string;
  password: string;
}
export interface TokenDto {
  token: string;
}
export interface EmployeeProductDto extends BaseDto {
  employeeId: string;
  accessoryId?: string;
  assetId?: string;
  consumableId?: string;
  licenseId?: string;
  productType: string;
  productTag: string;
  assignDate: Date;
  notes: string | null;
  quantity: number;
}
export interface AssetProductDto extends BaseDto {
  assetId: string;
  componentId?: string;
  licenseId?: string;
  productType: string;
  productTag: string;
  assignDate: Date;
  notes: string | null;
  quantity: number;
}
export interface EmployeeProductCheckInDto {
  employeeId: string;
  productId: string;
  assaignDate: Date;
  notes: string | null;
  quantity: number;
}
export interface AssetProductCheckInDto {
  assetId: string;
  productId: string;
  assaignDate: Date;
  notes: string | null;
  quantity: number;
}
export interface AssetCheckInDto {
  assetId: string;
  employeeId: string;
  productStatusId: string;
  assaignDate: Date;
  notes: string | null;
}
export interface EmployeeProductCheckOutDto {
  employeeId?: string;
  employeeProductId: string;
  quantity: number;
  notes: string | null;
}
export interface AssetProductCheckOutDto {
  assetId?: string;
  assetProductId: string;
  quantity: number;
  notes: string | null;
}
export interface AssetCheckOutDto {
  employeeId?: string;
  assetId: string;
  employeeProductId: string;
  productStatusId: string;
  notes: string | null;
}
