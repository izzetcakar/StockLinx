import BranchForm from "../../forms/branch/BranchForm";
import { IBranch } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";

export const openBranchModal = (branch?: IBranch) =>
  modals.open({
    modalId: "branch-modal",
    title: branch ? "Edit Branch" : "Create Branch",
    children: <BranchForm branch={branch} />,
    xOffset: "auto",
  });
