import React from 'react'
import { IMantinSelectProps, IMantineSelectData } from '../interfaces/interfaces'
import { useDisclosure } from '@mantine/hooks';
import { Box, Group, LoadingOverlay, Select, Text, FocusTrap, Button } from '@mantine/core';

const MantineSelect: React.FC<IMantinSelectProps<T>> = (props) => {
    const { form, data, label, propTag, refreshData, loading } = props;

    const SelectItem = React.forwardRef<HTMLDivElement, IMantineSelectData>(
        ({ label, ...others }: IMantineSelectData, ref) => (
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

    const LoadingItem = React.forwardRef<HTMLDivElement, IMantineSelectData>(
        ({ ...others }: IMantineSelectData, ref) => (
            <div ref={ref} {...others} style={{ backgroundColor: "white" }}>
                <Box w="100%" h="auto" py={20} >
                    <LoadingOverlay visible={loading ? loading : false} />
                </Box>
            </div>
        )
    );
    const dropDownOpenHandler = async () => {
        console.log(active);
        await refreshData();
        if (!loading) {
            toggle();
        }
        console.log(active);
    }

    const spareData: IMantineSelectData[] = [{ value: null, label: '' }];
    const [active, { toggle }] = useDisclosure(false);

    return (
        <Box pos="relative" key={propTag}>
            <FocusTrap active={active}>
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
                    clearable
                    itemComponent={loading ? LoadingItem : SelectItem}
                    allowDeselect
                    dropdownPosition="flip"
                    nothingFound="No options"
                    onDropdownOpen={dropDownOpenHandler}
                    onDropdownClose={toggle}
                    // rightSection={<IconChevronDown size="1rem" />}
                    // styles={{ rightSection: { pointerEvents: 'none' } }}
                    disabled={loading}
                />
            </FocusTrap>
        </Box>
    )
}
export default MantineSelect;
