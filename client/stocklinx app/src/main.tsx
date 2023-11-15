import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider
    theme={{
      primaryShade: 9,
      cursorType: "pointer",
      radius: {
        xs: "2px",
        sm: "2px",
        md: "2px",
        lg: "2px",
        xl: "2px",
      },
      fontSizes: {
        xs: "13px",
        sm: "13px",
        md: "13px",
        lg: "13px",
        xl: "13px",
      },
    }}
  >
    <Provider store={store}>
      <ModalsProvider>
        <Notifications w={"fit-content"} position="top-right" />
        <App />
      </ModalsProvider>
    </Provider>
  </MantineProvider>
);
