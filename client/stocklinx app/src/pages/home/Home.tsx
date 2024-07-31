import { Accordion, Grid } from "@mantine/core";
import { useProduct } from "@queryhooks";
import { Pie } from "react-chartjs-2";
import icon_disk from "@assets/icon_disk.png";
import icon_barcode from "@assets/icon_barcode.png";
import icon_keyboard from "@assets/icon_keyboard.png";
import icon_drop from "@assets/icon_drop.png";
import icon_harddisk from "@assets/icon_harddisk.png";
import icon_group from "@assets/icon_group.png";
import ProductCard from "@components/product/ProductCard";
import CustomLogs from "@components/dataGrid/customLog/CustomLogs";
import PageHeader from "@/components/generic/PageHeader";
import CompanyProductCounts from "@/components/dataGrid/product/CompanyProductCounts";
import AssetCategoryCounts from "@/components/dataGrid/product/AssetCategoryCounts";
import "chart.js/auto";
import "./home.scss";
import CenterLoader from "@/components/mantine/CenterLoader";

const Home = () => {
  const { data: entityCounts, isRefetching: entityLoading } =
    useProduct.GetEntityCounts();
  const { data: productStatusCounts, isRefetching: productStatusLoading } =
    useProduct.GetStatusCounts();

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

  const customLogAc = [
    <Accordion.Item key="custom-log-accordion" value="custom-log">
      <Accordion.Control>Recent Activities</Accordion.Control>
      <Accordion.Panel>
        <CustomLogs
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        />
      </Accordion.Panel>
    </Accordion.Item>,
  ];

  const pieAc = [
    <Accordion.Item key="pie-accordion" value="pie">
      <Accordion.Control>Assets by Status</Accordion.Control>
      <Accordion.Panel>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {entityLoading || productStatusLoading ? (
            <div style={{ height: "560px" }}>
              <CenterLoader />
            </div>
          ) : (
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
          )}
        </div>
      </Accordion.Panel>
    </Accordion.Item>,
  ];

  const companyProductCountsAc = [
    <Accordion.Item
      key="company-product-counts-accordion"
      value="company-product-counts"
    >
      <Accordion.Control>Asset Locations</Accordion.Control>
      <Accordion.Panel>
        <CompanyProductCounts />
      </Accordion.Panel>
    </Accordion.Item>,
  ];

  const assetCategoryCountsAc = [
    <Accordion.Item
      key="asset-category-counts-accordion"
      value="asset-category-counts"
    >
      <Accordion.Control>Asset Categories</Accordion.Control>
      <Accordion.Panel>
        <AssetCategoryCounts />
      </Accordion.Panel>
    </Accordion.Item>,
  ];

  return (
    <>
      <PageHeader title="Home" />
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
      <Grid gutter="xl" align="start">
        <Grid.Col span={{ base: 12, md: 6, lg: 12 }}>
          <Accordion
            defaultValue="custom-log"
            chevronPosition="right"
            radius="md"
            variant="contained"
          >
            {customLogAc}
          </Accordion>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Accordion
            defaultValue="pie"
            chevronPosition="right"
            radius="md"
            variant="contained"
          >
            {pieAc}
          </Accordion>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Accordion
            defaultValue="company-product-counts"
            chevronPosition="right"
            radius="md"
            variant="contained"
          >
            {companyProductCountsAc}
          </Accordion>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 12 }}>
          <Accordion
            defaultValue="asset-category-counts"
            chevronPosition="right"
            radius="md"
            variant="contained"
          >
            {assetCategoryCountsAc}
          </Accordion>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Home;
