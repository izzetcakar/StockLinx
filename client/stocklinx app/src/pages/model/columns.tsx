import { DataColumn } from "@interfaces/gridTableInterfaces";
import { Image } from "@mantine/core";
import { IModel } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/imageUtils";
import { useCategory, useFieldSet, useManufacturer } from "@queryhooks";
import { EntityCells } from "@/cells/Entity";
import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import ModelForm from "@/forms/model/ModelForm";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

export const useColumns = () => {
  const { refetch: getCategoryLK } = useCategory.Lookup();
  const { refetch: getManufacturerLK } = useManufacturer.Lookup();
  const { refetch: getFieldSetLK } = useFieldSet.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
    },
    {
      caption: "Image",
      dataField: "imagePath",
      dataType: "action",
      renderComponent(e) {
        const image = getImage((e as IModel).imagePath);
        if (!image) return null;
        return (
          <Image
            src={image}
            height={50}
            radius="md"
            width="fit-content"
            fit="contain"
          />
        );
      },
    },
    {
      dataField: "categoryId",
      caption: "Category",
      dataType: "string",
      lookup: {
        dataSource: getCategoryLK,
      },
      renderComponent: (e) => EntityCells.Category((e as IModel).categoryId),
    },
    {
      dataField: "manufacturerId",
      caption: "Manufacturer",
      dataType: "string",
      lookup: {
        dataSource: getManufacturerLK,
      },
      renderComponent: (e) =>
        EntityCells.Manufacturer((e as IModel).manufacturerId),
    },
    {
      dataField: "modelNo",
      caption: "Model No",
      dataType: "string",
    },
    {
      dataField: "fieldSetId",
      caption: "FieldSet",
      dataType: "string",
      lookup: {
        dataSource: getFieldSetLK,
      },
      renderComponent: (e) => EntityCells.FieldSet((e as IModel).fieldSetId),
    },
    {
      dataField: "notes",
      caption: "Notes",
      dataType: "string",
    },
    // INVISIBLE COLUMNS
    {
      dataField: "imagePath",
      caption: "Image",
      dataType: "string",
      allowVisible: false,
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
