import React, { useState } from 'react'
import { TextInput, Checkbox, Button, Group, Box, NumberInput, FileInput, rem, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useAppSelector } from '../../../../hooks';
import { RootState } from '../../../../redux/store';
import { toBase64 } from '../../../../functions/Image';

interface AssetEditFormProps {
    submitFunc: (data: object) => void;
}

const AssetEditForm: React.FC<AssetEditFormProps> = ({
    submitFunc = () => console.log("submit"),
}) => {
    const [value, setValue] = useState<File | null>(null);
    const asset = useAppSelector((state: RootState) => state.asset.asset);
    const form = useForm({
        initialValues: { ...asset } || {
            id: "",
            manufacturerId: "",
            modelId: "",
            notes: "",
            tagNo: "",
            createdDate: "",
            deletedDate: "",
            updatedDate: "",
            categoryId: "",
            locationId: "",
            companyId: "",
            statusId: "",
            imagePath: "",
            name: "",
            serialNo: "",
            orderNo: "",
            purchaseDate: "",
            purchaseCost: 0,
            checkInCounter: 0,
            checkOutCounter: 0,
        },
        validate: {
            name: (value: string | null | undefined) => { return value && (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty') },
            purchaseCost: (value: number | null | undefined) => {
                return value && value >= 0 ? null : 'PurchaseCost must be null or a non-negative number';
            },
            checkInCounter: (value: number | null | undefined) => {
                return value && value >= 0 ? null : 'CheckInCounter must be null or a non-negative number';
            },
            checkOutCounter: (value: number | null | undefined) => {
                return value && value >= 0 ? null : 'CheckOutCounter must be null or a non-negative number';
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
    const handleChangeImage = async (value: File | null) => {
        if (!value) return;
        const newImage = await toBase64(value);
        console.log(value);
        form.setFieldValue("imagePath", newImage as string);
    };
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
                    onChange={(value) => void handleChangeImage(value)}
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

export default AssetEditForm