
import DepartmentForm from "../../forms/department/DepartmentForm";
import { IDepartment } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const closeModal = (modal: string) => modals.close(modal);
export const openDepartmentModal = (
    department?: IDepartment,
) =>
    modals.open({
        modalId: "department-modal",
        title: "Update",
        children: <DepartmentForm department={department} />,
        xOffset: "auto",
    });

