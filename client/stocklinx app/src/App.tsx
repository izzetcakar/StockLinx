import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useUser } from "./hooks/query/user";
import Accessories from "./pages/accessory/Accessories";
import Assets from "./pages/asset/Assets";
import Components from "./pages/component/Components";
import Consumables from "./pages/consumable/Consumables";
import Licenses from "./pages/license/Licenses";
import Models from "./pages/model/Models";
import Departments from "./pages/department/Departments";
import Companies from "./pages/company/Companies";
import Categories from "./pages/category/Categories";
import Manufacturers from "./pages/manufacturer/Manufacturers";
import Suppliers from "./pages/supplier/Suppliers";
import Locations from "./pages/location/Locations";
import ProductStatuses from "./pages/productStatus/ProductStatuses";
import Users from "./pages/user/Users";
import CustomFields from "./pages/customFields/CustomFields";
import Home from "./pages/home/Home";
import Login from "./pages/user/Login";
import Header from "./components/Header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Generic from "./pages/generic/Generic";
import Accessory from "./pages/accessory/Accessory";
import Asset from "./pages/asset/Asset";
import Category from "./pages/category/Category";
import Company from "./pages/company/Company";
import Component from "./pages/component/Component";
import Consumable from "./pages/consumable/Consumable";
import Department from "./pages/department/Department";
import License from "./pages/license/License";
import Location from "./pages/location/Location";
import Manufacturer from "./pages/manufacturer/Manufacturer";
import Model from "./pages/model/Model";
import ProductStatus from "./pages/productStatus/ProductStatus";
import Supplier from "./pages/supplier/Supplier";
import User from "./pages/user/User";
import Permissions from "./pages/permission/Permissions";
import Employees from "./pages/employee/Employees";
import Employee from "./pages/employee/Employee";
import Test from "./pages/test/Test";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "./app.scss";
import "./base.scss";
// import 'devextreme/dist/css/dx.light.compact.css';
import "./theme.base.css";
import "./theme.additional.css";

const Layout = () => {
  const { data: user } = useUser.GetWithToken();

  if (user) {
    return (
      <div className="main__container">
        <Header />
        <div className="page">
          <Sidebar />
          <div className="page__content">
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/accessories",
        element: <Accessories />,
      },
      {
        path: "/assets",
        element: <Assets />,
      },
      {
        path: "/components",
        element: <Components />,
      },
      {
        path: "/consumables",
        element: <Consumables />,
      },
      {
        path: "/licenses",
        element: <Licenses />,
      },
      {
        path: "/models",
        element: <Models />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/manufacturers",
        element: <Manufacturers />,
      },
      {
        path: "/suppliers",
        element: <Suppliers />,
      },
      {
        path: "/companies",
        element: <Companies />,
      },
      {
        path: "/departments",
        element: <Departments />,
      },
      {
        path: "/locations",
        element: <Locations />,
      },
      {
        path: "/productstatuses",
        element: <ProductStatuses />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/employee",
        element: <Employee />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/customfields",
        element: <CustomFields />,
      },
      {
        path: "/accessory",
        element: <Accessory />,
      },
      {
        path: "/asset",
        element: <Asset />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "/component",
        element: <Component />,
      },
      {
        path: "/consumable",
        element: <Consumable />,
      },
      {
        path: "/department",
        element: <Department />,
      },
      {
        path: "/license",
        element: <License />,
      },
      {
        path: "/location",
        element: <Location />,
      },
      {
        path: "/manufacturer",
        element: <Manufacturer />,
      },
      {
        path: "/model",
        element: <Model />,
      },
      {
        path: "/productstatus",
        element: <ProductStatus />,
      },
      {
        path: "/supplier",
        element: <Supplier />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/generic",
        element: <Generic />,
      },
      {
        path: "/permissions",
        element: <Permissions />,
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
