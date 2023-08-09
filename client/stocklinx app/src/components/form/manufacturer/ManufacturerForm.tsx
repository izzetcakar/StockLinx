import React from 'react'
import { TextInput, Button, Group, FileInput, rem, Image, ScrollArea, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { IManufacturer } from '../../../interfaces/interfaces';
import { handleImageChange } from '../functions/formFunctions';
import { useDispatch } from 'react-redux';
import { manufacturerActions } from '../../../redux/manufacturer/actions';

interface ManufacturerFormProps {
    manufacturer?: IManufacturer;
}

const ManufacturerForm: React.FC<ManufacturerFormProps> = ({
    manufacturer,
}) => {
    const dispatch = useDispatch();
    const form = useForm<IManufacturer>({
        initialValues: manufacturer ? { ...manufacturer } : {
            id: "",
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
        manufacturer ? dispatch(manufacturerActions.update({ manufacturer: data as IManufacturer })) :
            dispatch(manufacturerActions.create({ manufacturer: data as IManufacturer }));
        dispatch(manufacturerActions.getAll());
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
                        label="Support Phone"
                        placeholder="Support Phone"
                        {...form.getInputProps("supportPhone")}
                        value={form.values.supportPhone || ""}
                    />
                    <TextInput
                        label="Support Email"
                        placeholder="Support Email"
                        {...form.getInputProps("supportEmail")}
                        value={form.values.supportEmail || ""}
                    />
                    <TextInput
                        label="Website"
                        placeholder="Website"
                        {...form.getInputProps("website")}
                        value={form.values.website || ""}
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
            </form >
        </ScrollArea.Autosize>
    );
}

export default ManufacturerForm