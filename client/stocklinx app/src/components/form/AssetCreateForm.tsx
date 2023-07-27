import React from 'react'
import { TextInput, Checkbox, Button, Group, Box, NumberInput, FileInput, ActionIcon, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';

interface AssetEditFormProps {
    submitFunc: (data: object) => void;
}

const AssetEditForm: React.FC<AssetEditFormProps> = ({
    submitFunc = () => console.log("submit"),
}) => {
    const form = useForm({
        initialValues: {
            id: uuidv4(),
            manufacturerId: null,
            modelId: null,
            notes: null,
            createdDate: null,
            deletedDate: null,
            updatedDate: null,
            categoryId: null,
            locationId: null,
            companyId: null,
            statusId: null,
            imagePath: null,
            name: "",
            orderNo: null,
            purchaseDate: null,
            purchaseCost: null,
            checkInCounter: null,
            checkOutCounter: null,
            overageAssets: [
                // {
                //     serialNo: "",
                //     tagNo: ""
                // }
            ]
        },
        validate: {
            name: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty'),
            purchaseCost: (value: number) => {
                return value >= 0 ? null : 'PurchaseCost must be null or a non-negative number';
            },
            checkInCounter: (value: number) => {
                return value >= 0 ? null : 'CheckInCounter must be null or a non-negative number';
            },
            checkOutCounter: (value: number) => {
                return value >= 0 ? null : 'CheckOutCounter must be null or a non-negative number';
            },
        },
    });
    const overageAssetFields = form.values.overageAssets.map((item, index) => (
        <Group key={index} mt="xs">
            <TextInput
                placeholder="New SerialNo"
                withAsterisk
                sx={{ flex: 1 }}
                {...form.getInputProps(`overageAssets.${index}.serialNo`)}
            />
            <TextInput
                placeholder="New TagNo"
                withAsterisk
                sx={{ flex: 1 }}
                {...form.getInputProps(`overageAssets.${index}.tagNo`)}
            />
            <ActionIcon color="red" onClick={() => form.removeListItem('overageAssets', index)}>
                <IconTrash size="1rem" />
            </ActionIcon>
        </Group>
    ));


    const handleSubmit = (data: object) => {
        console.log(data);
        submitFunc(data);
        closeModal("edit-modal");
    };
    const openNextModel = () => modals.open({
        modalId: 'next-modal',
        title: 'Page 2',
        children: (
            <Button fullWidth onClick={() => closeModal("next-modal")} color='dark'>Back</Button>
        ),
    });

    return (
        <Box maw="auto" mx="auto">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="Owner"
                    placeholder="New Owner"
                    {...form.getInputProps('Owner')}
                />
                <DateInput
                    clearable
                    label="LastCheck"
                    placeholder='New LastCheck'
                    valueFormat="DD/MM/YYYY HH:mm:ss"
                    {...form.getInputProps('LastCheck')} />
                <TextInput
                    label="OSversion"
                    placeholder="New OSversion"
                    {...form.getInputProps('OSversion')}
                />
                <Checkbox
                    mt="md"
                    label="Password Manager"
                    color='dark'
                    {...form.getInputProps('PasswordManager', { type: 'checkbox' })}
                />
                <Checkbox
                    mt="md"
                    label="AVinstalled"
                    color='dark'
                    {...form.getInputProps('AVinstalled', { type: 'checkbox' })}
                />
                <Checkbox
                    mt="md"
                    label="HDencrypted"
                    color='dark'
                    {...form.getInputProps('HDencrypted', { type: 'checkbox' })}
                />
                <NumberInput
                    defaultValue={0}
                    min={0}
                    placeholder="New Apllications"
                    label="Apllications"
                    {...form.getInputProps('Apllications')}
                />
                <FileInput label="Upload image" placeholder="Upload image" accept="image/png,image/jpeg" icon={<IconUpload size={rem(14)} />} />
                <Group position="right" mt="md">
                    <Button type="submit" color='dark'>Submit</Button>
                    <Button onClick={() => openNextModel()} color='dark'>Next Modal</Button>
                </Group>
            </form>
        </Box>
    )
}

export default AssetEditForm