import React from 'react'
import { TextInput, Button, Group, NumberInput, FileInput, rem, Image, ScrollArea, Flex, Container, ActionIcon, Textarea, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconPlus, IconTrash, IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { IAsset } from '../../../interfaces/interfaces';
import { handleImageChange } from '../../functions/formFunctions';
import MantineSelect from '../../components/MantineSelect';
import { IMantinSelectProps } from '../../interfaces/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { useDispatch } from 'react-redux';
import { manufacturerActions } from '../../../redux/manufacturer/actions';
import { modelActions } from '../../../redux/model/actions';
import { categoryActions } from '../../../redux/category/actions';
import { locationActions } from '../../../redux/location/actions';
import { companyActions } from '../../../redux/company/actions';
import { productStatusActions } from '../../../redux/productStatus/actions';
import { assetActions } from '../../../redux/asset/actions';

interface AssetFormProps {
    asset?: IAsset;
}

const AssetForm: React.FC<AssetFormProps> = ({
    asset,
}) => {
    const dispatch = useDispatch();
    const manufacturerSelectData = useSelector((state: RootState) => state.manufacturer.selectData);
    const manufacturerApiStatus = useSelector((state: RootState) => state.manufacturer.pending);
    const modelSelectData = useSelector((state: RootState) => state.model.selectData);
    const modelApiStatus = useSelector((state: RootState) => state.model.pending);
    const categorySelectData = useSelector((state: RootState) => state.category.selectData);
    const categoryApiStatus = useSelector((state: RootState) => state.category.pending);
    const locationSelectData = useSelector((state: RootState) => state.location.selectData);
    const locationApiStatus = useSelector((state: RootState) => state.location.pending);
    const companySelectData = useSelector((state: RootState) => state.company.selectData);
    const companyApiStatus = useSelector((state: RootState) => state.company.pending);
    const productStatusSelectData = useSelector((state: RootState) => state.productStatus.selectData);
    const productStatusApiStatus = useSelector((state: RootState) => state.productStatus.pending);

    const form = useForm<IAsset>({
        initialValues: asset ? { ...asset } : {
            id: "",
            manufacturerId: null,
            categoryId: null,
            locationId: null,
            companyId: "",
            statusId: null,
            modelId: null,
            notes: "",
            imagePath: "",
            name: "",
            orderNo: "",
            purchaseDate: null,
            purchaseCost: null,
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
                value={form.values.overageAssets?.find((_, arrIndex) => arrIndex === index)?.serialNo || ""}
            />
            <TextInput
                placeholder="Tag No"
                withAsterisk
                sx={{ flex: 1 }}
                {...form.getInputProps(`overageAssets.${index}.tagNo`)}
                value={form.values.overageAssets?.find((_, arrIndex) => arrIndex === index)?.tagNo || ""}
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
        asset ? dispatch(assetActions.update({ asset: data as IAsset })) :
            dispatch(assetActions.create({ asset: data as IAsset }));
        dispatch(assetActions.getAll());
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
            refreshData: () => dispatch(manufacturerActions.getAll()),
            loading: manufacturerApiStatus,
        },
        {
            form: form,
            data: modelSelectData,
            label: "Model",
            propTag: "modelId",
            refreshData: () => dispatch(modelActions.getAll()),
            loading: modelApiStatus,
        },
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
                    <Flex gap={10}>
                        <Container w="100%" px={0}>
                            <TextInput
                                label="Tag No"
                                placeholder="Tag No"
                                {...form.getInputProps("tagNo")}
                                value={form.values.tagNo || ""}
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
                        value={form.values.serialNo || ""}
                    />
                    {overageAssetFields}
                    <TextInput
                        label="Order No"
                        placeholder="New Order No"
                        {...form.getInputProps("orderNo")}
                        value={form.values.orderNo || ""}
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
                        value={form.values.purchaseCost || ""}
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
            </form >
        </ScrollArea.Autosize>
    );
}

export default AssetForm