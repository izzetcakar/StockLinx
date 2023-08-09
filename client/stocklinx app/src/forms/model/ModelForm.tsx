import React from 'react'
import { TextInput, Button, Group, FileInput, rem, Image, ScrollArea, Flex, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { IModel } from '../../interfaces/interfaces';
import { handleImageChange } from '../functions/formFunctions';
import { IMantinSelectProps } from '../interfaces/interfaces';
import MantineSelect from '../components/MantineSelect';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { categoryActions } from '../../redux/category/actions';
import { useDispatch } from 'react-redux';
import { manufacturerActions } from '../../redux/manufacturer/actions';
import { modelActions } from '../../redux/model/actions';

interface ModelFormProps {
    model?: IModel;
}

const ModelForm: React.FC<ModelFormProps> = ({
    model,
}) => {
    const dispatch = useDispatch();
    const categorySelectData = useSelector((state: RootState) => state.category.selectData);
    const categoryApiStatus = useSelector((state: RootState) => state.category.pending);
    const manufacturerSelectData = useSelector((state: RootState) => state.manufacturer.selectData);
    const manufacturerApiStatus = useSelector((state: RootState) => state.manufacturer.pending);

    const form = useForm<IModel>({
        initialValues: model ? { ...model } : {
            id: "",
            categoryId: null,
            manufacturerId: null,
            name: "",
            imagePath: null,
            modelNo: null,
            notes: null,
        },
        validate: {
            name: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty'),
        },
    });
    const handleSubmit = (data: object) => {
        model ? dispatch(modelActions.update({ model: data as IModel })) :
            dispatch(modelActions.create({ model: data as IModel }));
        dispatch(modelActions.getAll());
    };
    const openNextModel = () => modals.open({
        modalId: 'next-modal',
        title: 'Page 2',
        children: (
            <Button fullWidth onClick={() => closeModal("next-modal")} color='dark'>Back</Button>
        ),
    });
    const selectComponentData: IMantinSelectProps<IModel>[] = [
        {
            form: form,
            data: categorySelectData,
            label: "Category",
            propTag: "categoryId",
            refreshData: () => dispatch(categoryActions.getAll()),
            loading: categoryApiStatus,
        },
        {
            form: form,
            data: manufacturerSelectData,
            label: "Manufacturer",
            propTag: "manufacturerId",
            refreshData: () => dispatch(manufacturerActions.getAll()),
            loading: manufacturerApiStatus,
        },
    ]

    return (
        <ScrollArea.Autosize type="always" offsetScrollbars mah={600}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
                <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
                    {selectComponentData.map((selectData) =>
                        <MantineSelect
                            form={selectData.form}
                            data={selectData.data}
                            label={selectData.label}
                            propTag={selectData.propTag}
                            key={selectData.propTag}
                        />
                    )}
                    <TextInput
                        label="Name"
                        placeholder="New Name"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Model No"
                        placeholder="Model No"
                        {...form.getInputProps("modelNo")}
                        value={form.values.modelNo || ""}
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

export default ModelForm