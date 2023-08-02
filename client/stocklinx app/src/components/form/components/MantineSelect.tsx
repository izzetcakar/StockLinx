import React from 'react'
import { IMantinSelectProps, IMantineSelectData } from '../interfaces/interfaces'
import { Box, Group, LoadingOverlay, Select, Text } from '@mantine/core';
import { forwardRef } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

const MantineSelect: React.FC<IMantinSelectProps<T>> = (props) => {
    const { form, data, label, propTag, refreshData, loading } = props;

    const SelectItem = forwardRef<HTMLDivElement, IMantineSelectData>(
        ({ value, label, ...others }: IMantineSelectData, ref) => (
            <div ref={ref} {...others}>
                <Group noWrap>
                    {/* <Text size="sm">{value}</Text> */}
                    <Text size="xs" opacity={0.65}>
                        {label}
                    </Text>
                </Group>
            </div>
        )
    );

    const LoadingItem = () => (
        <Box w="100%" h="auto" py={20} >
            <LoadingOverlay visible={loading ? loading : false} />
        </Box>
    );

    const spareData: IMantineSelectData[] = [{ value: '', label: '' },];

    return (
        <Box pos="relative" key={propTag}>
            <Select
                label={label}
                placeholder="Pick one"
                data={loading ? spareData : data}
                {...form.getInputProps(propTag)}
                transitionProps={{
                    transition: "pop-top-left",
                    duration: 80,
                    timingFunction: "ease",
                }}
                itemComponent={loading ? LoadingItem : SelectItem}
                searchable
                clearable
                allowDeselect
                dropdownPosition="flip"
                nothingFound="No options"
                onDropdownOpen={refreshData}
                rightSection={<IconChevronDown size="1rem" />}
                styles={{ rightSection: { pointerEvents: 'none' } }}
            />
        </Box>
    )
}
export default MantineSelect;