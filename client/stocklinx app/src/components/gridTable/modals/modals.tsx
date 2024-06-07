import { modals } from "@mantine/modals";
import { DataColumn, RowError } from "@interfaces/gridTableInterfaces";
import ExcelTable from "../excel/ExcelTable";
import { Text } from "@mantine/core";

export const openExcelModal = (
  data: object[],
  columns: DataColumn[],
  errors: RowError[]
) =>
  modals.open({
    modalId: "excel__modal",
    children: <ExcelTable data={data} columns={columns} errors={errors} />,
    xOffset: "auto",
    size: "auto",
  });
export const openConfirmModal = (
  title: string,
  text: string,
  onConfirm: () => void
) =>
  modals.openConfirmModal({
    title: title,
    children: <Text size="sm">{text}</Text>,
    labels: { confirm: "Confirm", cancel: "Cancel" },
    onConfirm: onConfirm,
  });
