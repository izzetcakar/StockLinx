import { ISubmissionDto } from "@/interfaces/serverInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";

export const SubmissionSeatColumns = () => {
  const columns: MRT_ColumnDef<ISubmissionDto>[] = [
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Tag",
      accessorKey: "tag",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
  ];

  return columns;
};
