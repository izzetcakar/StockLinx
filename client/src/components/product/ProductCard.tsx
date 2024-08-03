import { useNavigate } from "react-router-dom";
// import icon_next from "@assets/icon_next.png";
import "./product.scss";

interface ProductCardProps {
  color: string;
  count: number;
  title: string;
  image: string;
  nav: string;
}
const ProductCard: React.FC<ProductCardProps> = ({
  color = "#39cccc",
  count = 20,
  title = "title",
  image = "",
  nav = "/",
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      style={{ backgroundColor: color }}
      onClick={() => navigate(nav)}
    >
      <div className="product-card-content">
        <div className="product-card-content-count">{count}</div>
        <div className="product-card-content__title">{title}</div>
      </div>
      {/* <div className="product-card-action">
        <div className="product-card-action__title">view all</div>
        <img className="product-card-action-icon" src={icon_next} />
      </div> */}
      <div className="product-card-image">
        <img src={image}></img>
      </div>
    </div>
  );
};

export default ProductCard;