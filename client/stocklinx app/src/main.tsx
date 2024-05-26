import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./redux/store";
import inputClasses from "./mantineModules/input.module.scss";
import modalClasses from "./mantineModules/modal.module.scss";
import accordionClasses from "./mantineModules/accordion.module.scss";
import { Provider } from "react-redux";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { MantineProvider, ScrollArea } from "@mantine/core";
import { GenericProvider } from "./context/GenericContext.tsx";
import { defaultInputProps } from "./mantineModules/defaultInputProps.ts";
import { IconCaretDownFilled, IconCalendar } from "@tabler/icons-react";

const components = {
  TextInput: {
    defaultProps: defaultInputProps,
    classNames: {
      label: inputClasses.label,
    },
  },
  Select: {
    defaultProps: defaultInputProps,
    classNames: {
      label: inputClasses.label,
    },
  },
  FileInput: {
    defaultProps: defaultInputProps,
    classNames: {
      label: inputClasses.label,
    },
  },
  Textarea: {
    defaultProps: defaultInputProps,
    classNames: {
      label: inputClasses.label,
    },
  },
  NumberInput: {
    defaultProps: defaultInputProps,
    classNames: {
      label: inputClasses.label,
    },
  },
  DateInput: {
    defaultProps: {
      ...defaultInputProps,
      leftSection: <IconCalendar size="20" />,
    },
    classNames: {
      label: inputClasses.label,
    },
  },
  Checkbox: {
    defaultProps: defaultInputProps,
    classNames: {
      label: inputClasses.label,
    },
  },
  Modal: {
    defaultProps: {
      scrollAreaComponent: ScrollArea.Autosize,
    },
    classNames: {
      title: modalClasses.title,
    },
  },
  Button: {
    defaultProps: defaultInputProps,
  },
  Accordion: {
    defaultProps: {
      variant: "filled",
      chevronPosition: "left",
      chevron: <IconCaretDownFilled />,
    },
    classNames: {
      root: accordionClasses.root,
      item: accordionClasses.item,
      content: accordionClasses.content,
      label: accordionClasses.label,
      chevron: accordionClasses.chevron,
    },
  },
  Anchor: {
    defaultProps: {
      c: "#3498db",
      size: "sm",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider
    theme={{
      primaryShade: 9,
      primaryColor: "gray",
      cursorType: "pointer",
      defaultRadius: "md",
      radius: {
        xs: "0.125rem",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "1rem",
        xl: "2rem",
      },
      fontSizes: {
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
      },
      components,
    }}
  >
    <Provider store={store}>
      <GenericProvider>
        <ModalsProvider>
          <Notifications w={"fit-content"} position="top-right" />
          <App />
        </ModalsProvider>
      </GenericProvider>
    </Provider>
  </MantineProvider>
);
