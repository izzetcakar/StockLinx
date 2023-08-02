import React from 'react'
import { TextInput, Button, Group, FileInput, rem, Image, ScrollArea, Flex, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { IconUpload } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { v4 as uuidv4 } from "uuid";
import { ApiStatus, IDepartment } from '../../../interfaces/interfaces';
import { handleImageChange } from '../functions/formFunctions';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../redux/store';
import { IMantinSelectProps } from '../interfaces/interfaces';
import MantineSelect from '../components/MantineSelect';
import { getAllCompanies } from '../../../redux/companyReducer';
import { getAllLocations } from '../../../redux/locationReducer';

interface DepartmentFormProps {
    department?: IDepartment;
    submitFunc: (data: object) => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
    department,
    submitFunc = () => console.log("submit"),
}) => {
    const dispatch = useAppDispatch();
    const companySelectData = useAppSelector((state: RootState) => state.company.selectData);
    const companyApiStatus = useAppSelector((state: RootState) => state.company.status);
    const locationSelectData = useAppSelector((state: RootState) => state.location.selectData);
    const locationApiStatus = useAppSelector((state: RootState) => state.location.status);

    const form = useForm<IDepartment>({
        initialValues: department ? { ...department } : {
            id: uuidv4(),
            companyId: "",
            locationId: null,
            managerId: null,
            name: "",
            imagePath: null,
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
    const selectComponentData: IMantinSelectProps<IDepartment>[] = [
        {
            form: form,
            data: companySelectData,
            label: "Company",
            propTag: "companyId",
            refreshData: () => dispatch(getAllCompanies()),
            loading: companyApiStatus === ApiStatus.Loading,
        },
        {
            form: form,
            data: locationSelectData,
            label: "Location",
            propTag: "locationId",
            refreshData: () => dispatch(getAllLocations()),
            loading: locationApiStatus === ApiStatus.Loading,
        },
    ]

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
            <ScrollArea type="auto">
                <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
                    {selectComponentData.map((selectData) =>
                        <MantineSelect
                            key={selectData.propTag}
                            form={selectData.form}
                            data={selectData.data}
                            label={selectData.label}
                            propTag={selectData.propTag}
                            refreshData={selectData?.refreshData}
                            loading={selectData?.loading}
                        />
                    )}
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
            </ScrollArea>
        </form >
    );
}

export default DepartmentForm