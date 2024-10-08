import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import inputClasses from "./mantineModules/input.module.scss";
import modalClasses from "./mantineModules/modal.module.scss";
import accordionClasses from "./mantineModules/accordion.module.scss";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { MantineProvider, ScrollArea } from "@mantine/core";
import { GenericProvider } from "./context/GenericContext.tsx";
import { defaultInputProps } from "./mantineModules/defaultInputProps.ts";
import { IconCaretDownFilled, IconCalendar } from "@tabler/icons-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { openNotificationError } from "./utils/notificationUtils.tsx";

const components = {
  TextInput: {
    defaultProps: defaultInputProps,
    classNames: {
      label: inputClasses.label,
    },
  },
  PasswordInput: {
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
  MultiSelect: {
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
      xOffset: "auto",
      size: "95%",
    },
    classNames: {
      title: modalClasses.title,
      header: modalClasses.header,
      content: modalClasses.content,
    },
  },
  Button: {
    defaultProps: defaultInputProps,
  },
  Accordion: {
    defaultProps: {
      variant: "contained",
      chevronPosition: "right",
      radius: "md",
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
  Grid: {
    defaultProps: {
      gutter: "lg",
      align: "center",
      grow: true,
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError(err) {
        openNotificationError("Error", (err as Error).message);
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider
      theme={{
        scale: 0.8,
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
          xs: "0.625rem",
          sm: "0.75rem",
          md: "0.875rem",
          lg: "1rem",
        },
        components,
      }}
    >
      <GenericProvider>
        <ModalsProvider>
          <Notifications w={"fit-content"} position="bottom-right" />
          <App />
        </ModalsProvider>
      </GenericProvider>
    </MantineProvider>
  </QueryClientProvider>
);
