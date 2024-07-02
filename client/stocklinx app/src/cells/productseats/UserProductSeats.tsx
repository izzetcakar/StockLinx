import Gridtable from "@/components/gridTable/GridTable";
import { useUserProduct } from "@/hooks/query/userProduct";
import { userSeatColumns } from "./UserSeatColumns";
import { UserProductCheckOutDto } from "@/interfaces/dtos";

interface UserSeatProps {
  productIdField: string;
  productId: string;
  checkOut: (data: UserProductCheckOutDto) => void;
}

const UserProductSeats: React.FC<UserSeatProps> = ({
  productIdField,
  productId,
  checkOut,
}) => {
  const columns = userSeatColumns(checkOut).columns;
  const { data: userProducts } = useUserProduct.GetAll();

  const getData = () => {
    return userProducts?.filter((u) => u[productIdField] === productId) || [];
  };

  return <Gridtable itemKey="id" data={getData()} columns={columns} />;
};

export default UserProductSeats;
