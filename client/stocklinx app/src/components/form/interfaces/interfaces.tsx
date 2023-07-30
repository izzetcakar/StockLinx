import { UseFormReturnType } from "@mantine/form";

export interface IMantineSelectData extends React.ComponentPropsWithoutRef<'div'> {
    value: string;
    label: string;
}
export interface IMantinSelectProps<T> {
    form: UseFormReturnType<T>;
    data: IMantineSelectData[];
    label: string;
    propTag: string;
}