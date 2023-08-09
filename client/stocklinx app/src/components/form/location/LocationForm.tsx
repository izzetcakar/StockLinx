import React from 'react'
import { TextInput, Button, Group, FileInput, rem, Image, ScrollArea, Flex, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { ILocation } from '../../../interfaces/interfaces';
import { handleImageChange } from '../functions/formFunctions';
import { locationActions } from '../../../redux/location/actions';
import { useDispatch } from 'react-redux';

interface LocationFormProps {
    location?: ILocation;
}

const LocationForm: React.FC<LocationFormProps> = ({
    location,
}) => {
    const dispatch = useDispatch();
    const form = useForm<ILocation>({
        initialValues: location ? { ...location } : {
            id: "",
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
        location ? dispatch(locationActions.update({ location: data as ILocation })) :
            dispatch(locationActions.create({ location: data as ILocation }));
        dispatch(locationActions.getAll());
    };
    const openNextModel = () => modals.open({
        modalId: 'next-modal',
        title: 'Page 2',
        children: (
            <Button fullWidth onClick={() => closeModal("next-modal")} color='dark'>Back</Button>
        ),
    });
    return (
        <ScrollArea.Autosize type="always" offsetScrollbars mah={600}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
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
                        value={form.values.country || ""}
                    />
                    <TextInput
                        label="State"
                        placeholder="State"
                        {...form.getInputProps("state")}
                        value={form.values.state || ""}
                    />
                    <TextInput
                        label="City"
                        placeholder="City"
                        {...form.getInputProps("city")}
                        value={form.values.city || ""}
                    />
                    <TextInput
                        label="Address"
                        placeholder="Address"
                        {...form.getInputProps("address")}
                        value={form.values.address || ""}
                    />
                    <TextInput
                        label="Address2"
                        placeholder="Address2"
                        {...form.getInputProps("address2")}
                        value={form.values.address2 || ""}
                    />
                    <TextInput
                        label="Zip Code"
                        placeholder="Zip Code"
                        {...form.getInputProps("zipCode")}
                        value={form.values.zipCode || ""}
                    />
                    <TextInput
                        label="Currency"
                        placeholder="Currency"
                        {...form.getInputProps("currency")}
                        value={form.values.currency || ""}
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

export default LocationForm