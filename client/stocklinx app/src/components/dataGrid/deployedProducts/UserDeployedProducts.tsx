import { useDispatch, useSelector } from "react-redux";
import { useColumns } from "./columns";
import { RootState } from "../../../redux/rootReducer";
import { useEffect, useRef } from "react";
import { deployedProductActions } from "../../../redux/deployedProduct/actions";
import Gridtable from "../../gridTable/GridTable";
import { openSubmissionModal } from "../../../functions/exportSubmissionForm";

interface UserDeployedProductsProps {
  userId: string;
}
const UserDeployedProducts: React.FC<UserDeployedProductsProps> = ({
  userId,
}) => {
  const dispatch = useDispatch();
  const deployedProducts = useSelector(
    (state: RootState) => state.deployedProduct.deployedProducts
  );
  const gridtableRef: any = useRef();

  const refreshData = () => {
    dispatch(deployedProductActions.getAll());
  };

  useEffect(() => {
    refreshData();
  }, [userId]);

  return (
    <>
      <Gridtable
        itemKey="id"
        ref={gridtableRef}
        data={deployedProducts.filter((dp) => dp.userId === userId)}
        columns={useColumns()}
        enableSelectActions
      />
      <button
        onClick={() =>
          openSubmissionModal({
            userFullName: "İzzet Çakar",
            companyName: "Bilge Adam",
            branchName: "Bilgi İşlem",
            department: "Yazılım",
            userStartDate: "2021-05-05",
            userTitle: "Yazılım Uzmanı",
            products: [
              {
                category: "Bilgisayar",
                title: "Lenovo",
                description: "Lenovo Thinkpad",
              },
              {
                category: "Bilgisayar",
                title: "Lenovo",
                description: "Lenovo Thinkpad",
              },
            ],
            assignDate: "2023-12-23T18:24:45.061183Z",
            delivererFullName: "Teslimat İzzet Çakarrrrrrrrrrrrrrrrrrrrrrrr",
          })
        }
      >
        show
      </button>
    </>
  );
};

export default UserDeployedProducts;
