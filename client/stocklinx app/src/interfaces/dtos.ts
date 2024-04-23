export interface BaseDto {
  id: string;
  createdDate?: Date;
  updatedDate?: Date | null;
}

export interface IDeployedProductDto extends BaseDto {
  userId: string;
  productId: string;
  productStatusId: string;
  productType: string;
  productName: string;
  productRoute?: string | null;
  assignDate: Date;
  notes: string | null;
  quantity: number;
}

export interface IAccessoryCheckInDto {
  userId: string;
  accessoryId: string;
  assaignDate: Date;
  notes: string | null;
}
export interface IAssetCheckInDto {
  userId: string;
  assetId: string;
  assaignDate: Date;
  notes: string | null;
}
export interface IComponentCheckInDto {
  userId: string;
  componentId: string;
  assaignDate: Date;
  notes: string | null;
}
export interface ILicenseCheckInDto {
  userId: string;
  licenseId: string;
  assaignDate: Date;
  notes: string | null;
}
export interface IConsumableCheckInDto {
  userId: string;
  consumableId: string;
  assaignDate: Date;
  notes: string | null;
}
