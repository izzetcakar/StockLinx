import React, { useEffect } from 'react'
import { Column } from '../gridTable/interfaces/interfaces';
import { TextInput, Checkbox, Button, Group, Box, NumberInput, FileInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { toBase64 } from '../../functions/Image';

interface AccessoryFormProps {
    object?: object;
    columns?: Column[];
    submitFunc: (data: object) => void;
}

const AccessoryForm: React.FC<AccessoryFormProps> = ({
}) => {
    const [value, setValue] = React.useState<File | null>(null);
    const form = useForm({
        initialValues: {
            Owner: "",
            LastCheck: null,
            OSversion: "",
            PasswordManager: false,
            HDencrypted: false,
            AVinstalled: false,
            Apllications: 0,
        },
        validate: {
            Owner: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Owner should not be empty'),
        },
    });
    const handleSubmit = (data: object) => {
        console.log(data);
        closeModal("edit-modal");
    };
    useEffect(() => {
        console.log(value);
    }, [value])

    const handleImage = async (image: File | null) => {
        if (!image) return;
        var img = await toBase64(image);
        console.log(img);
    }

    return (
        <Box maw="auto" mx="auto">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="Owner"
                    placeholder="New Owner"
                    {...form.getInputProps('Owner')}
                />
                <DateInput
                    clearable
                    label="LastCheck"
                    placeholder='New LastCheck'
                    valueFormat="DD/MM/YYYY HH:mm:ss"
                    {...form.getInputProps('LastCheck')} />
                <TextInput
                    label="OSversion"
                    placeholder="New OSversion"
                    {...form.getInputProps('OSversion')}
                />
                <Checkbox
                    mt="md"
                    label="Password Manager"
                    color='dark'
                    {...form.getInputProps('PasswordManager', { type: 'checkbox' })}
                />
                <Checkbox
                    mt="md"
                    label="AVinstalled"
                    color='dark'
                    {...form.getInputProps('AVinstalled', { type: 'checkbox' })}
                />
                <Checkbox
                    mt="md"
                    label="HDencrypted"
                    color='dark'
                    {...form.getInputProps('HDencrypted', { type: 'checkbox' })}
                />
                <NumberInput
                    defaultValue={0}
                    min={0}
                    placeholder="New Apllications"
                    label="Apllications"
                    {...form.getInputProps('Apllications')}
                />
                <FileInput label="Upload image" placeholder="Upload image" accept="image/png,image/jpeg" value={value} onChange={setValue} icon={<IconUpload size={rem(14)} />} />
                <Group position="right" mt="md">
                    <Button fullWidth type="submit" color='dark'>Submit</Button>
                    <Button fullWidth color='dark' onClick={() => handleImage(value)}>Show</Button>
                </Group>
            </form>
        </Box>
    )
}

export default AccessoryForm