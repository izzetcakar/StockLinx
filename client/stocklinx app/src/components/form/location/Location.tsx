import React from 'react'
import { TextInput, Button, Group, FileInput, rem, Image, ScrollArea, Flex, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { v4 as uuidv4 } from "uuid";
import { ILocation } from '../../../interfaces/interfaces';
import { handleImageChange } from '../functions/formFunctions';

interface LocationFormProps {
    location?: ILocation;
    submitFunc: (data: object) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({
    location,
    submitFunc = () => console.log("submit"),
}) => {
    const form = useForm<ILocation>({
        initialValues: location ? { ...location } : {
            id: uuidv4(),
            name: "",
            imagePath: null,
            country: "",
            state: null,
            city: "",
            address: null,
            address2: null,
            currency: null,
            zipCode: null,
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
                        label="Country"
                        placeholder="Country"
                        {...form.getInputProps("country")}
                    />
                    <TextInput
                        label="State"
                        placeholder="State"
                        {...form.getInputProps("state")}
                    />
                    <TextInput
                        label="City"
                        placeholder="City"
                        {...form.getInputProps("city")}
                    />
                    <TextInput
                        label="Address"
                        placeholder="Address"
                        {...form.getInputProps("address")}
                    />
                    <TextInput
                        label="Address2"
                        placeholder="Address2"
                        {...form.getInputProps("address2")}
                    />
                    <TextInput
                        label="Zip Code"
                        placeholder="Zip Code"
                        {...form.getInputProps("zipCode")}
                    />
                    <TextInput
                        label="Currency"
                        placeholder="Currency"
                        {...form.getInputProps("currency")}
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

export default LocationForm