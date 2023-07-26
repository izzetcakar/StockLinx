import React from 'react'
import { Column } from '../gridTable/interfaces/interfaces';
import { TextInput, Checkbox, Button, Group, Box, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';

interface TestFormProps {
    object?: object;
    columns?: Column[];
    submitFunc: (data: object) => void;
}

const TestForm: React.FC<TestFormProps> = ({
}) => {
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

    return (
        <Box maw="auto" mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                <Group position="right" mt="md">
                    <Button type="submit" color='dark'>Submit</Button>
                </Group>
            </form>
        </Box>
    )
}

export default TestForm