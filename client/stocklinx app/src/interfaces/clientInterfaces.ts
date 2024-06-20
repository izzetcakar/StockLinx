import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
  UserProductCheckInDto,
  UserProductCheckOutDto,
} from "./dtos";
import { Column, Filter } from "./gridTableInterfaces";

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
export interface TokenDto {
  token: string;
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
  onSubmit?: () => void;
}
export interface AssetProductCheckInPayload {
  checkInDto: AssetProductCheckInDto;
  onSubmit?: () => void;
}
export interface UserProductCheckInPayload {
  checkInDto: UserProductCheckInDto;
  onSubmit?: () => void;
}
export interface AssetProductCheckOutPayload {
  checkOutDto: AssetProductCheckOutDto;
  onSubmit?: () => void;
}
export interface UserProductCheckOutPayload {
  checkOutDto: UserProductCheckOutDto;
  onSubmit?: () => void;
}
export interface FilterInputProps {
  filter: Filter;
  setFilter: (value: any) => void;
  column: Column;
}
export interface EntityCardData {
  title: string;
  renderData: (e: any) => any;
}
