import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { GenericProvider } from "./context/GenericContext.tsx";
import { GenericStateProvider } from "./components/gridTable/context/GenericStateContext.tsx";

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
      <GenericProvider>
        <GenericStateProvider>
          <ModalsProvider>
            <Notifications w={"fit-content"} position="top-right" />
            <App />
          </ModalsProvider>
        </GenericStateProvider>
      </GenericProvider>
    </Provider>
  </MantineProvider>
);
