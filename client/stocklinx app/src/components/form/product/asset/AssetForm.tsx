import React from 'react'
import { TextInput, Button, Group, NumberInput, FileInput, rem, Image, ScrollArea, Flex, Container, ActionIcon, Textarea, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconPlus, IconTrash, IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { IAsset } from '../../../../interfaces/interfaces';
import { handleImageChange } from '../../functions/formFunctions';
import MantineSelect from '../../components/MantineSelect';
import { RootState } from '../../../../redux/store';
import { useAppSelector } from '../../../../hooks';
import { IMantinSelectProps } from '../../interfaces/interfaces';
import { v4 as uuidv4 } from "uuid";

interface AssetFormProps {
    asset?: IAsset;
    submitFunc: (data: object) => void;
}

const AssetForm: React.FC<AssetFormProps> = ({
    asset,
    submitFunc = () => console.log("submit"),
}) => {
    const manufacturerSelectData = useAppSelector(
        (state: RootState) => state.manufacturer.selectData
    );
    const modelSelectData = useAppSelector(
        (state: RootState) => state.model.selectData
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
        },
        {
            form: form,
            data: modelSelectData,
            label: "Model",
            propTag: "modelId",
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
                    <Textarea
                        placeholder="Your notes here"
                        label="Note"
                        {...form.getInputProps("notes")}
                    />
                    <TextInput
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