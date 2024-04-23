import React from "react";
import { TextInput, Flex, Textarea, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ILocation } from "../../interfaces/serverInterfaces";
import { locationActions } from "../../redux/location/actions";
import { useDispatch } from "react-redux";
import { useInitial } from "./useInitial";
interface LocationFormProps {
  location?: ILocation;
  create?: boolean;
}

const LocationForm: React.FC<LocationFormProps> = ({ location, create }) => {
  const dispatch = useDispatch();
  const { initialValues, isCreate } = useInitial(location, create);

  const form = useForm<ILocation>({
    initialValues: initialValues,
    validate: {
      name: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Name should not be empty",
    },
  });
  const handleSubmit = (data: ILocation) => {
    isCreate
      ? dispatch(locationActions.create({ location: data }))
      : dispatch(locationActions.update({ location: data }));
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
        <TextInput
          label="Name"
          placeholder="New Name"
          {...form.getInputProps("name")}
          withAsterisk
        />
        <TextInput
          label="Country"
          placeholder="Country"
          {...form.getInputProps("country")}
          value={form.values.country || ""}
        />
        <TextInput
          label="City"
          placeholder="City"
          {...form.getInputProps("city")}
          value={form.values.city || ""}
        />
        <TextInput
          label="State"
          placeholder="State"
          {...form.getInputProps("state")}
          value={form.values.state || ""}
        />
        <TextInput
          label="Address"
          placeholder="Address"
          {...form.getInputProps("address")}
          value={form.values.address || ""}
        />
        <TextInput
          label="Address2"
          placeholder="Address2"
          {...form.getInputProps("address2")}
          value={form.values.address2 || ""}
        />
        <TextInput
          label="Zip Code"
          placeholder="Zip Code"
          {...form.getInputProps("zipCode")}
          value={form.values.zipCode || ""}
        />
        <TextInput
          label="Currency"
          placeholder="Currency"
          {...form.getInputProps("currency")}
          value={form.values.currency || ""}
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

export default LocationForm;
