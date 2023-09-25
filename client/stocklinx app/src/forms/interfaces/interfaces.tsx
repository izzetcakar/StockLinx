import { UseFormReturnType } from "@mantine/form";

export interface IMantineSelectData
  extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  label: string;
}
export interface IMantinSelectProps<T> {
  data: IMantineSelectData[];
  value: string;
  label: string;
  propTag: string;
  clearable?: boolean;
  form?: UseFormReturnType<T>;
}
