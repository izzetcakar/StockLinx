import React, { useEffect } from "react";
import {
  TextInput,
  Button,
  Group,
  Flex,
  Textarea,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IDepartment } from "../../interfaces/serverInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { departmentActions } from "../../redux/department/actions";
import { RootState } from "../../redux/rootReducer";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
import { useInitial } from "./useInitial";
interface DepartmentFormProps {
  department?: IDepartment;
  create?: boolean;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  department,
  create,
}) => {
  const dispatch = useDispatch();
  const branch = useSelector((state: RootState) => state.branch.branch);
  const locations = useSelector((state: RootState) => state.location.locations);
  const { initialValues, isCreate } = useInitial(department, create);

  const form = useForm<IDepartment>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });
  const handleSubmit = (data: IDepartment) => {
    isCreate
      ? dispatch(departmentActions.create({ department: data }))
      : dispatch(departmentActions.update({ department: data }));
  };

  useEffect(() => {
    form.setFieldValue("branchId", branch?.id || "");
  }, [branch]);

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
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          withAsterisk
        />
        <Select
          data={locations.map((location) => ({
            value: location.id,
            label: location.name,
          }))}
          label="Location"
          placeholder="Select Location"
          {...form.getInputProps("locationId")}
          value={form.values.locationId || ""}
          classNames={filterClasses}
          comboboxProps={{
              position: "top",
              middlewares: { flip: false, shift: false },
            }}
          nothingFoundMessage="No location found"
          
        />
        <Textarea
          placeholder="Your notes here"
          label="Note"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
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

export default DepartmentForm;
