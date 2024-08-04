import { useNavigate } from "react-router-dom";
import "./product.scss";
import CenterLoader from "../mantine/CenterLoader";

interface ProductCardProps {
  color: string;
  count: number;
  title: string;
  image: string;
  nav: string;
  loading: boolean;
}
const ProductCard: React.FC<ProductCardProps> = ({
  color = "#39cccc",
  count = 20,
  title = "title",
  image = "",
  nav = "/",
  loading = false,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="product__card"
      style={{ backgroundColor: color }}
      onClick={() => navigate(nav)}
    >
      {loading ? (
        <CenterLoader color="white" />
      ) : (
        <div>
          <div className="product__card__content">
            <div className="content__title">{title}</div>
            <div className="content__count">{count}</div>
          </div>
          <div className="product__card__image">
            <img src={image}></img>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
