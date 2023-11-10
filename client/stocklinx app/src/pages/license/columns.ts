import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ILicense } from "../../interfaces/interfaces";
import { Column } from "devextreme/ui/data_grid";
import { IFormItem } from "../../components/generic/BaseDataGrid";
import { checkInOutHeaderTemplate } from "../../components/dataGrid/location/customColumns";
import { Column as MyColumn } from "../../components/gridTable/interfaces/interfaces";

export const useColumns = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );
  const productStatuses = useSelector(
    (state: RootState) => state.productStatus.productStatuses
  );

  const getFilteredBranches = (options: { data?: ILicense; key?: string }) => {
    return {
      store: branches,
      filter: options.data ? ["companyId", "=", options.data.companyId] : null,
    };
  };
  const getFilteredCategories = (options: {
    data?: ILicense;
    key?: string;
  }) => {
    return {
      store: categories,
      filter: options.data ? ["branchId", "=", options.data.branchId] : null,
    };
  };
  const getFilteredProductStatuses = (options: {
    data?: ILicense;
    key?: string;
  }) => {
    return {
      store: productStatuses,
      filter: options.data ? ["branchId", "=", options.data.branchId] : null,
    };
  };
  const getFilteredManufacturers = (options: {
    data?: ILicense;
    key?: string;
  }) => {
    return {
      store: manufacturers,
      filter: options.data ? ["branchId", "=", options.data.branchId] : null,
    };
  };

  const columns: MyColumn[] = [
    {
      caption: "Name",
      dataField: "name",
      dataType: "string",
    },
    {
      caption: "License Key",
      dataField: "licenseKey",
      dataType: "string",
    },
    {
      caption: "Expiration Date",
      dataField: "expirationDate",
      dataType: "date",
    },
    {
      caption: "License Email",
      dataField: "licenseEmail",
      dataType: "string",
    },
    {
      caption: "Manufacturer",
      dataField: "manufacturerId",
      lookup: {
        dataSource: manufacturers,
        valueExpr: "id",
        displayExpr: "name",
      },
      dataType: "string",
    },
    // ADD TOTAL QUANTITY
    // ADD AVAILABLE QUANTITY
  ];

  const devColumns: Column<ILicense>[] = [
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
        newData.manufacturerId = null;
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
      dataField: "licenseKey",
      caption: "License Key",
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "expirationDate",
      caption: "Expiration Date",
    },
    {
      dataField: "licenseEmail",
      caption: "License Email",
    },
    // ADD LICENSED NAME
    {
      dataField: "manufacturerId",
      caption: "Manufacturer",
      lookup: {
        dataSource: getFilteredManufacturers,
        valueExpr: "id",
        displayExpr: "name",
      },
    },
    {
      dataField: "quantity",
      caption: "Quantity",
    },
    // VISIBLE : FALSE
    {
      dataField: "maintained",
      caption: "Maintained",
      visible: false,
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "reassignable",
      caption: "Reassignable",
      visible: false,
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "terminationDate",
      caption: "Termination Date",
      visible: false,
    },
    {
      dataField: "categoryId",
      caption: "Category",
      lookup: {
        dataSource: getFilteredCategories,
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
      validationRules: [{ type: "required" }],
    },
    {
      dataField: "serialNo",
      caption: "Serial No",
      visible: false,
    },
    {
      dataField: "orderNo",
      caption: "Order No",
      visible: false,
    },
    {
      dataField: "purchaseCost",
      caption: "Purchase Cost",
      visible: false,
    },
    {
      dataField: "purchaseDate",
      caption: "Purchase Date",
      visible: false,
    },
    {
      dataField: "notes",
      caption: "Notes",
      visible: false,
    },
    {
      caption: "Checkin/Checkout",
      alignment: "center",
      cellTemplate: checkInOutHeaderTemplate,
    },
  ];
  const formItems: IFormItem[] = [
    { dataField: "companyId" },
    { dataField: "branchId" },
    { dataField: "manufacturerId" },
    { dataField: "licenseKey" },
    { dataField: "licenseEmail" },
    { dataField: "maintained" },
    { dataField: "reassignable" },
    { dataField: "expirationDate" },
    { dataField: "terminationDate" },
    { dataField: "categoryId" },
    { dataField: "productStatusId" },
    { dataField: "name" },
    { dataField: "serialNo" },
    { dataField: "orderNo" },
    { dataField: "purchaseCost" },
    { dataField: "quantity" },
    { dataField: "purchaseDate" },
    { dataField: "notes" },
  ];

  return { columns, devColumns, formItems };
};
