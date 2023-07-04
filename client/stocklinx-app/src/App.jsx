import "./themes/generated/theme.base.css";
import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.additional.css";
import "./dx-styles.scss";
import React from "react";
import { HashRouter as Router } from "react-router-dom";
import LoadPanel from "devextreme-react/load-panel";
import { NavigationProvider } from "./contexts/navigation";
import { AuthProvider, useAuth } from "./contexts/auth";
import { useScreenSizeClass } from "./utils/media-query";
import Content from "./Content";
import UnauthenticatedContent from "./UnauthenticatedContent";
import { useSelector } from "react-redux";
import { checkEmpty } from "./functions/checkEmpty";

function App() {
  // const userRedux = useSelector((state) => state.user.user);
  const { loading } = useAuth();
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

  if (loading) {
    return <LoadPanel visible={true} />;
  }

  if (checkEmpty(userRedux)) {
    return <Content />;
  }

  return <UnauthenticatedContent />;
}

export default function Root() {
  const screenSizeClass = useScreenSizeClass();

  return (
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <div className={`app ${screenSizeClass}`}>
            <App />
          </div>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}
