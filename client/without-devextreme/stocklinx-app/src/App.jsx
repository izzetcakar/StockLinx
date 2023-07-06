import React from "react";
import { checkEmpty } from "./functions/checkEmpty";
import { AuthProvider, useAuth } from "./contexts/auth";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import LoadPanel from "devextreme-react/load-panel";
import "./app.scss";
import Accessory from "./pages/accessory/Accessory.jsx";
import Asset from "./pages/asset/Asset.jsx";
import Component from "./pages/component/Component.jsx";
import Consumable from "./pages/consumable/Consumable.jsx";
import Generic from "./pages/generic/Generic.jsx";
import Home from "./pages/home/Home.jsx";
import License from "./pages/license/License.jsx";
import Model from "./pages/model/Model.jsx";
import Department from "./pages/people/Department.jsx";
import User from "./pages/people/User.jsx";
import Sidebar from "./components/sidebar/Sidebar";
import LoginForm from "./components/login-form/LoginForm";
import CreateAccountForm from "./components/create-account-form/CreateAccountForm";
import { useSelector } from "react-redux";

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
  const { loading } = useAuth();

  if (loading) {
    return <LoadPanel visible={true} />;
  }

  if (checkEmpty(userRedux)) {
    return (
      <div className="main-container">
        <Sidebar />
        <div className="page">
          <Outlet />
        </div>
      </div>
    );
  }

  return <LoginForm />;
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
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <CreateAccountForm />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
