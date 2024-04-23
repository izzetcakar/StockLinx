import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useEffect } from "react";
import { categoryActions } from "../../redux/category/actions";
import { CategoryType } from "../../interfaces/serverInterfaces";
import { Tabs } from "@mantine/core";
import { productActions } from "../../redux/product/actions";
import HistoryLogs from "../../components/dataGrid/customLog/HistoryLogs";
import "../product.scss";

const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.category.category);

  useEffect(() => {
    dispatch(categoryActions.get({ id: id as string }));
    dispatch(productActions.getCustomLogs());
  }, [id]);

  return (
    <div className="product__container">
      <div className="product__container__title">
        Category - {category?.name}
      </div>
      <Tabs defaultValue="info">
        <Tabs.List grow>
          <Tabs.Tab value="info">Info</Tabs.Tab>
          <Tabs.Tab value="history">History</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <div className="product__content__container">
            <div className="product__content">
              <div className="product__content__title">Name</div>
              <div className="product__content__value">{category?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Type</div>
              <div className="product__content__value">
                {category?.type !== undefined
                  ? CategoryType[category?.type]
                  : ""}
              </div>
            </div>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="history">
          <HistoryLogs id={id as string} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Category;
