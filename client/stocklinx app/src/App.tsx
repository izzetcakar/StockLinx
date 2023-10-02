import { checkEmpty } from "./functions/checkEmpty";
import 'devextreme/dist/css/dx.light.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "./app.scss";
import Accessory from "./pages/accessory/Accessory";
import Asset from "./pages/asset/Asset";
import Component from "./pages/component/Component";
import Consumable from "./pages/consumable/Consumable";
import Home from "./pages/home/Home";
import License from "./pages/license/License";
import Model from "./pages/model/Model";
import Sidebar from "./components/sidebar/Sidebar";
import Test from "./pages/Test";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Department from "./pages/department/Department";
import Company from "./pages/company/Company";
import { useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";

const Layout = () => {
  const navigate = useNavigate();
  const userRedux = useSelector((state: RootState) => state.user.user);

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
  else {
    navigate("/login");
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
        path: "/company",
        element: <Company />,
      },
      {
        path: "/department",
        element: <Department />,
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
