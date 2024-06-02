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
import { useDispatch, useSelector } from "react-redux";
import { companyActions } from "../../redux/company/actions";
import { RootState } from "../../redux/rootReducer";
import { useInitial } from "./useInitial";
import { toBase64 } from "../../utils/Image";
import FormSelect from "../mantine/FormSelect";
interface CompanyFormProps {
  company?: ICompany;
  create?: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ company, create }) => {
  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.location.locations);
  const { initialValues, isCreate } = useInitial(company, create);

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
    isCreate
      ? dispatch(companyActions.create({ company: data }))
      : dispatch(companyActions.update({ company: data }));
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
          data={locations.map((l) => ({
            value: l.id,
            label: l.name,
          }))}
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
