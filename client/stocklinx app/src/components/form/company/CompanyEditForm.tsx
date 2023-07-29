import React from "react";
import {
    TextInput,
    Button,
    Group,
    FileInput,
    Flex,
    rem,
    ScrollArea,
    Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUpload } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import { toBase64 } from "../../../functions/Image";
import { ICompany } from "../../../interfaces/interfaces";

interface CompanyEditFormProps {
    company: ICompany
    submitFunc: (data: object) => void;
}

const CompanyEditForm: React.FC<CompanyEditFormProps> = ({
    company,
    submitFunc = () => console.log("submit"),
}) => {
    const form = useForm({
        initialValues: { ...company },
        validate: {
            name: (value: string | null | undefined) => { return (value && /(?!^$)([^\s])/.test(value) ? null : 'Name should not be empty') },
        },
    });

    const handleSubmit = (data: object) => {
        console.log(data);
        submitFunc(data);
        //closeModal("company-modal");
    };

    const handleChangeImage = async (value: File | null) => {
        if (!value) return;
        const newImage = await toBase64(value);
        console.log(value);
        form.setFieldValue("imagePath", newImage as string);
    };

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <ScrollArea type="auto">
                <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
                    <TextInput
                        withAsterisk
                        label="Name"
                        placeholder="Name"
                        {...form.getInputProps("name")}
                    />
                    <FileInput
                        label="Upload image"
                        placeholder="Upload image"
                        accept="image/png,image/jpeg"
                        // value={form.getTransformedValues().imagePath}
                        onChange={(value) => void handleChangeImage(value)}
                        icon={
                            <IconUpload size={rem(14)} {...form.getInputProps("imagePath")} />
                        }
                    />
                    <Image maw={240} mx="auto" radius="md" src={form.values.imagePath} alt="Random image" />
                    <Group position="right" mt="md">
                        <Button type="submit" color="dark">
                            Submit
                        </Button>
                    </Group>
                </Flex>
            </ScrollArea>
        </form>
    );
};

export default CompanyEditForm;