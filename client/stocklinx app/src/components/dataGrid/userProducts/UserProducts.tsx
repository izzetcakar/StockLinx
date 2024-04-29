import { useDispatch, useSelector } from "react-redux";
import { useColumns } from "./columns";
import { RootState } from "../../../redux/rootReducer";
import { useEffect, useRef } from "react";
import { userProductActions } from "../../../redux/userProduct/actions";
import { openSubmissionModal } from "../../../functions/exportSubmissionForm";
import Gridtable from "../../gridTable/GridTable";

interface UserProductsPageProps {
  userId: string;
}
const UserProductsPage: React.FC<UserProductsPageProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector(
    (state: RootState) => state.userProduct.userProducts
  );
  const gridtableRef: any = useRef();

  const refreshData = () => {
    dispatch(userProductActions.getAll());
  };

  useEffect(() => {
    refreshData();
  }, [userId]);

  return (
    <>
      <Gridtable
        itemKey="id"
        ref={gridtableRef}
        data={userProducts.filter((dp) => dp.userId === userId)}
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

export default UserProductsPage;
