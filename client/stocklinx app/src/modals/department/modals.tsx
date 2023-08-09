
import { IDepartment } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import DepartmentForm from "../../components/form/department/DepartmentForm";

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

