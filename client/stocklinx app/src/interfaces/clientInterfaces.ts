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
export interface CheckInOutPayload {
  id: string;
  quantity: number;
}
export interface UserProductCheckInPayload {
  userId: string;
  productId: string;
  assaignDate: Date;
  notes: string | null;
  quantity: number;
}
export interface AssetProductCheckInPayload {
  assetId: string;
  productId: string;
  assaignDate: Date;
  notes: string | null;
  quantity: number;
}
export interface AssetCheckInPayload {
  assetId: string;
  userId: string;
  productStatusId: string;
  assaignDate: Date;
  notes: string | null;
}
export interface AssetCheckOutPayload {
  assetId: string;
  userProductId: string;
  productStatusId: string;
  notes: string | null;
}
