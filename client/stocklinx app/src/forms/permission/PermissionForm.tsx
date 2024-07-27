import { Button, Group } from "@mantine/core";
import { useUser, useCompany, usePermission } from "@queryhooks";
import { useForm } from "@mantine/form";
import { queryClient } from "@/main";
import FormSelect from "../mantine/FormSelect";
import FormCard from "@/components/form/FormCard";
import MultiFormSelect from "../mantine/MultiFormSelect";

interface RangePermission {
  companyId: string;
  userIds: string[];
}

const PermissionForm = () => {
  const {
    data: userLK,
    isRefetching: userLoading,
    refetch: getUserLK,
  } = useUser.Lookup();
  const {
    data: companyLK,
    isRefetching: companyLoading,
    refetch: getCompanyLK,
  } = useCompany.Lookup();
  const { mutate: create } = usePermission.Create();
  const { mutate: createRange } = usePermission.CreateRange();
  const isMutating = queryClient.isMutating() > 0;

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
          loading={companyLoading}
          fetchData={getCompanyLK}
          inputProps={form.getInputProps("companyId")}
          value={form.values.companyId}
          required
        />
        <MultiFormSelect
          data={userLK}
          label="User"
          loading={userLoading}
          fetchData={getUserLK}
          inputProps={form.getInputProps("userIds")}
          value={form.values.userIds}
          required
        />
        <Group pt="xs" justify="flex-end">
          <Button type="submit" color="dark" size="md" loading={isMutating}>
            Submit
          </Button>
        </Group>
      </FormCard>
    </form>
  );
};

export default PermissionForm;
