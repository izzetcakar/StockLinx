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

export interface IProductCheckInDto {
  userId: string;
  productId: string;
  assaignDate: Date;
  notes: string | null;
  quantity: number;
}
