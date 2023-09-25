import React from "react";
import {
  TextInput,
  Button,
  Group,
  FileInput,
  rem,
  Image,
  ScrollArea,
  Flex,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeModal } from "@mantine/modals";
import { IconUpload } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { IDepartment } from "../../interfaces/interfaces";
import { handleImageChange } from "../functions/formFunctions";
import MantineSelect from "../components/MantineSelect";
import { useDispatch } from "react-redux";
import { departmentActions } from "../../redux/department/actions";
import { useSelectData } from "./selectData";

interface DepartmentFormProps {
  department?: IDepartment;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ department }) => {
  const dispatch = useDispatch();

  const form = useForm<IDepartment>({
    initialValues: department
      ? { ...department }
      : {
          id: "",
          companyId: "",
          locationId: null,
          managerId: null,
          name: "",
          imagePath: null,
          notes: null,
        },
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });
  const handleSubmit = (data: object) => {
    department
      ? dispatch(departmentActions.update({ department: data as IDepartment }))
      : dispatch(departmentActions.create({ department: data as IDepartment }));
    modals.close("department-modal");
  };
  const openNextModel = () =>
    modals.open({
      modalId: "next-modal",
      title: "Page 2",
      children: (
        <Button fullWidth onClick={() => closeModal("next-modal")} color="dark">
          Back
        </Button>
      ),
    });

  return (
    <ScrollArea.Autosize type="always" offsetScrollbars mah={600}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap={10} mx="auto" maw="auto" px={40}>
          {useSelectData(form).map((selectData) => (
            <MantineSelect
              key={selectData.propTag}
              data={selectData.data}
              value={selectData.value}
              label={selectData.label}
              propTag={selectData.propTag}
              form={form}
            />
          ))}
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
          <Image
            maw={240}
            mx="auto"
            radius="md"
            src={form.values.imagePath}
            alt="Random image"
          />
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
      </form>
    </ScrollArea.Autosize>
  );
};

export default DepartmentForm;
