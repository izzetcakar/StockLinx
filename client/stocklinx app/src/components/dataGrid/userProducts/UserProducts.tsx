import { useColumns } from "./columns";
import { useRef } from "react";
import { openSubmissionModal } from "../../../utils/submissionUtils";
import { useUserProduct } from "@/hooks/userProduct";
import Gridtable from "../../gridTable/GridTable";

interface UserProductsPageProps {
  userId: string;
}
const UserProductsPage: React.FC<UserProductsPageProps> = ({ userId }) => {
  const gridtableRef: any = useRef();
  const { data: userProducts } = useUserProduct.GetAll();

  return (
    <>
      <Gridtable
        itemKey="id"
        ref={gridtableRef}
        data={userProducts?.filter((dp) => dp.userId === userId) || []}
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
