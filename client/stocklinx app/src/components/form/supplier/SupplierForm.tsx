import React from 'react'
import { TextInput, Button, Group, FileInput, rem, Image, ScrollArea, Flex, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { v4 as uuidv4 } from "uuid";
import { ApiStatus, ISupplier } from '../../../interfaces/interfaces';
import { handleImageChange } from '../functions/formFunctions';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../redux/store';
import MantineSelect from '../components/MantineSelect';
import { getAllLocations } from '../../../redux/locationReducer';

interface SupplierFormProps {
    supplier?: ISupplier;
    submitFunc: (data: object) => void;
}

const SupplierForm: React.FC<SupplierFormProps> = ({
    supplier,
    submitFunc = () => console.log("submit"),
}) => {
    const dispatch = useAppDispatch();
    const locationSelectData = useAppSelector((state: RootState) => state.location.selectData);
    const locationApiStatus = useAppSelector((state: RootState) => state.location.status);

    const form = useForm<ISupplier>({
        initialValues: supplier ? { ...supplier } : {
            id: uuidv4(),
            locationId: null,
            name: "",
            imagePath: null,
            contactName: null,
            contactPhone: null,
            contactEmail: null,
            website: null,
            fax: null,
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
    const openNextSupplier = () => modals.open({
        modalId: 'next-modal',
        title: 'Page 2',
        children: (
            <Button fullWidth onClick={() => closeModal("next-modal")} color='dark'>Back</Button>
        ),
    });

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
            <ScrollArea type="auto">
                <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
                    <MantineSelect
                        form={form}
                        data={locationSelectData}
                        label="Location"
                        propTag="locationId"
                        refreshData={() => dispatch(getAllLocations())}
                        loading={locationApiStatus === ApiStatus.Loading}
                    />
                    <TextInput
                        label="Name"
                        placeholder="New Name"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Contact Name"
                        placeholder="Contact Name"
                        {...form.getInputProps("contactName")}
                    />
                    <TextInput
                        label="Contact Phone"
                        placeholder="Contact Phone"
                        {...form.getInputProps("contactPhone")}
                    />
                    <TextInput
                        label="Contact Email"
                        placeholder="Contact Email"
                        {...form.getInputProps("contactEmail")}
                    />
                    <TextInput
                        label="Website"
                        placeholder="Website"
                        {...form.getInputProps("website")}
                    />
                    <TextInput
                        label="Fax"
                        placeholder="Fax"
                        {...form.getInputProps("fax")}
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
                        <Button onClick={() => openNextSupplier()} color="dark">
                            Next Modal
                        </Button>
                    </Group>
                </Flex>
            </ScrollArea>
        </form >
    );
}

export default SupplierForm