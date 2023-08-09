import React from 'react'
import { TextInput, Button, Group, ScrollArea, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { modals } from '@mantine/modals';
import { IProductStatus } from '../../../interfaces/interfaces';
import { productStatusActions } from '../../../redux/productStatus/actions';
import { useDispatch } from 'react-redux';

interface ProductStatusFormProps {
    productStatus?: IProductStatus;
}

const ProductStatusForm: React.FC<ProductStatusFormProps> = ({
    productStatus,
}) => {
    const dispatch = useDispatch();
    const form = useForm<IProductStatus>({
        initialValues: productStatus ? { ...productStatus } : {
            id: "",
            name: "",
        },
        validate: {
            name: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty'),
        },
    });
    const handleSubmit = (data: object) => {
        productStatus ? dispatch(productStatusActions.update({ productStatus: data as IProductStatus })) :
            dispatch(productStatusActions.create({ productStatus: data as IProductStatus }));
        dispatch(productStatusActions.getAll());
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

export default ProductStatusForm