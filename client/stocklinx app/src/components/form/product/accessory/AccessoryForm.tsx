import React from 'react'
import { TextInput, Checkbox, Button, Group, Box, NumberInput, FileInput, rem, Image, ScrollArea, Flex, Textarea, Container, ActionIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconPlus, IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { IAccessory } from '../../../../interfaces/interfaces';
import { v4 as uuidv4 } from "uuid";
import { handleImageChange } from '../../functions/formFunctions';
import { useAppSelector } from '../../../../hooks';
import { RootState } from '../../../../redux/store';
import { IMantinSelectProps } from '../../interfaces/interfaces';
import MantineSelect from '../../components/MantineSelect';

interface AccessoryFormProps {
    accessory?: IAccessory;
    submitFunc: (data: object) => void;
}

const AccessoryForm: React.FC<AccessoryFormProps> = ({
    accessory,
    submitFunc = () => console.log("submit"),
}) => {
    const manufacturerSelectData = useAppSelector(
        (state: RootState) => state.manufacturer.selectData
    );
    const supplierSelectData = useAppSelector(
        (state: RootState) => state.supplier.selectData
    );
    const categorySelectData = useAppSelector(
        (state: RootState) => state.category.selectData
    );
    const locationSelectData = useAppSelector(
        (state: RootState) => state.location.selectData
    );
    const companySelectData = useAppSelector(
        (state: RootState) => state.company.selectData
    );
    const productStatusSelectData = useAppSelector(
        (state: RootState) => state.productStatus.selectData
    );

    const form = useForm<IAccessory>({
        initialValues: accessory ? { ...accessory } : {
            id: uuidv4(),
            manufacturerId: null,
            supplierId: null,
            categoryId: "",
            locationId: "",
            companyId: "",
            statusId: "",
            name: "",
            imagePath: "",
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

    const selectComponentData: IMantinSelectProps<IAccessory>[] = [
        {
            form: form,
            data: manufacturerSelectData,
            label: "Manufacturer",
            propTag: "manufacturerId",
        },
        {
            form: form,
            data: supplierSelectData,
            label: "Supplier",
            propTag: "supplierId",
        },
        {
            form: form,
            data: categorySelectData,
            label: "Category",
            propTag: "categoryId",
        },
        {
            form: form,
            data: locationSelectData,
            label: "Location",
            propTag: "locationId",
        },
        {
            form: form,
            data: companySelectData,
            label: "Company",
            propTag: "companyId",
        },
        {
            form: form,
            data: productStatusSelectData,
            label: "Status",
            propTag: "statusId",
        },
    ]

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
            <ScrollArea type="auto">
                <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
                    {selectComponentData.map((item) => <MantineSelect form={item.form} data={item.data} label={item.label} propTag={item.propTag} key={item.propTag} />)}
                    <TextInput
                        label="Name"
                        placeholder="New Name"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Serial No"
                        placeholder="Serial No"
                        {...form.getInputProps("serialNo")}
                    />
                    <TextInput
                        label="Order No"
                        placeholder="New Order No"
                        {...form.getInputProps("orderNo")}
                    />
                    <NumberInput
                        defaultValue={0}
                        min={0}
                        placeholder="Purchase Cost"
                        label="Purchase Cost"
                        {...form.getInputProps("purchaseCost")}
                    />
                    <DateInput
                        clearable
                        label="Purchase Date"
                        placeholder="Purchase Date"
                        valueFormat="DD/MM/YYYY"
                        {...form.getInputProps("purchaseDate")}
                    />
                    <DateInput
                        clearable
                        label="Warranty Date"
                        placeholder="Warranty Date"
                        valueFormat="DD/MM/YYYY"
                        {...form.getInputProps("warrantyDate")}
                    />
                    <NumberInput
                        defaultValue={1}
                        min={1}
                        placeholder="Quantity"
                        label="Quantity"
                        {...form.getInputProps("quantity")}
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
                    <Textarea
                        placeholder="Your notes here"
                        label="Note"
                        {...form.getInputProps("notes")}
                    />
                    <Group position="right" mt="md">
                        <Button type="submit" color="dark">
                            Submit
                        </Button>
                        <Button onClick={() => openNextModel()} color="dark">
                            Next Modal
                        </Button>
                    </Group>
                </Flex>
            </ScrollArea>
        </form >
    );
}

export default AccessoryForm