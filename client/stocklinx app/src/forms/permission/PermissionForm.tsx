import { Button, Group, MultiSelect } from "@mantine/core";
import { useUser } from "@/hooks/query/user";
import { usePermission } from "@/hooks/query/permission";
import { useCompany } from "@/hooks/query/company";
import { useForm } from "@mantine/form";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";

interface RangePermission {
  companyId: string;
  userIds: string[];
}

const PermissionForm = () => {
  const { data: userLK } = useUser.Lookup();
  const { data: companyLK } = useCompany.Lookup();
  const { mutate: create } = usePermission.Create();
  const { mutate: createRange } = usePermission.CreateRange();

  const form = useForm<RangePermission>({
    initialValues: {
      companyId: "",
      userIds: [],
    },
    validate: {
      companyId: (value: string) =>
        /(?!^$)([^\s])/.test(value) ? null : "Company should not be empty",
    },
  });

  const handleSubmit = (data: RangePermission) => {
    const userCount = data.userIds.length;
    if (data.userIds.length < 1) return;
    switch (true) {
      case userCount < 1:
        return;
      case userCount === 1:
        create({
          companyId: data.companyId,
          userId: data.userIds[0],
        });
        return;
      case userCount > 1:
        createRange(
          data.userIds.map((userId) => {
            return {
              companyId: data.companyId,
              userId,
            };
          })
        );
        return;
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormCard>
        <FormSelect
          data={companyLK}
          label="Company"
          inputProps={form.getInputProps("companyId")}
          value={form.values.companyId}
          required
        />
        <MultiSelect
          data={userLK}
          label="User"
          {...form.getInputProps("userIds")}
          required
        />
        <Group pt="xs" justify="flex-end">
          <Button type="submit" color="dark" size="md">
            Submit
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default PermissionForm;
