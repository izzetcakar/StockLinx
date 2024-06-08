import { useParams } from "react-router-dom";
import { CategoryType } from "@interfaces/serverInterfaces";
import { Tabs } from "@mantine/core";
import HistoryLogs from "@components/dataGrid/customLog/HistoryLogs";
import { useCategory } from "@/hooks/category";

const Category = () => {
  const { id } = useParams();
  const { data: category } = useCategory.Get(id as string);

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
