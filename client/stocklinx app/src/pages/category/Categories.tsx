import { ICategory } from "../../interfaces/serverInterfaces";
import { useCategory } from "@/hooks/query/category";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/generic/PageHeader";
import {
  DataGrid,
  Pager,
  Paging,
  Scrolling,
  Toolbar,
  Item,
  Selection,
} from "devextreme-react/data-grid";
import Button from "devextreme-react/button";
import { useColumns } from "./columns";
import { openCategoryModal } from "@/utils/modalUtils";
import Gridtable from "@/components/gridTable/GridTable";
import detail_icon from "@/assets/icon_detail.png";

const Category = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();

  const { data: categories, refetch } = useCategory.GetAll();
  const { mutate: remove } = useCategory.Remove();
  const { mutate: removeRange } = useCategory.RemoveRange();

  const navigateDetail = (categoryDetails: ICategory[]) => {
    if (!categoryDetails.length) return;
    navigate("/category", { state: { categories: categoryDetails } });
  };

  return (
    <>
      <PageHeader title="Categories" />
      <DataGrid
        dataSource={categories}
        keyExpr={"id"}
        className={"dx-card"}
        columnFixing={{ enabled: true }}
        filterRow={{ visible: true }}
        selection={{
          mode: "multiple",
          showCheckBoxesMode: "always",
          selectAllMode: "page",
        }}
        allowColumnResizing
        allowColumnReordering
      >
        <Paging defaultPageSize={20} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <Scrolling mode="virtual" />
        <Toolbar>
          <Item location="before" locateInMenu="auto" widget="dxButton">
            <Button
              icon="refresh"
              onClick={() => refetch()}
              style={{ border: "none" }}
            />
          </Item>
          <Item location="before" locateInMenu="auto" widget="dxButton">
            <Button
              icon="add"
              onClick={() => refetch()}
              style={{ border: "none" }}
            />
          </Item>
          <Item location="before" locateInMenu="auto" widget="dxButton">
            <Button
              icon="trash"
              onClick={() => refetch()}
              style={{ border: "none" }}
            />
          </Item>
          <Item location="before" locateInMenu="auto" widget="dxButton">
            <Button
              icon={detail_icon}
              onClick={() => refetch()}
              style={{ border: "none" }}
              text="Details"
            />
          </Item>
        </Toolbar>
      </DataGrid>
      <Gridtable
        data={categories || []}
        itemKey="id"
        columns={columns}
        refreshData={() => refetch()}
        onRowUpdate={(c) => openCategoryModal(c as ICategory)}
        onRowInsert={() => openCategoryModal()}
        onRowRemove={(id) => remove(id)}
        onRowRemoveRange={(ids) => removeRange(ids)}
        // onApplyFilters={(filters) => filter(filters)}
        onRowDetail={(c) => navigateDetail(c as ICategory[])}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Category;
