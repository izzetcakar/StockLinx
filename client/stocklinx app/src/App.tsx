import { checkEmpty } from "./functions/checkEmpty";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";
import { LoadingOverlay } from "@mantine/core";
import { useContext } from "react";
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
import Branches from "./pages/branch/Branches";
import Users from "./pages/user/Users";
import CustomFields from "./pages/customFields/CustomFields";
import Home from "./pages/home/Home";
import Login from "./pages/user/Login";
import Header from "./components/Header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Generic from "./pages/generic/Generic";
import GenericContext from "./context/GenericContext";
import Accessory from "./pages/accessory/Accessory";
import Asset from "./pages/asset/Asset";
import Branch from "./pages/branch/Branch";
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
import "./app.scss";
import "@mantine/core/styles.css";

const Layout = () => {
  const userRedux = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.generic.loading);
  const { drawerOpened } = useContext(GenericContext);

  if (checkEmpty(userRedux)) {
    return (
      <div className="main__container">
        <div>
          <Sidebar />
        </div>
        <div className="page">
          <Header />
          <div className="page__content">
            <Outlet />
          </div>
        </div>
        <LoadingOverlay visible={loading > 0 && !drawerOpened} zIndex={1000} />
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
        path: "/branches",
        element: <Branches />,
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
        path: "/customfields",
        element: <CustomFields />,
      },
      {
        path: "/accessory/:id",
        element: <Accessory />,
      },
      {
        path: "/asset/:id",
        element: <Asset />,
      },
      {
        path: "/branch/:id",
        element: <Branch />,
      },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/company/:id",
        element: <Company />,
      },
      {
        path: "/component/:id",
        element: <Component />,
      },
      {
        path: "/consumable/:id",
        element: <Consumable />,
      },
      {
        path: "/department/:id",
        element: <Department />,
      },
      {
        path: "/license/:id",
        element: <License />,
      },
      {
        path: "/location/:id",
        element: <Location />,
      },
      {
        path: "/manufacturer/:id",
        element: <Manufacturer />,
      },
      {
        path: "/model/:id",
        element: <Model />,
      },
      {
        path: "/productstatus/:id",
        element: <ProductStatus />,
      },
      {
        path: "/supplier/:id",
        element: <Supplier />,
      },
      {
        path: "/user/:id",
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
