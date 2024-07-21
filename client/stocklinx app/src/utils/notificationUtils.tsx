import { rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const openNotificationLoading = (message: string) => {
  notifications.show({
    id: "notification-loading",
    loading: true,
    message: message,
    autoClose: false,
    withCloseButton: false,
  });
};

export const closeNotification = (notification: string) => {
  notifications.hide(notification);
};

export const closeAllNotifications = () => {
  notifications.cleanQueue();
};

export const openNotificationSuccess = (message: string) => {
  notifications.show({
    id: "notification-success",
    title: message,
    message: null,
    autoClose: 2000,
    withCloseButton: true,
    styles: () => ({
      title: { fontSize: rem(14) },
      description: { fontSize: rem(14) },
      root: {
        padding: rem(15),
        marginBottom: rem(20),
        border: "1px solid #d9d9d9",
      },
    }),
    icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
    color: "teal",
  });
};

export const openNotificationError = (title: string, message: string) => {
  notifications.show({
    id: "notification-error",
    title: title,
    message: message,
    autoClose: 2000,
    withCloseButton: true,
    styles: () => ({
      title: { fontSize: rem(16) },
      description: { fontSize: rem(16) },
      root: {
        padding: rem(15),
        marginBottom: rem(20),
        border: "1px solid #d9d9d9",
      },
    }),
    icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
    color: "red",
  });
};
