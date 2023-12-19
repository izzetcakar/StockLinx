import React from "react";
import { IBranch } from "../../interfaces/interfaces";
import { RootState } from "../../redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { ActionIcon, Badge, Button, Flex, Select, rem } from "@mantine/core";
import filterClasses from "../../mantineModules/baseFilter.module.scss";
import { permissionActions } from "../../redux/permission/actions";
import uuid4 from "uuid4";
import { IconX } from "@tabler/icons-react";

interface PermissionFormProps {
  branch: IBranch;
}
const PermissionForm: React.FC<PermissionFormProps> = ({ branch }) => {
  const dispatch = useDispatch();
  const permissions = useSelector(
    (state: RootState) => state.permission.permissions
  );
  const users = useSelector((state: RootState) => state.user.users);
  const [user, setUser] = React.useState<string>("");

  const givePermission = () => {
    if (
      permissions.find((p) => p.userId === user && p.branchId === branch.id) ||
      user === ""
    )
      return;
    dispatch(
      permissionActions.setPermissions([
        ...permissions,
        { id: uuid4(), userId: user, branchId: branch.id },
      ])
    );
  };

  return (
    <Flex direction="column" gap={20}>
      <Flex align="flex-end" gap={20}>
        <Select
          data={users.map((user) => ({
            value: user.id,
            label: user.firstName + " " + user.lastName,
          }))}
          label="User"
          placeholder="Select User"
          classNames={filterClasses}
          dropdownPosition="bottom"
          nothingFound="No user found"
          onChange={(e) => setUser(e as string)}
          withinPortal
        />
        <Button onClick={() => givePermission()}>ADD</Button>
      </Flex>
      {permissions
        .filter((p) => p.branchId === branch.id)
        .map((p) => (
          <Flex key={p.id} align="center" justify="space-between" gap={20}>
            <Badge variant="outline" color="gray" w="100%" py={13}>
              {users.find((u) => u.id === p.userId)?.firstName} {"  "}
              {users.find((u) => u.id === p.userId)?.lastName}
            </Badge>
            <ActionIcon
              variant="filled"
              color="red"
              onClick={() =>
                dispatch(
                  permissionActions.setPermissions(
                    permissions.filter((permission) => permission.id !== p.id)
                  )
                )
              }
            >
              <IconX height={rem(16)} width={rem(16)} stroke={1.5} />
            </ActionIcon>
          </Flex>
        ))}
      <Button onClick={() => dispatch(permissionActions.sync({ permissions }))}>
        Sync Permissions
      </Button>
    </Flex>
  );
};

export default PermissionForm;
