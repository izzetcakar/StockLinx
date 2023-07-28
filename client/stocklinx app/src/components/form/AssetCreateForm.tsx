import React, { forwardRef, useState } from "react";
import {
    TextInput,
    Button,
    Group,
    NumberInput,
    FileInput,
    ActionIcon,
    Select,
    Textarea,
    Flex,
    rem,
    Container,
    Text,
    ScrollArea,
    LoadingOverlay,
    Box,
    Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { closeModal } from "@mantine/modals";
import { IconUpload } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import { toBase64 } from "../../functions/Image";

interface AssetCreateFormProps {
    submitFunc: (data: object) => void;
}

const AssetCreateForm: React.FC<AssetCreateFormProps> = ({
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

    const form = useForm({
        initialValues: {
            id: uuidv4(),
            manufacturerId: null,
            modelId: null,
            notes: "",
            createdDate: null,
            deletedDate: null,
            updatedDate: null,
            categoryId: null,
            locationId: null,
            companyId: null,
            statusId: null,
            imagePath: "",
            name: "",
            orderNo: "",
            purchaseDate: null,
            purchaseCost: 0,
            checkInCounter: null,
            checkOutCounter: null,
            serialNo: "",
            tagNo: "",
            overageAssets: [
                // {
                //     serialNo: "",
                //     tagNo: ""
                // }
            ],
        },
        validate: {
            name: (value: string) =>
                /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
            purchaseCost: (value: number) => {
                return value >= 0
                    ? null
                    : "PurchaseCost must be null or a non-negative number";
            },
            checkInCounter: (value: number) => {
                return value >= 0
                    ? null
                    : "CheckInCounter must be null or a non-negative number";
            },
            checkOutCounter: (value: number) => {
                return value >= 0
                    ? null
                    : "CheckOutCounter must be null or a non-negative number";
            },
        },
    });
    const overageAssetFields = form.values.overageAssets.map((_, index) => (
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

    const handleChangeImage = async (value: File | null) => {
        if (!value) return;
        const newImage = await toBase64(value);
        console.log(value);
        form.setFieldValue("imagePath", newImage as string);
    };

    interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
        value: string
        label: string;
    }

    const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
        ({ value, label, ...others }: ItemProps, ref) => (
            <div ref={ref} {...others}>
                <Group noWrap>
                    <LoadingOverlay visible={false} />
                    <div>
                        <Text size="sm">{value}</Text>
                        <Text size="xs" opacity={0.65}>
                            {label}
                        </Text>
                    </div>

                </Group>
            </div>

        )
    );

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <ScrollArea type="auto">
                <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
                    <Box pos="relative">
                        <Select
                            label="Manufacturer"
                            placeholder="Pick one"
                            data={[{ value: "1", label: "test" },
                            { value: "2", label: "test2" },
                            { value: "3", label: "test3" }]}
                            {...form.getInputProps("manufacturerId")}
                            transitionProps={{
                                transition: "pop-top-left",
                                duration: 80,
                                timingFunction: "ease",
                            }}
                            itemComponent={SelectItem}
                            searchable
                            clearable
                            allowDeselect
                            dropdownPosition="flip"
                            nothingFound="No options"
                            rightSection={<IconChevronDown size="1rem" />}
                            styles={{ rightSection: { pointerEvents: 'none' } }}
                        />
                    </Box>
                    <Select
                        label="Model"
                        placeholder="Pick one"
                        data={modelSelectData}
                        {...form.getInputProps("modelId")}
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
};

export default AssetCreateForm;