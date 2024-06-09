import { DataColumn, ExcelColumn } from "@interfaces/gridTableInterfaces";
import { useNavigate } from "react-router-dom";
import { Anchor, Image } from "@mantine/core";
import { IModel } from "@interfaces/serverInterfaces";
import { getImage } from "../../utils/Image";
import { useCategory } from "@/hooks/category";
import { useManufacturer } from "@/hooks/manufacturer";
import { useFieldSet } from "@/hooks/fieldSet";

export const useColumns = () => {
  const navigate = useNavigate();
  const { data: categoryLookup } = useCategory.Lookup();
  const { data: manufacturerLookup } = useManufacturer.Lookup();
  const { data: fieldSetLookup } = useFieldSet.Lookup();

  const columns: DataColumn[] = [
    {
      dataField: "name",
      caption: "Name",
      dataType: "string",
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/model/${(e as IModel)?.id}`)}
            target="_blank"
            underline="always"
          >
            {(e as IModel).name}
          </Anchor>
        );
      },
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
        data: categoryLookup || [],
      },
      renderComponent(e) {
        const model = e as IModel;
        const { data: category } = useCategory.Get(model.categoryId || "");
        return (
          <Anchor
            onClick={() => navigate(`/category/${(e as IModel)?.categoryId}`)}
            target="_blank"
            underline="always"
          >
            {category?.name}
          </Anchor>
        );
      },
    },
    {
      dataField: "manufacturerId",
      caption: "Manufacturer",
      dataType: "string",
      lookup: {
        data: manufacturerLookup || [],
      },
      renderComponent(e) {
        const model = e as IModel;
        const { data: manufacturer } = useManufacturer.Get(
          model.manufacturerId || ""
        );
        return (
          <Anchor
            onClick={() =>
              navigate(`/manufacturer/${(e as IModel)?.manufacturerId}`)
            }
            target="_blank"
            underline="always"
          >
            {manufacturer?.name}
          </Anchor>
        );
      },
    },
    {
      dataField: "modelNo",
      caption: "Model No",
      dataType: "string",
    },
    {
      dataField: "fieldSetId",
      caption: "FieldSet",
      lookup: {
        data: fieldSetLookup || [],
      },
      dataType: "string",
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

  const excelColumns: ExcelColumn[] = [
    {
      caption: "Name",
      validate(value) {
        return value !== null;
      },
      errorText: "Name is required",
    },
    {
      caption: "Category",
    },
    {
      caption: "Manufacturer",
      nullable: true,
    },
    {
      caption: "FieldSet",
      nullable: true,
    },
    {
      caption: "Model No",
    },
    {
      caption: "Notes",
    },
    {
      caption: "Image",
    },
    {
      caption: "Notes",
    },
  ];

  return { columns, excelColumns };
};
