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
  <Provider store={store}>
    <ModalsProvider>
      <Notifications w={"fit-content"} />
      <MantineProvider
        theme={{
          primaryShade: 9,
          cursorType: "pointer",
        }}
      >
        <App />
      </MantineProvider>
    </ModalsProvider>
  </Provider>
);
