import icon_next from "../../assets/icon_next.png";
import "./product.scss";

interface ProductCardProps {
  color: string;
  count: number;
  title: string;
  image: string;
}
const ProductCard: React.FC<ProductCardProps> = ({
  color = "#39cccc",
  count = 20,
  title = "title",
  image = "",
}) => {
  return (
    <div className="product-card" style={{ backgroundColor: color }}>
      <div className="product-card-content">
        <div className="product-card-content-count">{count}</div>
        <div className="product-card-content-title">{title}</div>
      </div>
      <div className="product-card-action">
        <div className="product-card-action-title">view all</div>
        <img className="product-card-action-icon" src={icon_next} />
      </div>
      <div className="product-card-image">
        <img src={image}></img>
      </div>
    </div>
  );
};

export default ProductCard;
