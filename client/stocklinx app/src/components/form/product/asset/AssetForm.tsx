import React from 'react'
import { TextInput, Button, Group, NumberInput, FileInput, rem, Image, ScrollArea, Flex, Container, ActionIcon, Textarea, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconPlus, IconTrash, IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { ApiStatus, IAsset } from '../../../../interfaces/interfaces';
import { handleImageChange } from '../../functions/formFunctions';
import MantineSelect from '../../components/MantineSelect';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { IMantinSelectProps } from '../../interfaces/interfaces';
import { v4 as uuidv4 } from "uuid";
import { getAllManufacturers } from '../../../../redux/manufacturerReducer';
import { getAllModels } from '../../../../redux/modelReducer';
import { getAllCategories } from '../../../../redux/categoryReducer';

interface AssetFormProps {
    asset?: IAsset;
    submitFunc: (data: object) => void;
}

const AssetForm: React.FC<AssetFormProps> = ({
    asset,
    submitFunc = () => console.log("submit"),
}) => {
    const dispatch = useAppDispatch();
    const manufacturerSelectData = useAppSelector((state: RootState) => state.manufacturer.selectData);
    const manufacturerApiStatus = useAppSelector((state: RootState) => state.manufacturer.status);
    const modelSelectData = useAppSelector((state: RootState) => state.model.selectData);
    const modelApiStatus = useAppSelector((state: RootState) => state.model.status);
    const categorySelectData = useAppSelector((state: RootState) => state.category.selectData);
    const categoryApiStatus = useAppSelector((state: RootState) => state.category.status);
    const locationSelectData = useAppSelector((state: RootState) => state.location.selectData);
    const locationApiStatus = useAppSelector((state: RootState) => state.location.status);
    const companySelectData = useAppSelector((state: RootState) => state.company.selectData);
    const companyApiStatus = useAppSelector((state: RootState) => state.company.status);
    const productStatusSelectData = useAppSelector((state: RootState) => state.productStatus.selectData);
    const productStatusApiStatus = useAppSelector((state: RootState) => state.productStatus.status);

    const form = useForm<IAsset>({
        initialValues: asset ? { ...asset } : {
            id: uuidv4(),
            manufacturerId: null,
            modelId: null,
            notes: "",
            createdDate: null,
            deletedDate: null,
            updatedDate: null,
            categoryId: null,
            locationId: null,
            companyId: "",
            statusId: null,
            imagePath: "",
            name: "",
            orderNo: "",
            purchaseDate: null,
            purchaseCost: null,
            checkInCounter: null,
            checkOutCounter: null,
            serialNo: "",
            tagNo: "",
            overageAssets: null,
        },
        validate: {
            name: (value: string) =>
                /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
            purchaseCost: (value: number | null) => {
                if (value !== null || undefined) {
                    return value && value >= 0 ? null : 'Purchase cost must be a non-negative number';
                }
            },
        },
    });
    const overageAssetFields = form.values?.overageAssets?.map((_, index) => (
        <Group key={index} mt="xs">
            <Text mah="fit-content">{index + 1}. Asset</Text>
            <TextInput
                placeholder="Serial No"
                withAsterisk
                sx={{ flex: 1 }}
                {...form.getInputProps(`overageAssets.${index}.serialNo`)}
            />
            <TextInput
                placeholder="Tag No"
                withAsterisk
                sx={{ flex: 1 }}
                {...form.getInputProps(`overageAssets.${index}.tagNo`)}
            />
            <ActionIcon
                color="red"
                onClick={() => form.removeListItem("overageAssets", index)}
            >
                <IconTrash size="1rem" />
            </ActionIcon>
        </Group>
    ));

    const handleSubmit = (data: object) => {
        console.log(data);
        submitFunc(data);
        //closeModal("asset-create-modal");
    };
    const openNextModel = () =>
        modals.open({
            modalId: "next-modal",
            title: "Page 2",
            children: (
                <Button fullWidth onClick={() => closeModal("next-modal")} color="dark">
                    Back
                </Button>
            ),
        });

    const selectComponentData: IMantinSelectProps<IAsset>[] = [
        {
            form: form,
            data: manufacturerSelectData,
            label: "Manufacturer",
            propTag: "manufacturerId",
            refreshData: () => dispatch(getAllManufacturers()),
            loading: manufacturerApiStatus === ApiStatus.Loading,
        },
        {
            form: form,
            data: modelSelectData,
            label: "Model",
            propTag: "modelId",
            refreshData: () => dispatch(getAllModels()),
            loading: modelApiStatus === ApiStatus.Loading,
        },
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
            data: locationSelectData,
            label: "Location",
            propTag: "locationId",
            refreshData: () => dispatch(getAllLocations()),
            loading: locationApiStatus === ApiStatus.Loading,
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
            data: productStatusSelectData,
            label: "Status",
            propTag: "statusId",
            refreshData: () => dispatch(getAllProductStatuses()),
            loading: productStatusApiStatus === ApiStatus.Loading,
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
                    <Flex gap={10}>
                        <Container w="100%" px={0}>
                            <TextInput
                                label="Tag No"
                                placeholder="Tag No"
                                {...form.getInputProps("tagNo")}
                            />
                        </Container>
                        <Container size="1rem" px={0} mah={"100%"} maw={28}>
                            <ActionIcon
                                variant="default"
                                mt="100%"
                                onClick={() =>
                                    form.insertListItem("overageAssets", {
                                        serialNo: "",
                                        tagNo: "",
                                    })
                                }
                            >
                                <IconPlus size="1rem" />
                            </ActionIcon>
                        </Container>
                    </Flex>
                    <TextInput
                        label="Serial No"
                        placeholder="Serial No"
                        {...form.getInputProps("serialNo")}
                    />
                    {overageAssetFields}
                    <TextInput
                        label="Order No"
                        placeholder="New Order No"
                        {...form.getInputProps("orderNo")}
                    />
                    <DateInput
                        clearable
                        label="Purchase Date"
                        placeholder="Purchase Date"
                        valueFormat="DD/MM/YYYY"
                        {...form.getInputProps("purchaseDate")}
                    />
                    <NumberInput
                        placeholder="Purchase Cost"
                        label="Purchase Cost"
                        {...form.getInputProps("purchaseCost")}
                        value={form.values.purchaseCost ? form.values.purchaseCost : ""}
                        precision={2}
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

export default AssetForm