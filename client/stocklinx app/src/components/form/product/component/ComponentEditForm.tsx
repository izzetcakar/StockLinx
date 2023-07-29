import React from 'react'
import { TextInput, Checkbox, Button, Group, Box, NumberInput, FileInput, rem, Image, ScrollArea, Flex, Select, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { toBase64 } from '../../../../functions/Image';
import { IComponent } from '../../../../interfaces/interfaces';
import { useAppSelector } from '../../../../hooks';
import { RootState } from '../../../../redux/store';

interface ComponentEditFormProps {
    component: IComponent;
    submitFunc: (data: object) => void;
}

const ComponentEditForm: React.FC<ComponentEditFormProps> = ({
    component,
    submitFunc = () => console.log("submit"),
}) => {
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
    const form = useForm<IComponent>({
        initialValues: { ...component },
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
    const handleChangeImage = async (value: File | null) => {
        if (!value) return;
        const newImage = await toBase64(value);
        console.log(value);
        form.setFieldValue("imagePath", newImage as string);
    };

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <ScrollArea type="auto">
                <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
                    <Select
                        label="Category"
                        placeholder="Pick one"
                        data={categorySelectData}
                        {...form.getInputProps("categoryId")}
                        transitionProps={{
                            transition: "pop-top-left",
                            duration: 80,
                            timingFunction: "ease",
                        }}
                        searchable
                        clearable
                        allowDeselect
                        dropdownPosition="flip"
                        nothingFound="No options"
                    ></Select>
                    <Select
                        label="Location"
                        placeholder="Pick one"
                        data={locationSelectData}
                        {...form.getInputProps("locationId")}
                        transitionProps={{
                            transition: "pop-top-left",
                            duration: 80,
                            timingFunction: "ease",
                        }}
                        searchable
                        clearable
                        allowDeselect
                        dropdownPosition="flip"
                        nothingFound="No options"
                    ></Select>
                    <Select
                        label="Company"
                        placeholder="Pick one"
                        data={companySelectData}
                        {...form.getInputProps("companyId")}
                        transitionProps={{
                            transition: "pop-top-left",
                            duration: 80,
                            timingFunction: "ease",
                        }}
                        searchable
                        clearable
                        allowDeselect
                        dropdownPosition="flip"
                        nothingFound="No options"
                    ></Select>
                    <Select
                        label="Status"
                        placeholder="Pick one"
                        data={productStatusSelectData}
                        {...form.getInputProps("statusId")}
                        transitionProps={{
                            transition: "pop-top-left",
                            duration: 80,
                            timingFunction: "ease",
                        }}
                        searchable
                        clearable
                        allowDeselect
                        dropdownPosition="flip"
                        nothingFound="No options"
                    ></Select>
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
                    <DateInput
                        clearable
                        label="Purchase Date"
                        placeholder="Purchase Date"
                        valueFormat="DD/MM/YYYY"
                        {...form.getInputProps("purchaseDate")}
                    />
                    <NumberInput
                        defaultValue={0}
                        min={0}
                        placeholder="Purchase Cost"
                        label="Purchase Cost"
                        {...form.getInputProps("purchaseCost")}
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
                        <Button type="submit" color="dark">
                            Submit
                        </Button>
                        <Button onClick={() => openNextModel()} color="dark">
                            Next Modal
                        </Button>
                    </Group>
                </Flex>
            </ScrollArea>
        </form>
    );
}

export default ComponentEditForm