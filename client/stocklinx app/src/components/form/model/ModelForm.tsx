import React from 'react'
import { TextInput, Button, Group, FileInput, rem, Image, ScrollArea, Flex, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { v4 as uuidv4 } from "uuid";
import { ApiStatus, IModel } from '../../../interfaces/interfaces';
import { handleImageChange } from '../functions/formFunctions';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../redux/store';
import { IMantinSelectProps } from '../interfaces/interfaces';
import MantineSelect from '../components/MantineSelect';
import { getAllCategories } from '../../../redux/categoryReducer';
import { getAllManufacturers } from '../../../redux/manufacturerReducer';

interface ModelFormProps {
    model?: IModel;
    submitFunc: (data: object) => void;
}

const ModelForm: React.FC<ModelFormProps> = ({
    model,
    submitFunc = () => console.log("submit"),
}) => {
    const dispatch = useAppDispatch();
    const categorySelectData = useAppSelector((state: RootState) => state.category.selectData);
    const categoryApiStatus = useAppSelector((state: RootState) => state.category.status);
    const manufacturerSelectData = useAppSelector((state: RootState) => state.manufacturer.selectData);
    const manufacturerApiStatus = useAppSelector((state: RootState) => state.manufacturer.status);

    const form = useForm<IModel>({
        initialValues: model ? { ...model } : {
            id: uuidv4(),
            categoryId: null,
            manufacturerId: null,
            name: "",
            imagePath: null,
            modelNo: null,
            notes: null,
        },
        validate: {
            name: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty'),
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
    const selectComponentData: IMantinSelectProps<IModel>[] = [
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
            data: manufacturerSelectData,
            label: "Manufacturer",
            propTag: "manufacturerId",
            refreshData: () => dispatch(getAllManufacturers()),
            loading: manufacturerApiStatus === ApiStatus.Loading,
        },
    ]

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
            <ScrollArea type="auto">
                <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
                    {selectComponentData.map((selectData) =>
                        <MantineSelect
                            form={selectData.form}
                            data={selectData.data}
                            label={selectData.label}
                            propTag={selectData.propTag}
                            key={selectData.propTag}
                        />
                    )}
                    <TextInput
                        label="Name"
                        placeholder="New Name"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Model No"
                        placeholder="Model No"
                        {...form.getInputProps("modelNo")}
                        value={form.values.modelNo || ""}
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

export default ModelForm