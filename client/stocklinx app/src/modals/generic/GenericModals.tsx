import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

export const genericConfirmModal = (onConfirm: () => void) => modals.openConfirmModal({
    title: 'Please confirm your action',
    children: (
        <Text size="sm">
            Do you want to delete this item?
        </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => onConfirm(),
});