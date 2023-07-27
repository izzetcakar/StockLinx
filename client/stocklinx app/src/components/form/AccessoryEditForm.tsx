import React, { useState } from 'react'
import { TextInput, Checkbox, Button, Group, Box, NumberInput, FileInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../redux/store';

interface AccessoryFormProps {
    submitFunc: (data: object) => void;
}

const AccessoryForm: React.FC<AccessoryFormProps> = ({
    submitFunc = () => console.log("submit"),
}) => {
    const [value, setValue] = useState<File | null>(null);
    const accessory = useAppSelector((state: RootState) => state.accessory.accessory);
    const form = useForm({
        initialValues: accessory || {
            categoryId: "",
            locationId: "",
            companyId: "",
            statusId: "",
            imagePath: "",
            name: "",
            serialNo: "",
            orderNo: "",
            purchaseCost: 0,
            purchaseDate: "",
            quantity: 0,
            checkInCounter: 0,
            checkOutCounter: 0,
        },
        validate: {
            name: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty'),
            quantity: (value: number) => {
                return value !== null && value >= 0 ? null : 'Quantity must be a non-negative number';
            },
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
                <FileInput label="Upload image" placeholder="Upload image" accept="image/png,image/jpeg" value={value} onChange={setValue} icon={<IconUpload size={rem(14)} />} />
                <Group position="right" mt="md">
                    <Button type="submit" color='dark'>Submit</Button>
                    <Button onClick={() => openNextModel()} color='dark'>Next Modal</Button>
                </Group>
            </form>
        </Box>
    )
}

export default AccessoryForm