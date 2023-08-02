import React from 'react'
import { TextInput, Button, Group, NumberInput, FileInput, rem, Image, ScrollArea, Flex, Textarea, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { ApiStatus, ILicense } from '../../../../interfaces/interfaces';
import { v4 as uuidv4 } from "uuid";
import { handleImageChange } from '../../functions/formFunctions';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { RootState } from '../../../../redux/store';
import { IMantinSelectProps } from '../../interfaces/interfaces';
import MantineSelect from '../../components/MantineSelect';
import { getAllCategories } from '../../../../redux/categoryReducer';
import { getAllCompanies } from '../../../../redux/companyReducer';
import { getAllLocations } from '../../../../redux/locationReducer';
import { getAllProductStatuses } from '../../../../redux/productStatusReducer';
import { getAllSuppliers } from '../../../../redux/supplierReducer';

interface LicenseFormProps {
    license?: ILicense;
    submitFunc: (data: object) => void;
}

const LicenseForm: React.FC<LicenseFormProps> = ({
    license,
    submitFunc = () => console.log("submit"),
}) => {
    const dispatch = useAppDispatch();
    const categorySelectData = useAppSelector((state: RootState) => state.category.selectData);
    const categoryApiStatus = useAppSelector((state: RootState) => state.category.status);
    const companySelectData = useAppSelector((state: RootState) => state.company.selectData);
    const companyApiStatus = useAppSelector((state: RootState) => state.company.status);
    const supplierSelectData = useAppSelector((state: RootState) => state.supplier.selectData);
    const supplierApiStatus = useAppSelector((state: RootState) => state.supplier.status);
    const locationSelectData = useAppSelector((state: RootState) => state.location.selectData);
    const locationApiStatus = useAppSelector((state: RootState) => state.location.status);
    const productStatusSelectData = useAppSelector((state: RootState) => state.productStatus.selectData);
    const productStatusApiStatus = useAppSelector((state: RootState) => state.productStatus.status);

    const form = useForm<ILicense>({
        initialValues: license ? { ...license } : {
            id: uuidv4(),
            categoryId: null,
            companyId: null,
            locationId: null,
            statusId: null,
            supplierId: null,
            name: "",
            imagePath: null,
            licenseEmail: null,
            licenseKey: "",
            orderNo: null,
            maintained: false,
            reassignable: false,
            serialNo: null,
            purchaseCost: null,
            purchaseDate: null,
            expirationDate: null,
            terminationDate: null,
            notes: null,
        },
        validate: {
            name: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty'),
            licenseEmail: (value) => (value && /^\S+@\S+$/.test(value) ? null : 'Invalid email'),
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

    const selectComponentData: IMantinSelectProps<ILicense>[] = [
        {
            form: form,
            data: categorySelectData,
            label: "Category",
            propTag: "categoryId",
            refreshData: () => dispatch(getAllCategories()),
            loading: categoryApiStatus === ApiStatus.Loading,
        },
        {
            form: form,
            data: companySelectData,
            label: "Company",
            propTag: "companyId",
            refreshData: () => dispatch(getAllCompanies()),
            loading: companyApiStatus === ApiStatus.Loading,
        },
        {
            form: form,
            data: locationSelectData,
            label: "Location",
            propTag: "locationId",
            refreshData: () => dispatch(getAllLocations()),
            loading: locationApiStatus === ApiStatus.Loading,
        },
        {
            form: form,
            data: productStatusSelectData,
            label: "Status",
            propTag: "statusId",
            refreshData: () => dispatch(getAllProductStatuses()),
            loading: productStatusApiStatus === ApiStatus.Loading,
        },
        {
            form: form,
            data: supplierSelectData,
            label: "Supplier",
            propTag: "supplierId",
            refreshData: () => dispatch(getAllSuppliers()),
            loading: supplierApiStatus === ApiStatus.Loading,
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
                    )}                    <TextInput
                        label="Name"
                        placeholder="New Name"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="License Email"
                        placeholder="License Email"
                        {...form.getInputProps("licenseEmail")}
                    />
                    <TextInput
                        label="License Key"
                        placeholder="License Key"
                        {...form.getInputProps("licenseKey")}
                    />
                    <TextInput
                        label="Serial No"
                        placeholder="Serial No"
                        {...form.getInputProps("serialNo")}
                    />
                    <TextInput
                        label="Model No"
                        placeholder="Model No"
                        {...form.getInputProps("modelNo")}
                    />
                    <TextInput
                        label="Item No"
                        placeholder="Item No"
                        {...form.getInputProps("itemNo")}
                    />
                    <TextInput
                        label="Tag No"
                        placeholder="Tag No"
                        {...form.getInputProps("tagNo")}
                    />
                    <TextInput
                        label="Order No"
                        placeholder="Order No"
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
                        label="Purchase Date"
                        placeholder="Purchase Date"
                        valueFormat="DD/MM/YYYY"
                        {...form.getInputProps("purchaseDate")}
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
                        label="Expiration Date"
                        placeholder="Expiration Date"
                        valueFormat="DD/MM/YYYY"
                        {...form.getInputProps("expirationDate")}
                    />
                    <DateInput
                        clearable
                        label="Termination Date"
                        placeholder="Termination Date"
                        valueFormat="DD/MM/YYYY"
                        {...form.getInputProps("terminationDate")}
                    />
                    <NumberInput
                        defaultValue={1}
                        min={1}
                        placeholder="Quantity"
                        label="Quantity"
                        {...form.getInputProps("quantity")}
                    />
                    <Checkbox
                        label="Maintained"
                        {...form.getInputProps('maintained', { type: 'checkbox' })}
                    />
                    <Checkbox
                        label="Reassignable"
                        {...form.getInputProps('reassignable', { type: 'checkbox' })}
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

export default LicenseForm