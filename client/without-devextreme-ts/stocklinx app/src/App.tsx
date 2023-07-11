import React from "react";
import { checkEmpty } from "./functions/checkEmpty";
// import { AuthProvider, useAuth } from "./contexts/auth";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import LoadPanel from "devextreme-react/load-panel";
import "./app.scss";
import Accessory from "./pages/accessory/Accessory";
import Asset from "./pages/asset/Asset";
import Component from "./pages/component/Component";
import Consumable from "./pages/consumable/Consumable";
import Generic from "./pages/generic/Generic";
import Home from "./pages/home/Home";
import License from "./pages/license/License";
import Model from "./pages/model/Model";
import Department from "./pages/people/Department";
import User from "./pages/people/User";
import Sidebar from "./components/sidebar/Sidebar";
import Test from "./pages/Test";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const Layout = () => {
  const userRedux = {
    createdDate: "2023-06-23T10:26:20.567788Z",
    email: "admin@gmail.com",
    employeeNo: "1",
    firstName: "adminF",
    id: "b4701e6b-7170-4504-ae3a-999e40c28fe3",
    isAdmin: false,
    lastName: "adminL",
    password: "123",
  };
  // const { loading } = useAuth();

  // if (loading) {
  //   return <LoadPanel visible={true} />;
  // }

  if (checkEmpty(userRedux)) {
    return (
      <div className="main-container">
        <div>
          <Sidebar />
        </div>
        <div className="page">
          <Outlet />
        </div>
      </div>
    );
  }

  return <Login />;
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
        path: "/department",
        element: <Department />,
      },
      {
        path: "/user",
        element: <User />,
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
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App
