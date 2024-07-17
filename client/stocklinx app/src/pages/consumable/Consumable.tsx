import { useNavigate, useParams } from "react-router-dom";
import { Anchor, Tabs } from "@mantine/core";
import {
  useConsumable,
  useCompany,
  useCategory,
  useManufacturer,
  useSupplier,
} from "@queryhooks";
import HistoryLogs from "@/components/dataGrid/customLog/HistoryLogs";

const Consumable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: consumable } = useConsumable.Get(id as string);
  const { data: companies } = useCompany.GetAll();
  const { data: categories } = useCategory.GetAll();
  const { data: manufacturers } = useManufacturer.GetAll();
  const { data: suppliers } = useSupplier.GetAll();

  return (
    <div className="product__container">
      <div className="product__container__title">
        Consumable - {consumable?.name}
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
                    (company) => company.id === consumable?.companyId
                  )?.name
                }
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Name</div>
              <div className="product__content__value">{consumable?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Category</div>
              <div className="product__content__value">
                {
                  categories?.find(
                    (category) => category.id === consumable?.categoryId
                  )?.name
                }
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Manufacturer</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() =>
                    navigate(`/manufacturer/${consumable?.manufacturerId}`)
                  }
                  target="_blank"
                  underline="always"
                >
                  {
                    manufacturers?.find(
                      (manufacturer) =>
                        manufacturer.id === consumable?.manufacturerId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Supplier</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() =>
                    navigate(`/supplier/${consumable?.supplierId}`)
                  }
                  target="_blank"
                  underline="always"
                >
                  {
                    suppliers?.find(
                      (supplier) => supplier.id === consumable?.supplierId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Model No</div>
              <div className="product__content__value">
                {consumable?.modelNo}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Item No</div>
              <div className="product__content__value">
                {consumable?.itemNo}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Order No</div>
              <div className="product__content__value">
                {consumable?.orderNo}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Purchase Date</div>
              <div className="product__content__value">
                {consumable?.purchaseDate?.toString()}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Purchase Cost</div>
              <div className="product__content__value">
                {consumable?.purchaseCost}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Quantity</div>
              <div className="product__content__value">
                {consumable?.quantity || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Avaliable Quantity</div>
              <div className="product__content__value">
                {consumable?.availableQuantity || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Check In Count</div>
              <div className="product__content__value">
                {consumable?.checkInCounter || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Check Out Count</div>
              <div className="product__content__value">
                {consumable?.checkOutCounter || 0}
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

export default Consumable;
