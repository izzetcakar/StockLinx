import { useNavigate } from "react-router-dom";
import { ICategory } from "@/interfaces/serverInterfaces";
import PageHeader from "@/components/generic/PageHeader";

const Category = () => {
  const navigate = useNavigate();

  const navigateDetail = (categoryDetails: ICategory[]) => {
    if (!categoryDetails || categoryDetails.length === 0) return;
    navigate("/category", { state: { categories: categoryDetails } });
  };

  return (
    <>
      <PageHeader title="Categories" />
    </>
  );
};

export default Category;
