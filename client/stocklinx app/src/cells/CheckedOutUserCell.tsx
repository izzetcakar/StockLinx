import { useUserProduct } from "@/hooks/userProduct";
import { useUser } from "@/hooks/user";

const CheckedOutUserCell = (assetId: string) => {
  const { data: userProducts } = useUserProduct.GetAll();
  const { data: users } = useUser.GetAll();
  const userProduct = userProducts?.find(
    (userProduct) => userProduct?.assetId === assetId
  );
  if (!userProduct) return "";
  const user = users?.find((user) => user?.id === userProduct.userId);
  return user ? user.firstName + " " + user.lastName : "";
};

export default CheckedOutUserCell;
