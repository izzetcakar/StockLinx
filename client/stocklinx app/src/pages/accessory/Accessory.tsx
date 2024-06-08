import { useNavigate, useParams } from "react-router-dom";
import { Anchor, Tabs } from "@mantine/core";
import HistoryLogs from "@components/dataGrid/customLog/HistoryLogs";
import "../product.scss";
import { useAccessory } from "@/queryhooks/accessory";
import { useBranch } from "@/queryhooks/branch";
import { useCategory } from "@/queryhooks/category";
import { useManufacturer } from "@/queryhooks/manufacturer";
import { useSupplier } from "@/queryhooks/supplier";

const Accessory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: accessory } = useAccessory.Get(id as string);
  const { data: branches } = useBranch.GetAll();
  const { data: categories } = useCategory.GetAll();
  const { data: manufacturers } = useManufacturer.GetAll();
  const { data: suppliers } = useSupplier.GetAll();

  return (
    <div className="product__container">
      <div className="product__container__title">
        Accessory - {accessory?.name}
      </div>
      <Tabs defaultValue="info">
        <Tabs.List grow>
          <Tabs.Tab value="info">Info</Tabs.Tab>
          <Tabs.Tab value="history">History</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <div className="product__content__container">
            <div className="product__content">
              <div className="product__content__title">Branch</div>
              <div className="product__content__value">
                {
                  branches?.find((branch) => branch.id === accessory?.branchId)
                    ?.name
                }
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Name</div>
              <div className="product__content__value">{accessory?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Category</div>
              <div className="product__content__value">
                {
                  categories?.find(
                    (category) => category.id === accessory?.categoryId
                  )?.name
                }
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Manufacturer</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() =>
                    navigate(`/manufacturer/${accessory?.manufacturerId}`)
                  }
                  target="_blank"
                  underline="always"
                >
                  {
                    manufacturers?.find(
                      (manufacturer) =>
                        manufacturer.id === accessory?.manufacturerId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Supplier</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() => navigate(`/supplier/${accessory?.supplierId}`)}
                  target="_blank"
                  underline="always"
                >
                  {
                    suppliers?.find(
                      (supplier) => supplier.id === accessory?.supplierId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Model No</div>
              <div className="product__content__value">
                {accessory?.modelNo}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Order No</div>
              <div className="product__content__value">
                {accessory?.orderNo}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Purchase Date</div>
              <div className="product__content__value">
                {accessory?.purchaseDate?.toString()}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Purchase Cost</div>
              <div className="product__content__value">
                {accessory?.purchaseCost}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Quantity</div>
              <div className="product__content__value">
                {accessory?.quantity || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Avaliable Quantity</div>
              <div className="product__content__value">
                {accessory?.availableQuantity || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Check In Count</div>
              <div className="product__content__value">
                {accessory?.checkInCounter || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Check Out Count</div>
              <div className="product__content__value">
                {accessory?.checkOutCounter || 0}
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

export default Accessory;
