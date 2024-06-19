import { useNavigate, useParams } from "react-router-dom";
import { Anchor, Tabs } from "@mantine/core";
import HistoryLogs from "@components/dataGrid/customLog/HistoryLogs";
import { useLicense } from "@/hooks/license";
import { useCompany } from "@/hooks/company";
import { useCategory } from "@/hooks/category";
import { useManufacturer } from "@/hooks/manufacturer";
import { useSupplier } from "@/hooks/supplier";

const License = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: license } = useLicense.Get(id as string);
  const { data: companies } = useCompany.GetAll();
  const { data: categories } = useCategory.GetAll();
  const { data: manufacturers } = useManufacturer.GetAll();
  const { data: suppliers } = useSupplier.GetAll();

  return (
    <div className="product__container">
      <div className="product__container__title">License - {license?.name}</div>
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
                  companies?.find((company) => company.id === license?.companyId)
                    ?.name
                }
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Name</div>
              <div className="product__content__value">{license?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Category</div>
              <div className="product__content__value">
                {
                  categories?.find(
                    (category) => category.id === license?.categoryId
                  )?.name
                }
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Manufacturer</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() =>
                    navigate(`/manufacturer/${license?.manufacturerId}`)
                  }
                  target="_blank"
                  underline="always"
                >
                  {
                    manufacturers?.find(
                      (manufacturer) =>
                        manufacturer.id === license?.manufacturerId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Supplier</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() => navigate(`/supplier/${license?.supplierId}`)}
                  target="_blank"
                  underline="always"
                >
                  {
                    suppliers?.find(
                      (supplier) => supplier.id === license?.supplierId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Product Key</div>
              <div className="product__content__value">
                {license?.licenseKey}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Licensed to Email</div>
              <div className="product__content__value">
                {license?.licenseEmail}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Licensed to</div>
              <div className="product__content__value">
                {license?.licensedTo}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Order No</div>
              <div className="product__content__value">{license?.orderNo}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Purchase Date</div>
              <div className="product__content__value">
                {license?.purchaseDate?.toString()}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Purchase Cost</div>
              <div className="product__content__value">
                {license?.purchaseCost}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Quantity</div>
              <div className="product__content__value">
                {license?.quantity || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Avaliable Quantity</div>
              <div className="product__content__value">
                {license?.availableQuantity || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Maintained</div>
              <div className="product__content__value">
                {license?.maintained}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Reassignable</div>
              <div className="product__content__value">
                {license?.reassignable}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Check In Count</div>
              <div className="product__content__value">
                {license?.checkInCounter || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Check Out Count</div>
              <div className="product__content__value">
                {license?.checkOutCounter || 0}
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

export default License;
