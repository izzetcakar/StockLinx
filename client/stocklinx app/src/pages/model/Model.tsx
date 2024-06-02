import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useEffect, useLayoutEffect } from "react";
import { modelActions } from "../../redux/model/actions";
import { categoryActions } from "../../redux/category/actions";
import { fieldSetActions } from "../../redux/fieldSet/actions";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { customFieldActions } from "../../redux/customField/actions";
import { Anchor, Tabs } from "@mantine/core";
import { IModelFieldData } from "@interfaces/serverInterfaces";
import HistoryLogs from "../../components/dataGrid/customLog/HistoryLogs";
import "../product.scss";

const Model = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const model = useSelector((state: RootState) => state.model.model);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const fieldSets = useSelector((state: RootState) => state.fieldSet.fieldSets);
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const customFields = useSelector(
    (state: RootState) => state.customField.customFields
  );

  useLayoutEffect(() => {
    dispatch(categoryActions.getAll());
    dispatch(fieldSetActions.getAll());
    dispatch(manufacturerActions.getAll());
    dispatch(customFieldActions.getAll());
  }, []);

  useEffect(() => {
    dispatch(modelActions.get({ id: id as string }));
  }, [id]);

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
                    categories.find(
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
                    manufacturers.find(
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
                  fieldSets.find(
                    (fieldSet) => fieldSet.id === model?.fieldSetId
                  )?.name
                }
              </div>
            </div>
            {model?.modelFieldData.map((modelFieldData: IModelFieldData) => (
              <div className="product__content" key={modelFieldData.id}>
                <div className="product__content__title">
                  {
                    customFields.find(
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
