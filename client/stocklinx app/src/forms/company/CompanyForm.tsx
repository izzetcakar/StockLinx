import React from "react";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Image,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ICompany } from "@interfaces/serverInterfaces";
import { useInitial } from "./useInitial";
import { toBase64 } from "../../utils/imageUtils";
import FormSelect from "../mantine/FormSelect";
import { useCompany } from "@/hooks/company";
import { useLocation } from "@/hooks/location";
interface CompanyFormProps {
  company?: ICompany;
  create?: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ company, create }) => {
  const { initialValues, isCreate } = useInitial(company, create);
  const { mutate: createCompany } = useCompany.Create();
  const { mutate: updateCompany } = useCompany.Update();
  const { data: locationLookup } = useLocation.Lookup();

  const form = useForm<ICompany>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });

  const handleImageChange = async (e: File | null) => {
    if (!e) return;
    const base64 = await toBase64(e);
    form.setFieldValue("imagePath", base64 as string);
  };

  const handleSubmit = (data: ICompany) => {
    isCreate ? createCompany(data) : updateCompany(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex
        direction="column"
        gap={10}
        mx="auto"
        h={"70dvh"}
        w={"80dvw"}
        px={40}
        pt={20}
      >
        <Image
          src={form.values.imagePath}
          height={200}
          radius="md"
          width="fit-content"
          fit="contain"
        />
        <FileInput
          accept="image/png,image/jpeg"
          label="Upload image"
          placeholder="Upload image"
          onChange={(e) => handleImageChange(e)}
        />
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          required
          withAsterisk
        />
        <FormSelect
          data={locationLookup}
          label="Location"
          inputProps={form.getInputProps("locationId")}
          value={form.values.locationId}
        />
        <TextInput
          label="Email"
          placeholder="New Email"
          {...form.getInputProps("email")}
          value={form.values.email || ""}
        />
        <Group mt="md" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default CompanyForm;
