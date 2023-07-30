import { Group, LoadingOverlay, Text } from '@mantine/core';
import React, { forwardRef } from 'react'

const MantineSelectItem = () => {
    interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
        value: string
        label: string;
    }
    const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
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
    return (
        { SelectItem }
    )
}

export default MantineSelectItem
