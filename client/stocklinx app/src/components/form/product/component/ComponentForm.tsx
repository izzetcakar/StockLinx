import React from 'react'
import { TextInput, Button, Group, NumberInput, FileInput, rem, Image, ScrollArea, Flex, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { IComponent } from '../../../../interfaces/interfaces';
import { handleImageChange } from '../../functions/formFunctions';
import { IMantinSelectProps } from '../../interfaces/interfaces';
import MantineSelect from '../../components/MantineSelect';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/rootReducer';
import { useDispatch } from 'react-redux';
import { categoryActions } from '../../../../redux/category/actions';
import { locationActions } from '../../../../redux/location/actions';
import { companyActions } from '../../../../redux/company/actions';
import { productStatusActions } from '../../../../redux/productStatus/actions';
import { componentActions } from '../../../../redux/component/actions';

interface ComponentFormProps {
    component?: IComponent;
}

const ComponentForm: React.FC<ComponentFormProps> = ({
    component,
}) => {
    const dispatch = useDispatch();
    const categorySelectData = useSelector((state: RootState) => state.category.selectData);
    const categoryApiStatus = useSelector((state: RootState) => state.category.pending);
    const locationSelectData = useSelector((state: RootState) => state.location.selectData);
    const locationApiStatus = useSelector((state: RootState) => state.location.pending);
    const companySelectData = useSelector((state: RootState) => state.company.selectData);
    const companyApiStatus = useSelector((state: RootState) => state.company.pending);
    const productStatusSelectData = useSelector((state: RootState) => state.productStatus.selectData);
    const productStatusApiStatus = useSelector((state: RootState) => state.productStatus.pending);

    const form = useForm<IComponent>({
        initialValues: component ? { ...component } : {
            id: "",
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
            quantity: 0,
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
        component ? dispatch(componentActions.update({ component: data as IComponent })) :
            dispatch(componentActions.create({ component: data as IComponent }));
        dispatch(componentActions.getAll());
    };
    const openNextModel = () => modals.open({
        modalId: 'next-modal',
        title: 'Page 2',
        children: (
            <Button fullWidth onClick={() => closeModal("next-modal")} color='dark'>Back</Button>
        ),
    });

    const selectComponentData: IMantinSelectProps<IComponent>[] = [
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
            data: locationSelectData,
            label: "Location",
            propTag: "locationId",
            refreshData: () => dispatch(locationActions.getAll()),
            loading: locationApiStatus,
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
            data: productStatusSelectData,
            label: "Status",
            propTag: "statusId",
            refreshData: () => dispatch(productStatusActions.getAll()),
            loading: productStatusApiStatus,
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
                        label="Serial No"
                        placeholder="Serial No"
                        {...form.getInputProps("serialNo")}
                        value={form.values.serialNo || ""}
                    />
                    <TextInput
                        label="Order No"
                        placeholder="New Order No"
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
            </form >
        </ScrollArea.Autosize>
    );
}

export default ComponentForm