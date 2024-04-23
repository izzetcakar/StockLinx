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
