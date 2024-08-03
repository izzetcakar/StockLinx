import {
  AssetProductCheckInDto,
  AssetProductCheckOutDto,
  EmployeeProductCheckInDto,
  EmployeeProductCheckOutDto,
} from "./dtos";
import { Column, Filter } from "./gridTableInterfaces";

export interface NavigationSubItem {
  title: string;
  target: string;
}
export interface NavigationItem {
  title: string;
  icon: string;
  subItems?: NavigationSubItem[];
  isExpanded?: boolean;
  target: string;
  onClick?: () => void;
}

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
  onSubmit?: () => void;
}
export interface AssetProductCheckInPayload {
  checkInDto: AssetProductCheckInDto;
  onSubmit?: () => void;
}
export interface EmployeeProductCheckInPayload {
  checkInDto: EmployeeProductCheckInDto;
  onSubmit?: () => void;
}
export interface AssetProductCheckOutPayload {
  checkOutDto: AssetProductCheckOutDto;
  onSubmit?: () => void;
}
export interface EmployeeProductCheckOutPayload {
  checkOutDto: EmployeeProductCheckOutDto;
  onSubmit?: () => void;
}
export interface FilterInputProps {
  filter: Filter;
  setFilter: (value: any) => void;
  column: Column;
}
export interface EntityCardColumn {
  title: string | ((e: any) => any);
  renderData: (e: any) => any;
}
