import ProductCard from "../../components/product/ProductCard";
import "./home.scss";
import icon_disk from "../../assets/icon_disk.png";
import icon_barcode from "../../assets/icon_barcode.png";
import icon_keyboard from "../../assets/icon_keyboard.png";
import icon_drop from "../../assets/icon_drop.png";
import icon_harddisk from "../../assets/icon_harddisk.png";
import icon_group from "../../assets/icon_group.png";

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
  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Home</div>
      </div>
      <div className="product-card-container">
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
    </>
  );
};

export default Home;
