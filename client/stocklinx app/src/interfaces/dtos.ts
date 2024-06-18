export interface BaseDto {
  id: string;
  createdDate?: Date;
  updatedDate?: Date | null;
}

export interface UserProductDto extends BaseDto {
  userId: string;
  productId: string;
  productType: string;
  productTag: string;
  assignDate: Date;
  notes: string | null;
  quantity: number;
}
export interface AssetProductDto extends BaseDto {
  assetId: string;
  productId: string;
  productType: string;
  productName: string;
  productRoute?: string | null;
  assignDate: Date;
  notes: string | null;
  quantity: number;
}
export interface UserProductCheckOutDto {
  userProductId: string;
  productId: string;
  quantity: number;
  notes: string | null;
}
export interface AssetProductCheckOutDto {
  assetProductId: string;
  productId: string;
  quantity: number;
  notes: string | null;
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
export interface AssetCheckOutDto {
  assetId: string;
  userProductId: string;
  productStatusId: string;
  notes: string | null;
}
