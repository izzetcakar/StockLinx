import { useColumns } from "./columns";
import { openSubmissionModal } from "../../../utils/submissionUtils";
import { useUserProduct } from "@/hooks/userProduct";
import Gridtable from "../../gridTable/GridTable";

interface UserProductsPageProps {
  userId: string;
}
const UserProductsPage: React.FC<UserProductsPageProps> = ({ userId }) => {
  const { data: userProducts } = useUserProduct.GetAll();

  return (
    <>
      <Gridtable
        itemKey="id"
        data={userProducts?.filter((dp) => dp.userId === userId) || []}
        columns={useColumns()}
        enableSelectActions
      />
      <button
        onClick={() =>
          openSubmissionModal({
            userFullName: "İzzet Çakar",
            companyName: "Bilge Adam",
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
