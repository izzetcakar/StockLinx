import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column } from "devextreme/ui/data_grid";
import { IConsumable } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import {
  alignedTemplate,
  checkInOutHeaderTemplate,
} from "../../components/dataGrid/location/customColumns";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );

  const getFilteredBranches = (options: {
    data?: IConsumable;
    key?: string;
  }) => {
    return {
      store: branches,
      filter: options.data ? ["companyId", "=", options.data.companyId] : null,
    };
  };
  const getFilteredCategories = (options: {
    data?: IConsumable;
    key?: string;
  }) => {
    return {
      store: categories,
      filter: options.data ? ["branchId", "=", options.data.branchId] : null,
    };
  };
  const getFilteredProductStatuses = (options: {
    data?: IConsumable;
    key?: string;
  }) => {
    return {
      store: productStatuses,
      filter: options.data ? ["branchId", "=", options.data.branchId] : null,
    };
  };
  const devColumns: Column<IConsumable>[] = [
    {
      dataField: "companyId",
      caption: "Company",
      lookup: {
        dataSource: companies,
        valueExpr: "id",
        displayExpr: "name",
      },
      setCellValue(newData, value) {
        newData.companyId = value;
        newData.branchId = "";
      },
      visible: false,
    },
    {
      dataField: "branchId",
      caption: "Branch",
      lookup: {
        dataSource: getFilteredBranches,
        valueExpr: "id",
        displayExpr: "name",
      },
      setCellValue(newData, value) {
        newData.branchId = value;
        newData.categoryId = null;
        newData.productStatusId = "";
      },
      validationRules: [{ type: "required" }],
      visible: false,
    },
    {
      dataField: "name",
      caption: "Name",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "categoryId",
      caption: "Category",
      lookup: {
        dataSource: getFilteredCategories,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    { dataField: "modelNo", caption: "Model No" },
    { dataField: "itemNo", caption: "Item No" },
    {
      dataField: "quantity",
      dataType: "number",
      caption: "Quantity",
      alignment: "center",
      cellTemplate: alignedTemplate,
    },
    // ADD AVAILABLE QUANTITY
    { dataField: "orderNo", caption: "Order No" },
    { dataField: "purchaseDate", caption: "Purchase Date" },
    { dataField: "purchaseCost", caption: "Purchase Cost", alignment: "left" },
    {
      caption: "Checkin/Checkout",
      alignment: "center",
      cellTemplate: checkInOutHeaderTemplate,
    },
    // VISIBLE : FALSE
    {
      dataField: "productStatusId",
      caption: "Status",
      lookup: {
        dataSource: getFilteredProductStatuses,
        valueExpr: "id",
        displayExpr: "name",
      },
      visible: false,
    },
    { dataField: "serialNo", caption: "Serial No", visible: false },
    { dataField: "note", caption: "Note", visible: false },
  ];
  const formItems: IFormItem[] = [
    { dataField: "companyId" },
    { dataField: "branchId" },
    { dataField: "name" },
    { dataField: "categoryId" },
    { dataField: "modelNo" },
    { dataField: "itemNo" },
    { dataField: "quantity" },
    { dataField: "orderNo" },
    { dataField: "productStatusId" },
    { dataField: "serialNo" },
    { dataField: "purchaseCost" },
    { dataField: "purchaseDate" },
    { dataField: "notes" },
  ];

  return { devColumns, formItems };
};
