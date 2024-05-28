import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import {
  BaseColumn,
  ExcelColumn,
} from "@interfaces/gridTableInterfaces";
import { useNavigate } from "react-router-dom";
import { Anchor, Image } from "@mantine/core";
import { IModel } from "../../interfaces/serverInterfaces";
import { getImage } from "../../utils/Image";

export const useColumns = () => {
  const navigate = useNavigate();
  const cateogries = useSelector(
    (state: RootState) => state.category.categories
  );
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const fieldSets = useSelector((state: RootState) => state.fieldSet.fieldSets);

  const columns: BaseColumn[] = [
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
        data: cateogries.map((category) => ({
          value: category.id,
          label: category.name,
        })),
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() => navigate(`/category/${(e as IModel)?.categoryId}`)}
            target="_blank"
            underline="always"
          >
            {
              cateogries.find(
                (category) => category.id === (e as IModel)?.categoryId
              )?.name
            }
          </Anchor>
        );
      },
    },
    {
      dataField: "manufacturerId",
      caption: "Manufacturer",
      dataType: "string",
      lookup: {
        data: manufacturers.map((manufacturer) => ({
          value: manufacturer.id,
          label: manufacturer.name,
        })),
      },
      renderComponent(e) {
        return (
          <Anchor
            onClick={() =>
              navigate(`/manufacturer/${(e as IModel)?.manufacturerId}`)
            }
            target="_blank"
            underline="always"
          >
            {
              manufacturers.find(
                (manufacturer) =>
                  manufacturer.id === (e as IModel)?.manufacturerId
              )?.name
            }
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
        data: fieldSets.map((fieldSet) => ({
          value: fieldSet.id,
          label: fieldSet.name,
        })),
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
      visible: false,
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
