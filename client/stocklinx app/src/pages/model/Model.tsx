import { useNavigate, useParams } from "react-router-dom";
import { Anchor, Tabs } from "@mantine/core";
import { IModelFieldData } from "@interfaces/serverInterfaces";
import { useModel } from "@/hooks/model";
import { useCategory } from "@/hooks/category";
import { useManufacturer } from "@/hooks/manufacturer";
import { useFieldSet } from "@/hooks/fieldSet";
import { useCustomField } from "@/hooks/customField";
import HistoryLogs from "@components/dataGrid/customLog/HistoryLogs";

const Model = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: model } = useModel.Get(id as string);
  const { data: categories } = useCategory.GetAll();
  const { data: manufacturers } = useManufacturer.GetAll();
  const { data: fieldSets } = useFieldSet.GetAll();
  const { data: customFields } = useCustomField.GetAll();

  return (
    <div className="product__container">
      <div className="product__container__title">Model - {model?.name}</div>
      <Tabs defaultValue="info">
        <Tabs.List grow>
          <Tabs.Tab value="info">Info</Tabs.Tab>
          <Tabs.Tab value="history">History</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <div className="product__content__container">
            <div className="product__content">
              <div className="product__content__title">Name</div>
              <div className="product__content__value">{model?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Category</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() => navigate(`/category/${model?.categoryId}`)}
                  target="_blank"
                  underline="always"
                >
                  {
                    categories?.find(
                      (category) => category.id === model?.categoryId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Manufacturer</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() =>
                    navigate(`/manufacturer/${model?.manufacturerId}`)
                  }
                  target="_blank"
                  underline="always"
                >
                  {
                    manufacturers?.find(
                      (manufacturer) =>
                        manufacturer.id === model?.manufacturerId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Model No</div>
              <div className="product__content__value">{model?.modelNo}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">FieldSet</div>
              <div className="product__content__value">
                {
                  fieldSets?.find(
                    (fieldSet) => fieldSet.id === model?.fieldSetId
                  )?.name
                }
              </div>
            </div>
            {model?.modelFieldData.map((modelFieldData: IModelFieldData) => (
              <div className="product__content" key={modelFieldData.id}>
                <div className="product__content__title">
                  {
                    customFields?.find(
                      (customField) =>
                        customField.id === modelFieldData.customFieldId
                    )?.name
                  }
                </div>
                <div className="product__content__value">
                  {modelFieldData.value}
                </div>
              </div>
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="history">
          <HistoryLogs id={id as string} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Model;
