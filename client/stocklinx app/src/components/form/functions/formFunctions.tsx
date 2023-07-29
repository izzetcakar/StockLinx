import { UseFormReturnType } from '@mantine/form/lib/types';
import { toBase64 } from '../../../functions/Image';
import { Box, Group, LoadingOverlay, Select, Text } from '@mantine/core';
import { forwardRef } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import MantineSelect from '../components/MantineSelect';

export const handleImageChange = async (form: UseFormReturnType<object>, value: File | null) => {
    if (!value) return;
    const newImage = await toBase64(value);
    console.log(value);
    form.setFieldValue("imagePath", newImage as string);
};


interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    value: string
    label: string;
}
export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ value, label, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <LoadingOverlay visible={false} />
                <div>
                    <Text size="sm">{value}</Text>
                    <Text size="xs" opacity={0.65}>
                        {label}
                    </Text>
                </div>

            </Group>
        </div>

    )
);

export const handleSelectComponent = (form: UseFormReturnType<object>, data: ItemProps[], label: string, propTag: string) => {
    return (
        <Box pos="relative">
            <Select
                label={label}
                placeholder="Pick one"
                data={data}
                {...form.getInputProps(propTag)}
                transitionProps={{
                    transition: "pop-top-left",
                    duration: 80,
                    timingFunction: "ease",
                }}
                itemComponent={SelectItem}
                searchable
                clearable
                allowDeselect
                dropdownPosition="flip"
                nothingFound="No options"
                rightSection={<IconChevronDown size="1rem" />}
                styles={{ rightSection: { pointerEvents: 'none' } }}
            />
        </Box>)
}