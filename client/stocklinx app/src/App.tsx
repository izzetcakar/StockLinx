import { checkEmpty } from "./functions/checkEmpty";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./app.scss";
import Accessory from "./pages/accessory/Accessory";
import Asset from "./pages/asset/Asset";
import Component from "./pages/component/Component";
import Consumable from "./pages/consumable/Consumable";
import Home from "./pages/home/Home";
import License from "./pages/license/License";
import Model from "./pages/model/Model";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./pages/user/Login";
import Department from "./pages/department/Department";
import Company from "./pages/company/Company";
import { useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";
import Header from "./components/Header/Header";
import Generic from "./pages/generic/Generic";
import Category from "./pages/category/Category";
import Manufacturer from "./pages/manufacturer/Manufacturer";
import Supplier from "./pages/supplier/Supplier";
import Location from "./pages/location/Location";
import ProductStatus from "./pages/productStatus/ProductStatus";
import Branch from "./pages/branch/Branch";
import User from "./pages/user/User";
import CustomFields from "./pages/customFields/CustomFields";
import { LoadingOverlay } from "@mantine/core";

const Layout = () => {
  const userRedux = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.generic.loading);

  if (checkEmpty(userRedux)) {
    return (
      <div className="main-container">
        <div>
          <Sidebar />
        </div>
        <div className="page">
          <Header />
          <div className="page-content">
            <Outlet />
          </div>
        </div>
        <LoadingOverlay visible={loading > 0} zIndex={1000} />
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
        path: "/accessory",
        element: <Accessory />,
      },
      {
        path: "/asset",
        element: <Asset />,
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
        path: "/license",
        element: <License />,
      },
      {
        path: "/model",
        element: <Model />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/manufacturer",
        element: <Manufacturer />,
      },
      {
        path: "/supplier",
        element: <Supplier />,
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "/branch",
        element: <Branch />,
      },
      {
        path: "/department",
        element: <Department />,
      },
      {
        path: "/location",
        element: <Location />,
      },
      {
        path: "/productstatus",
        element: <ProductStatus />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/customfields",
        element: <CustomFields />,
      },
      {
        path: "/generic",
        element: <Generic />,
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
