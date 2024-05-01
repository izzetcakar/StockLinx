import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useEffect, useLayoutEffect } from "react";
import { companyActions } from "../../redux/company/actions";
import { branchActions } from "../../redux/branch/actions";
import { assetActions } from "../../redux/asset/actions";
import { categoryActions } from "../../redux/category/actions";
import { modelActions } from "../../redux/model/actions";
import { productStatusActions } from "../../redux/productStatus/actions";
import { Anchor, Tabs } from "@mantine/core";
import HistoryLogs from "../../components/dataGrid/customLog/HistoryLogs";
import "../product.scss";
import { supplierActions } from "../../redux/supplier/actions";

const Asset = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asset = useSelector((state: RootState) => state.asset.asset);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const models = useSelector((state: RootState) => state.model.models);
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );

  useLayoutEffect(() => {
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(categoryActions.getAll());
    dispatch(modelActions.getAll());
    dispatch(productStatusActions.getAll());
    dispatch(supplierActions.getAll());
  }, []);

  useEffect(() => {
    dispatch(assetActions.get({ id: id as string }));
  }, [id]);

  return (
    <div className="product__container">
      <div className="product__container__title">Asset - {asset?.name}</div>
      <Tabs defaultValue="info">
        <Tabs.List grow>
          <Tabs.Tab value="info">Info</Tabs.Tab>
          <Tabs.Tab value="history">History</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <div className="product__content__container">
            <div className="product__content">
              <div className="product__content__title">Status</div>
              <div className="product__content__value">
                {
                  productStatuses.find(
                    (status) => status.id === asset?.productStatusId
                  )?.name
                }
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Branch</div>
              <div className="product__content__value">
                {branches.find((branch) => branch.id === asset?.branchId)?.name}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Name</div>
              <div className="product__content__value">{asset?.name}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Serial No</div>
              <div className="product__content__value">{asset?.serialNo}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Tag No</div>
              <div className="product__content__value">{asset?.tagNo}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Category</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() =>
                    navigate(
                      `/category/${
                        models.find((model) => model.id === asset?.modelId)
                          ?.categoryId
                      }`
                    )
                  }
                  target="_blank"
                  underline="always"
                >
                  {
                    categories.find(
                      (category) =>
                        category.id ===
                        models.find((model) => model.id === asset?.modelId)
                          ?.categoryId
                    )?.name
                  }
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Model</div>
              <div className="product__content__value">
                <Anchor
                  onClick={() => navigate(`/category/${asset?.modelId}`)}
                  target="_blank"
                  underline="always"
                >
                  {models.find((model) => model.id === asset?.modelId)?.name}
                </Anchor>
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Order No</div>
              <div className="product__content__value">{asset?.orderNo}</div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Purchase Date</div>
              <div className="product__content__value">
                {asset?.purchaseDate?.toString()}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Purchase Cost</div>
              <div className="product__content__value">
                {asset?.purchaseCost}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Check In Count</div>
              <div className="product__content__value">
                {asset?.checkInCounter || 0}
              </div>
            </div>
            <div className="product__content">
              <div className="product__content__title">Check Out Count</div>
              <div className="product__content__value">
                {asset?.checkOutCounter || 0}
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

export default Asset;
