export interface IMantineSelectData
  extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  label: string;
}
export interface IMantinSelectProps {
  data: IMantineSelectData[];
  value: string;
  label: string;
  propTag: string;
}
