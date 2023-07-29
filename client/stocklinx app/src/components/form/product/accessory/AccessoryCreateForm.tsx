import React from 'react'
import { TextInput, Checkbox, Button, Group, Box, NumberInput, FileInput, rem, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { IAccessory } from '../../../../interfaces/interfaces';
import { v4 as uuidv4 } from "uuid";
import { handleImageChange } from '../../functions/formFunctions';

interface AccessoryCreateFormProps {
    submitFunc: (data: object) => void;
}

const AccessoryCreateForm: React.FC<AccessoryCreateFormProps> = ({
    submitFunc = () => console.log("submit"),
}) => {
    const form = useForm<IAccessory>({
        initialValues: {
            id: uuidv4(),
            manufacturerId: null,
            supplierId: null,
            categoryId: "",
            locationId: "",
            companyId: "",
            statusId: "",
            imagePath: "",
            name: "",
            serialNo: "",
            orderNo: "",
            purchaseCost: null,
            purchaseDate: null,
            warrantyDate: null,
            quantity: 0,
            notes: "",
        },
        validate: {
            name: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty'),
            quantity: (value: number) => {
                return value >= 0 ? null : 'Quantity must be a non-negative number';
            },
            purchaseCost: (value: number | null) => {
                return value === null || value >= 0 ? null : 'PurchaseCost must be null or a non-negative number';
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
                <FileInput
                    label="Upload image"
                    placeholder="Upload image"
                    accept="image/png,image/jpeg"
                    // value={form.getTransformedValues().imagePath}
                    onChange={(value) => void handleImageChange(form, value)}
                    icon={
                        <IconUpload size={rem(14)} {...form.getInputProps("imagePath")} />
                    }
                />
                <Image maw={240} mx="auto" radius="md" src={form.values.imagePath} alt="Random image" />
                <Group position="right" mt="md">
                    <Button type="submit" color='dark'>Submit</Button>
                    <Button onClick={() => openNextModel()} color='dark'>Next Modal</Button>
                </Group>
            </form>
        </Box>
    )
}

export default AccessoryCreateForm