import React from 'react'
import { TextInput, Button, Group, ScrollArea, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { modals } from '@mantine/modals';
import { v4 as uuidv4 } from "uuid";
import { IProductStatus } from '../../../interfaces/interfaces';

interface ProductStatusFormProps {
    productStatus?: IProductStatus;
    submitFunc: (data: object) => void;
}

const ProductStatusForm: React.FC<ProductStatusFormProps> = ({
    productStatus,
    submitFunc = () => console.log("submit"),
}) => {

    const form = useForm<IProductStatus>({
        initialValues: productStatus ? { ...productStatus } : {
            id: uuidv4(),
            name: "",
        },
        validate: {
            name: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty'),
        },
    });
    const handleSubmit = (data: object) => {
        console.log(data);
        submitFunc(data);
        closeModal("product-status-modal");
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

export default ProductStatusForm