import { IUser } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import UserForm from "../../forms/user/UserForm";

export const openUserModal = (user?: IUser) =>
  modals.open({
    modalId: "user-modal",
    title: user ? "Update User" : "Create User",
    children: <UserForm user={user} />,
    xOffset: "auto",
    size: "auto",
  });
