import { useNavigate, useParams } from "react-router-dom";
import { Anchor, Tabs } from "@mantine/core";
import { useComponent } from "@/hooks/query/component";
import { useCompany } from "@/hooks/query/company";
import { useCategory } from "@/hooks/query/category";
import { useSupplier } from "@/hooks/query/supplier";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: component } = useComponent.Get(id as string);
  const { data: companies } = useCompany.GetAll();
  const { data: categories } = useCategory.GetAll();
  const { data: suppliers } = useSupplier.GetAll();

  return (
    <div className="product__container">
      <div className="product__container__title">
        Component - {component?.name}
      </div>
      <Tabs defaultValue="info">
        <Tabs.List grow>
          <Tabs.Tab value="info">Info</Tabs.Tab>
          <Tabs.Tab value="history">History</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <div className="product__content__container">
            <div className="product__content">
              <div className="product__content__title">Company</div>
              <div className="product__content__value">
                {
                  companies?.find(
                    (company) => company.id === component?.companyId
                  )?.name
                }
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Name</div>
              <div className="product__content__value">{component?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Category</div>
              <div className="product__content__value">
                {
                  categories?.find(
                    (category) => category.id === component?.categoryId
                  )?.name
                }
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Supplier</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() => navigate(`/supplier/${component?.supplierId}`)}
                  target="_blank"
                  underline="always"
                >
                  {
                    suppliers?.find(
                      (supplier) => supplier.id === component?.supplierId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Serial No</div>
              <div className="product__content__value">
                {component?.serialNo}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Order No</div>
              <div className="product__content__value">
                {component?.orderNo}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Purchase Date</div>
              <div className="product__content__value">
                {component?.purchaseDate?.toString()}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Purchase Cost</div>
              <div className="product__content__value">
                {component?.purchaseCost}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Quantity</div>
              <div className="product__content__value">
                {component?.quantity || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Avaliable Quantity</div>
              <div className="product__content__value">
                {component?.availableQuantity || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Check In Count</div>
              <div className="product__content__value">
                {component?.checkInCounter || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Check Out Count</div>
              <div className="product__content__value">
                {component?.checkOutCounter || 0}
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

export default Component;
