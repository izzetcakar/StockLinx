import React from 'react'
import { TextInput, Button, Group, FileInput, rem, Image, ScrollArea, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { v4 as uuidv4 } from "uuid";
import { IManufacturer } from '../../../interfaces/interfaces';
import { handleImageChange } from '../functions/formFunctions';

interface ManufacturerFormProps {
    manufacturer?: IManufacturer;
    submitFunc: (data: object) => void;
}

const ManufacturerForm: React.FC<ManufacturerFormProps> = ({
    manufacturer,
    submitFunc = () => console.log("submit"),
}) => {
    const form = useForm<IManufacturer>({
        initialValues: manufacturer ? { ...manufacturer } : {
            id: uuidv4(),
            name: "",
            imagePath: null,
            supportPhone: null,
            supportEmail: null,
            website: null,
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
    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
            <ScrollArea type="auto">
                <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
                    <TextInput
                        label="Name"
                        placeholder="New Name"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Support Phone"
                        placeholder="Support Phone"
                        {...form.getInputProps("supportPhone")}
                    />
                    <TextInput
                        label="Support Email"
                        placeholder="Support Email"
                        {...form.getInputProps("supportEmail")}
                    />
                    <TextInput
                        label="Website"
                        placeholder="Website"
                        {...form.getInputProps("website")}
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

export default ManufacturerForm