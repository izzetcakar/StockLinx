import { useState } from "react";
import { useProduct } from "@/hooks/product";
import { Pie } from "react-chartjs-2";
import icon_disk from "@assets/icon_disk.png";
import icon_barcode from "@assets/icon_barcode.png";
import icon_keyboard from "@assets/icon_keyboard.png";
import icon_drop from "@assets/icon_drop.png";
import icon_harddisk from "@assets/icon_harddisk.png";
import icon_group from "@assets/icon_group.png";
import icon_minus from "@assets/icon_minus.png";
import ProductCard from "@components/product/ProductCard";
import LocationsCounts from "@components/dataGrid/location/LocationsCounts";
import CategoryCounts from "@components/dataGrid/category/CategoryCounts";
import CustomLogs from "@components/dataGrid/customLog/CustomLogs";
import PageHeader from "@/components/generic/PageHeader";
import "chart.js/auto";
import "./home.scss";

const Home = () => {
  const { data: entityCounts } = useProduct.GetEntityCounts();
  const { data: productStatusCounts } = useProduct.GetProductStatusCounts();

  const entityData = [
    {
      color: "#39cccc",
      count: 0,
      title: "Assets",
      nav: "/assets",
      entity: "Asset",
      image: icon_barcode,
    },
    {
      color: "#d81b60",
      count: 0,
      title: "Licenses",
      nav: "/licenses",
      entity: "License",
      image: icon_disk,
    },
    {
      color: "#ff851b",
      count: 0,
      title: "Accessories",
      nav: "/accessories",
      entity: "Accessory",
      image: icon_keyboard,
    },
    {
      color: "#605ca8",
      count: 0,
      title: "Consumables",
      nav: "/consumables",
      entity: "Consumable",
      image: icon_drop,
    },
    {
      color: "#f39c12",
      count: 0,
      title: "Components",
      nav: "/components",
      entity: "Component",
      image: icon_harddisk,
    },
    {
      color: "#3c8dbc",
      count: 0,
      title: "People",
      nav: "/users",
      entity: "User",
      image: icon_group,
    },
  ];
  const handleProductCardData = () => {
    return entityData.map((item) => {
      const newCount = entityCounts?.find((e) => e.entityName === item.entity);
      return {
        ...item,
        count: newCount ? newCount.count : 0,
      };
    });
  };

  const [show, setShow] = useState<boolean>(true);

  return (
    <>
      <PageHeader title="Home" enableCompanyDrawer />
      <div className="product-card-container" style={{ marginBottom: "1rem" }}>
        {handleProductCardData().map((item, index) => {
          return (
            <ProductCard
              key={index}
              color={item.color}
              count={item.count}
              title={item.title}
              image={item.image}
              nav={item.nav}
            />
          );
        })}
      </div>
      <div className="home">
        <div className="home-item">
          <div className="home-item__header">
            <div className="home-item__header__title">Recent Activity</div>
            <img
              className="home-item__header-icon"
              src={icon_minus}
              onClick={() => setShow((prev) => !prev)}
            />
          </div>
          <hr className="home-item-wrapper" />
          <div
            className={
              show ? "home-item-content" : "home-item-content-collapsed"
            }
          >
            <CustomLogs />
          </div>
        </div>
        <div className="home-item">
          <div className="home-item__header">
            <div className="home-item__header__title">Assets by Status</div>
            <img
              className="home-item__header-icon"
              src={icon_minus}
              onClick={() => setShow((prev) => !prev)}
            />
          </div>
          <hr className="home-item-wrapper" />
          <div
            className={
              show
                ? "home-item-content withBorder"
                : "home-item-content-collapsed"
            }
          >
            <Pie
              data={{
                labels: productStatusCounts?.map((item) => item.status),
                datasets: [
                  {
                    data: productStatusCounts?.map((item) => item.count),
                    backgroundColor: [
                      "#36A2EB",
                      "#8542b2",
                      "#FFCE56",
                      "#db3d44",
                      "#FF6384",
                      "#FFCE56",
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
        <div className="home-item">
          <div className="home-item__header">
            <div className="home-item__header__title">Asset Locations</div>
            <img
              className="home-item__header-icon"
              src={icon_minus}
              onClick={() => setShow((prev) => !prev)}
            />
          </div>
          <hr className="home-item-wrapper" />
          <div
            className={
              show ? "home-item-content" : "home-item-content-collapsed"
            }
          >
            <LocationsCounts />
          </div>
        </div>
        <div className="home-item">
          <div className="home-item__header">
            <div className="home-item__header__title">Asset Categories</div>
            <img
              className="home-item__header-icon"
              src={icon_minus}
              onClick={() => setShow((prev) => !prev)}
            />
          </div>
          <hr className="home-item-wrapper" />
          <div
            className={
              show ? "home-item-content" : "home-item-content-collapsed"
            }
          >
            <CategoryCounts />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
