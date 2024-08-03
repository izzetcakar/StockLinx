import { Image, Loader } from "@mantine/core";
import { IModel } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/imageUtils";
import { useCategory, useManufacturer } from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import { CategoryType } from "@/interfaces/enums";
import ModelForm from "@/forms/model/ModelForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const {
    data: categories,
    isRefetching: categoryLoading,
    refetch: getCategories,
  } = useCategory.GetAll();
  const {
    data: manufacturerLK,
    isRefetching: manufacturerLoading,
    refetch: getManufacturerLK,
  } = useManufacturer.Lookup();

  const columns: MRT_ColumnDef<IModel>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "imagePath",
      header: "Image",
      Cell: ({ row }) => {
        const image = getImage(row.original.imagePath);
        return (
          <Image
            src={image ? image : ""}
            height={30}
            radius="md"
            width="fit-content"
            fit="contain"
          />
        );
      },
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Category(row.original.categoryId),
      mantineFilterMultiSelectProps: () => ({
        data: categoryLoading
          ? []
          : categories
              ?.filter((c) => c.type === CategoryType.ASSET)
              .map((c) => ({
                value: c.id,
                label: c.name,
              })),
        rightSection: categoryLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getCategories,
      }),
    },
    {
      accessorKey: "manufacturerId",
      header: "Manufacturer",
      filterVariant: "multi-select",
      Cell: ({ row }) => EntityCells.Manufacturer(row.original.manufacturerId),
      mantineFilterMultiSelectProps: () => ({
        data: manufacturerLoading ? [] : manufacturerLK,
        rightSection: manufacturerLoading ? <Loader size={16} /> : null,
        onDropdownOpen: getManufacturerLK,
      }),
    },
    {
      accessorKey: "modelNo",
      header: "Model No",
    },
    {
      accessorKey: "notes",
      header: "Notes",
    },
  ];

  const cardColumns: EntityCardColumn[] = [
    {
      title: (model: IModel) => {
        return <div>Name : {model.name}</div>;
      },
      renderData: (e) => <ModelForm model={e as IModel} />,
    },
    {
      title: "History",
      renderData: (e) => <HistoryLogs id={e.id} />,
    },
  ];

  return { columns, cardColumns };
};
