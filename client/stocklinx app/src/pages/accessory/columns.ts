import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Column } from "devextreme/ui/data_grid";
import { IAccessory } from "../../interfaces/interfaces";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { checkInOutHeaderTemplate } from "../../components/dataGrid/location/customColumns";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );

  const getFilteredBranches = (options: {
    data?: IAccessory;
    key?: string;
  }) => {
    return {
      store: branches,
      filter: options.data ? ["companyId", "=", options.data.companyId] : null,
    };
  };
  const getFilteredCategories = (options: {
    data?: IAccessory;
    key?: string;
  }) => {
    return {
      store: categories,
      filter: options.data ? ["branchId", "=", options.data.branchId] : null,
    };
  }
  const getFilteredManufacturers = (options: {
    data?: IAccessory;
    key?: string;
  }) => {
    return {
      store: manufacturers,
      filter: options.data ? ["branchId", "=", options.data.branchId] : null,
    };
  }
  const getFilteredSuppliers = (options: {
    data?: IAccessory;
    key?: string;
  }) => {
    return {
      store: suppliers,
      filter: options.data ? ["branchId", "=", options.data.branchId] : null,
    };
  }
  const getFilteredProductStatuses = (options: {
    data?: IAccessory;
    key?: string;
  }) => {
    return {
      store: productStatuses,
      filter: options.data ? ["branchId", "=", options.data.branchId] : null,
    };
  }

  const devColumns: Column<IAccessory>[] = [
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
      validationRules: [{ type: "required" }],
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
        newData.manufacturerId = null;
        newData.supplierId = null;
        newData.productStatusId = "";
      },
      validationRules: [{ type: "required" }],
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
    {
      dataField: "modelNo",
      caption: "Model",
    },
    { dataField: "quantity", caption: "Quantity" },
    // ADD AVAILABLE QUANTITY
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
    },
    {
      caption: "Checkin/Checkout",
      alignment: "center",
      cellTemplate: checkInOutHeaderTemplate,
    },
    //VISIBLE : FALSE
    {
      dataField: "manufacturerId",
      caption: "Manufacturer",
      lookup: {
        dataSource: getFilteredManufacturers,
        valueExpr: "id",
        displayExpr: "name",
      },
      visible: false,
    },
    {
      dataField: "supplierId",
      caption: "Supplier",
      lookup: {
        dataSource: getFilteredSuppliers,
        valueExpr: "id",
        displayExpr: "name",
      },
      visible: false,
    },
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
    { dataField: "orderNo", caption: "Order No", visible: false },
    { dataField: "purchaseDate", caption: "Purchase Date", visible: false },
    { dataField: "warrantyDate", caption: "Warranty Date", visible: false },
    { dataField: "notes", caption: "Notes", visible: false },
  ];
  const formItems: IFormItem[] = [
    { dataField: "companyId" },
    { dataField: "branchId" },
    { dataField: "name" },
    { dataField: "manufacturerId" },
    { dataField: "supplierId" },
    { dataField: "quantity" },
    { dataField: "warrantyDate" },
    { dataField: "categoryId" },
    { dataField: "productStatusId" },
    { dataField: "serialNo" },
    { dataField: "orderNo" },
    { dataField: "purchaseCost" },
    { dataField: "purchaseDate" },
    { dataField: "notes" },
  ];
  return { devColumns, formItems };
};
