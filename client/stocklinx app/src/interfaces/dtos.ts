export interface BaseDto {
  id: string;
  createdDate?: Date;
  updatedDate?: Date | null;
}

export interface UserProductDto extends BaseDto {
  userId: string;
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
export interface UserProductCheckInDto {
  userId: string;
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
  userId: string;
  productStatusId: string;
  assaignDate: Date;
  notes: string | null;
}
export interface UserProductCheckOutDto {
  userId?: string;
  userProductId: string;
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
  userId?: string;
  userProductId: string;
  productStatusId: string;
  notes: string | null;
}
