import React from 'react'
import { TextInput, Button, Group, FileInput, rem, Image, ScrollArea, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { ICategory } from '../../interfaces/interfaces';
import { handleImageChange } from '../functions/formFunctions';
import { useDispatch } from 'react-redux';
import { categoryActions } from '../../redux/category/actions';

interface CategoryFormProps {
    category?: ICategory;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
    category,
}) => {
    const dispatch = useDispatch();
    const form = useForm<ICategory>({
        initialValues: category ? { ...category } : {
            id: "",
            name: "",
            imagePath: null,
        },
        validate: {
            name: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty'),
        },
    });
    const handleSubmit = (data: object) => {
        category ? dispatch(categoryActions.update({ category: data as ICategory })) :
            dispatch(categoryActions.create({ category: data as ICategory }));
        dispatch(categoryActions.getAll());
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

export default CategoryForm