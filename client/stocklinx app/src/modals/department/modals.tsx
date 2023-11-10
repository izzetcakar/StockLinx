import DepartmentForm from "../../forms/department/DepartmentForm";
import { IDepartment } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const openDepartmentModal = (department?: IDepartment) =>
  modals.open({
    modalId: "department-modal",
    title: department ? "Update Department" : "Create Department",
    children: <DepartmentForm department={department} />,
    xOffset: "auto",
    size: "auto",
  });
