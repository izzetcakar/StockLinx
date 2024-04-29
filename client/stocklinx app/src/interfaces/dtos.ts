export interface BaseDto {
  id: string;
  createdDate?: Date;
  updatedDate?: Date | null;
}

export interface IUserProductDto extends BaseDto {
  userId: string;
  productId: string;
  productType: string;
  productName: string;
  productRoute?: string | null;
  assignDate: Date;
  notes: string | null;
  quantity: number;
}
export interface IAssetProductDto extends BaseDto {
  assetId: string;
  productId: string;
  productType: string;
  productName: string;
  productRoute?: string | null;
  assignDate: Date;
  notes: string | null;
  quantity: number;
}
