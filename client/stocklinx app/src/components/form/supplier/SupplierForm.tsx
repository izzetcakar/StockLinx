import React from 'react'
import { TextInput, Button, Group, FileInput, rem, Image, ScrollArea, Flex, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { ISupplier } from '../../../interfaces/interfaces';
import { handleImageChange } from '../functions/formFunctions';
import MantineSelect from '../components/MantineSelect';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { useDispatch } from 'react-redux';
import { locationActions } from '../../../redux/location/actions';
import { supplierActions } from '../../../redux/supplier/actions';

interface SupplierFormProps {
    supplier?: ISupplier;
}

const SupplierForm: React.FC<SupplierFormProps> = ({
    supplier,
}) => {
    const dispatch = useDispatch();
    const locationSelectData = useSelector((state: RootState) => state.location.selectData);
    const locationApiStatus = useSelector((state: RootState) => state.location.pending);

    const form = useForm<ISupplier>({
        initialValues: supplier ? { ...supplier } : {
            id: "",
            locationId: null,
            name: "",
            imagePath: null,
            contactName: null,
            contactPhone: null,
            contactEmail: null,
            website: null,
            fax: null,
            notes: null,
        },
        validate: {
            name: (value: string) => (/(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty'),
        },
    });
    const handleSubmit = (data: object) => {
        supplier ? dispatch(supplierActions.update({ supplier: data as ISupplier })) :
            dispatch(supplierActions.create({ supplier: data as ISupplier }));
        dispatch(supplierActions.getAll());
    };
    const openNextSupplier = () => modals.open({
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
                    <MantineSelect
                        form={form}
                        data={locationSelectData}
                        label="Location"
                        propTag="locationId"
                        refreshData={() => dispatch(locationActions.getAll())}
                        loading={locationApiStatus}
                    />
                    <TextInput
                        label="Name"
                        placeholder="New Name"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Contact Name"
                        placeholder="Contact Name"
                        {...form.getInputProps("contactName")}
                        value={form.values.contactName || ""}
                    />
                    <TextInput
                        label="Contact Phone"
                        placeholder="Contact Phone"
                        {...form.getInputProps("contactPhone")}
                        value={form.values.contactPhone || ""}
                    />
                    <TextInput
                        label="Contact Email"
                        placeholder="Contact Email"
                        {...form.getInputProps("contactEmail")}
                        value={form.values.contactEmail || ""}
                    />
                    <TextInput
                        label="Website"
                        placeholder="Website"
                        {...form.getInputProps("website")}
                        value={form.values.website || ""}
                    />
                    <TextInput
                        label="Fax"
                        placeholder="Fax"
                        {...form.getInputProps("fax")}
                        value={form.values.fax || ""}
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
                        <Button onClick={() => openNextSupplier()} color="dark">
                            Next Modal
                        </Button>
                    </Group>
                </Flex>
            </form >
        </ScrollArea.Autosize>
    );
}

export default SupplierForm