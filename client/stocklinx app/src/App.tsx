import { checkEmpty } from "./functions/checkEmpty";
import "devextreme/dist/css/dx.light.compact.css";
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
import { LoadPanel } from "devextreme-react/load-panel";
import Header from "./components/Header/Header";
import Generic from "./pages/generic/Generic";

const Layout = () => {
  const navigate = useNavigate();
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
        <LoadPanel
          shadingColor={"rgba(0, 0, 0, 0.206)"}
          visible={loading > 0}
          showIndicator={true}
          shading={true}
          showPane={true}
        />
      </div>
    );
  } else {
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
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
