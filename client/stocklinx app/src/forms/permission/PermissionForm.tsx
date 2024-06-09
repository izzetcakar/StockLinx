import React from "react";
import { IBranch } from "@interfaces/serverInterfaces";
import { ActionIcon, Badge, Button, Flex, Select, rem } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useUser } from "@/hooks/user";
import { usePermission } from "@/hooks/permission";
import uuid4 from "uuid4";

interface PermissionFormProps {
  branch: IBranch;
}
const PermissionForm: React.FC<PermissionFormProps> = ({ branch }) => {
  const { mutate: createPermission } = usePermission.Create();
  const { mutate: removePermission } = usePermission.Remove();
  const { data: permissions } = usePermission.GetAll();
  const { data: users } = useUser.GetAll();
  const [user, setUser] = React.useState<string>("");

  const givePermission = () => {
    if (
      permissions?.find((p) => p.userId === user && p.branchId === branch.id) ||
      user === ""
    )
      return;
    createPermission({
      id: uuid4(),
      userId: user,
      branchId: branch.id,
    });
  };

  return (
    <Flex direction="column" gap={20}>
      <Flex align="flex-end" gap={20}>
        <Select
          data={users?.map((user) => ({
            value: user.id,
            label: user.firstName + " " + user.lastName,
          }))}
          label="User"
          placeholder="Select User"
          comboboxProps={{ position: "bottom" }}
          nothingFoundMessage="No user found"
          onChange={(e) => setUser(e as string)}
        />
        <Button onClick={() => givePermission()}>ADD</Button>
      </Flex>
      {permissions
        ?.filter((p) => p.branchId === branch.id)
        .map((p) => (
          <Flex key={p.id} align="center" justify="space-between" gap={20}>
            <Badge variant="outline" color="gray" w="100%" py={13}>
              {users?.find((u) => u.id === p.userId)?.firstName} {"  "}
              {users?.find((u) => u.id === p.userId)?.lastName}
            </Badge>
            <ActionIcon
              variant="filled"
              color="red"
              onClick={() => removePermission(p.id)}
            >
              <IconX height={rem(16)} width={rem(16)} stroke={1.5} />
            </ActionIcon>
          </Flex>
        ))}
      <Button>Sync Permissions</Button>
    </Flex>
  );
};

export default PermissionForm;
