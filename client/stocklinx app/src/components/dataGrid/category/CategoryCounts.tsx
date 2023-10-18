import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../redux/category/actions";
import { useColumns } from "./columns";
import BaseDataGrid from "../../generic/BaseDataGrid";
import "devextreme/data/odata/store";
import { RootState } from "../../../redux/rootReducer";
import React, { useEffect } from "react";

interface CategoryCountsProps {
  className?: string;
  editing?: boolean;
}
const CategoryCounts: React.FC<CategoryCountsProps> = ({
  className,
  editing,
}) => {
  const dispatch = useDispatch();
  const counts = useSelector((state: RootState) => state.category.counts);

  const refreshData = () => {
    dispatch(categoryActions.getCounts());
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <BaseDataGrid
      title="Product Categories"
      data={counts}
      className={className}
      editing={editing}
      keyExpr="categoryId"
      columns={useColumns()}
      refreshData={refreshData}
    />
  );
};

export default CategoryCounts;
