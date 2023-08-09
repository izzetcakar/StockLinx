import React from 'react'
import { TextInput, Button, Group, NumberInput, FileInput, rem, Image, ScrollArea, Flex, Textarea, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { ILicense } from '../../../interfaces/interfaces';
import { handleImageChange } from '../../functions/formFunctions';
import { IMantinSelectProps } from '../../interfaces/interfaces';
import MantineSelect from '../../components/MantineSelect';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { useDispatch } from 'react-redux';
import { categoryActions } from '../../../redux/category/actions';
import { companyActions } from '../../../redux/company/actions';
import { locationActions } from '../../../redux/location/actions';
import { productStatusActions } from '../../../redux/productStatus/actions';
import { supplierActions } from '../../../redux/supplier/actions';
import { licenseActions } from '../../../redux/license/actions';

interface LicenseFormProps {
    license?: ILicense;
}

const LicenseForm: React.FC<LicenseFormProps> = ({
    license,
}) => {
    const dispatch = useDispatch();
    const categorySelectData = useSelector((state: RootState) => state.category.selectData);
    const categoryApiStatus = useSelector((state: RootState) => state.category.pending);
    const companySelectData = useSelector((state: RootState) => state.company.selectData);
    const companyApiStatus = useSelector((state: RootState) => state.company.pending);
    const supplierSelectData = useSelector((state: RootState) => state.supplier.selectData);
    const supplierApiStatus = useSelector((state: RootState) => state.supplier.pending);
    const locationSelectData = useSelector((state: RootState) => state.location.selectData);
    const locationApiStatus = useSelector((state: RootState) => state.location.pending);
    const productStatusSelectData = useSelector((state: RootState) => state.productStatus.selectData);
    const productStatusApiStatus = useSelector((state: RootState) => state.productStatus.pending);

    const form = useForm<ILicense>({
        initialValues: license ? { ...license } : {
            id: "",
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
        license ? dispatch(licenseActions.update({ license: data as ILicense })) :
            dispatch(licenseActions.create({ license: data as ILicense }));
        dispatch(licenseActions.getAll());
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
            refreshData: () => dispatch(categoryActions.getAll()),
            loading: categoryApiStatus,
        },
        {
            form: form,
            data: companySelectData,
            label: "Company",
            propTag: "companyId",
            refreshData: () => dispatch(companyActions.getAll()),
            loading: companyApiStatus,
        },
        {
            form: form,
            data: locationSelectData,
            label: "Location",
            propTag: "locationId",
            refreshData: () => dispatch(locationActions.getAll()),
            loading: locationApiStatus,
        },
        {
            form: form,
            data: productStatusSelectData,
            label: "Status",
            propTag: "statusId",
            refreshData: () => dispatch(productStatusActions.getAll()),
            loading: productStatusApiStatus,
        },
        {
            form: form,
            data: supplierSelectData,
            label: "Supplier",
            propTag: "supplierId",
            refreshData: () => dispatch(supplierActions.getAll()),
            loading: supplierApiStatus,
        },
    ]

    return (
        <ScrollArea.Autosize type="always" offsetScrollbars mah={600}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
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
                        value={form.values.licenseEmail || ""}
                    />
                    <TextInput
                        label="License Key"
                        placeholder="License Key"
                        {...form.getInputProps("licenseKey")}
                        value={form.values.licenseKey || ""}
                    />
                    <TextInput
                        label="Serial No"
                        placeholder="Serial No"
                        {...form.getInputProps("serialNo")}
                        value={form.values.serialNo || ""}
                    />
                    <TextInput
                        label="Order No"
                        placeholder="Order No"
                        {...form.getInputProps("orderNo")}
                        value={form.values.orderNo || ""}
                    />
                    <NumberInput
                        placeholder="Purchase Cost"
                        label="Purchase Cost"
                        {...form.getInputProps("purchaseCost")}
                        value={form.values.purchaseCost || ""}
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
                        checked={form.values.maintained || false}
                    />
                    <Checkbox
                        label="Reassignable"
                        {...form.getInputProps('reassignable', { type: 'checkbox' })}
                        checked={form.values.reassignable || false}
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
            </form >
        </ScrollArea.Autosize>
    );
}

export default LicenseForm