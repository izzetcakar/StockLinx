import React from "react";
import {
  TextInput,
  Button,
  Group,
  Textarea,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IUser } from "@interfaces/serverInterfaces";
import { useUser } from "@queryhooks";
import { useInitial } from "@/hooks/initial/useInitial";
import FormCard from "@/components/form/FormCard";

interface UserFormProps {
  user?: IUser;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const initialValues = useInitial().User(user);
  const isCreate = initialValues.id === "";
  const { mutate: createUser } = useUser.Create();
  const { mutate: updateUser } = useUser.Update();

  const form = useForm<IUser>({
    initialValues: initialValues,
    validate: {
      firstName: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "First Name should not be empty",
      lastName: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Last Name should not be empty",
      password: (value: string) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value)
          ? null
          : "Password should be at least 5 characters and include at least one lowercase letter, one uppercase letter, and one digit.",
    },
  });

  const handleSubmit = (data: IUser) => {
    isCreate ? createUser(data) : updateUser(data);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <TextInput
          label="First Name"
          placeholder="First Name"
          {...form.getInputProps("firstName")}
          required
          withAsterisk
        />
        <TextInput
          label="Last Name"
          placeholder="Last Name"
          {...form.getInputProps("lastName")}
          required
          withAsterisk
        />
        <TextInput
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
          required
          withAsterisk
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
          maxLength={20}
          minLength={6}
          required
          withAsterisk
        />
        <Textarea
          placeholder="Your notes here"
          label="Note"
          {...form.getInputProps("notes")}
          value={form.values.notes || ""}
        />
        <Group pt="xs" justify="flex-end">
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default UserForm;
