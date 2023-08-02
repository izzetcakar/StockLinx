import React from 'react'
import { TextInput, Button, Group, NumberInput, FileInput, rem, Image, ScrollArea, Flex, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { ApiStatus, IAccessory } from '../../../../interfaces/interfaces';
import { v4 as uuidv4 } from "uuid";
import { handleImageChange } from '../../functions/formFunctions';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { RootState } from '../../../../redux/store';
import { IMantinSelectProps } from '../../interfaces/interfaces';
import MantineSelect from '../../components/MantineSelect';
import { getAllManufacturers } from '../../../../redux/manufacturerReducer';
import { getAllSuppliers } from '../../../../redux/supplierReducer';
import { getAllCategories } from '../../../../redux/categoryReducer';
import { getAllLocations } from '../../../../redux/locationReducer';
import { getAllCompanies } from '../../../../redux/companyReducer';
import { getAllProductStatuses } from '../../../../redux/productStatusReducer';

interface AccessoryFormProps {
    accessory?: IAccessory;
    submitFunc: (data: object) => void;
}

const AccessoryForm: React.FC<AccessoryFormProps> = ({
    accessory,
    submitFunc = () => console.log("submit"),
}) => {
    const dispatch = useAppDispatch();
    const manufacturerSelectData = useAppSelector((state: RootState) => state.manufacturer.selectData);
    const manufacturerApiStatus = useAppSelector((state: RootState) => state.manufacturer.status);
    const supplierSelectData = useAppSelector((state: RootState) => state.supplier.selectData);
    const supplierApiStatus = useAppSelector((state: RootState) => state.supplier.status);
    const categorySelectData = useAppSelector((state: RootState) => state.category.selectData);
    const categoryApiStatus = useAppSelector((state: RootState) => state.category.status);
    const locationSelectData = useAppSelector((state: RootState) => state.location.selectData);
    const locationApiStatus = useAppSelector((state: RootState) => state.location.status);
    const companySelectData = useAppSelector((state: RootState) => state.company.selectData);
    const companyApiStatus = useAppSelector((state: RootState) => state.company.status);
    const productStatusSelectData = useAppSelector((state: RootState) => state.productStatus.selectData);
    const productStatusApiStatus = useAppSelector((state: RootState) => state.productStatus.status);

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
            quantity: 1,
            notes: "",
        },
        validate: {
            name: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty'),
            quantity: (value: number) => {
                return value >= 0 ? null : 'Quantity must be a non-negative number';
            },
            purchaseCost: (value: number | null) => {
                if (value !== null || undefined) {
                    return value && value >= 0 ? null : 'Purchase cost must be a non-negative number';
                }
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
            refreshData: () => dispatch(getAllManufacturers()),
            loading: manufacturerApiStatus === ApiStatus.Loading
        },
        {
            form: form,
            data: supplierSelectData,
            label: "Supplier",
            propTag: "supplierId",
            refreshData: () => dispatch(getAllSuppliers()),
            loading: supplierApiStatus === ApiStatus.Loading
        },
        {
            form: form,
            data: categorySelectData,
            label: "Category",
            propTag: "categoryId",
            refreshData: () => dispatch(getAllCategories()),
            loading: categoryApiStatus === ApiStatus.Loading
        },
        {
            form: form,
            data: locationSelectData,
            label: "Location",
            propTag: "locationId",
            refreshData: () => dispatch(getAllLocations()),
            loading: locationApiStatus === ApiStatus.Loading
        },
        {
            form: form,
            data: companySelectData,
            label: "Company",
            propTag: "companyId",
            refreshData: () => dispatch(getAllCompanies()),
            loading: companyApiStatus === ApiStatus.Loading
        },
        {
            form: form,
            data: productStatusSelectData,
            label: "Status",
            propTag: "statusId",
            refreshData: () => dispatch(getAllProductStatuses()),
            loading: productStatusApiStatus === ApiStatus.Loading
        },
    ]

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
            <ScrollArea type="auto">
                <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
                    {selectComponentData.map((selectData) =>
                        <MantineSelect
                            key={selectData.propTag}
                            form={selectData.form}
                            data={selectData.data}
                            label={selectData.label}
                            propTag={selectData.propTag}
                            refreshData={selectData?.refreshData}
                            loading={selectData?.loading}
                        />
                    )}
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
                        placeholder="Purchase Cost"
                        label="Purchase Cost"
                        {...form.getInputProps("purchaseCost")}
                        value={form.values.purchaseCost ? form.values.purchaseCost : ""}
                        precision={2}
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
                        value={form.values.notes || ""}
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