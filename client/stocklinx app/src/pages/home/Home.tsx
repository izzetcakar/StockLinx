import ProductCard from "../../components/product/ProductCard";
import "./home.scss";
import icon_disk from "../../assets/icon_disk.png";
import icon_barcode from "../../assets/icon_barcode.png";
import icon_keyboard from "../../assets/icon_keyboard.png";
import icon_drop from "../../assets/icon_drop.png";
import icon_harddisk from "../../assets/icon_harddisk.png";
import icon_group from "../../assets/icon_group.png";
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Legend,
} from "devextreme-react/pie-chart";
import DataSource from "devextreme/data/data_source";
import "devextreme/data/odata/store";
import { useState } from "react";
import icon_minus from "../../assets/icon_minus.png";
import ProductLocation from "../../components/dataGrid/ProductLocation";

const Home = () => {
  const data = [
    {
      color: "#39cccc",
      count: 2609,
      title: "assets",
      image: icon_barcode,
    },
    {
      color: "#d81b60",
      count: 111,
      title: "licenses",
      image: icon_disk,
    },
    {
      color: "#ff851b",
      count: 4,
      title: "accessories",
      image: icon_keyboard,
    },
    {
      color: "#605ca8",
      count: 4,
      title: "consumables",
      image: icon_drop,
    },
    {
      color: "#f39c12",
      count: 4,
      title: "components",
      image: icon_harddisk,
    },
    {
      color: "#3c8dbc",
      count: 62,
      title: "people",
      image: icon_group,
    },
  ];
  const [show, setShow] = useState<boolean>(true);

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Home</div>
      </div>
      <div className="product-card-container" style={{ marginBottom: "1rem" }}>
        {data.map((item, index) => {
          return (
            <ProductCard
              key={index}
              color={item.color}
              count={item.count}
              title={item.title}
              image={item.image}
            />
          );
        })}
      </div>
      <div className="home">
        {/* <div className="home-item">
          <div className="home-item-header">
            <div className="home-item-header-title">Assets by Status</div>
            <img
              className="home-item-header-icon"
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
            <PieChart
              id="pie"
              height={300}
              dataSource={
                new DataSource({
                  store: {
                    type: "odata",
                    url: "https://localhost:7000/api/Generic/prouctStatus",
                  },
                })
              }
              palette="Office"
            >
              <Series argumentField="status" valueField="count">
                <Label visible={true}>
                  <Connector visible={true} width={1} />
                </Label>
              </Series>
              <Size width={400} />
              <Legend horizontalAlignment="right" itemTextPosition="right" />
            </PieChart>
          </div>
        </div> */}
        <div className="home-item">
          <div className="home-item-header">
            <div className="home-item-header-title">Asset Locations</div>
            <img
              className="home-item-header-icon"
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
            <ProductLocation />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
