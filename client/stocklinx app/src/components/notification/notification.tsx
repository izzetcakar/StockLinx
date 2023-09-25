import { rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons-react";

export const openNotificationLoading = (message: string) => {
  notifications.show({
    id: "notificationLoading",
    loading: true,
    message: message,
    autoClose: false,
    withCloseButton: false,
  });
};

export const closeNotification = (notification: string) => {
  notifications.hide(notification);
};

export const openNotificationSuccess = () => {
  notifications.show({
    title: "All good!",
    message: null,
    autoClose: false,
    withCloseButton: true,
    styles: () => ({
      title: { fontSize: rem(13) },
      description: { fontSize: rem(13) },
    }),
    icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
    color: "teal",
  });
};

export const openNotificationError = () => {
  notifications.show({
    title: "Bummer!",
    message: null,
    autoClose: false,
    withCloseButton: true,
    styles: () => ({
      title: { fontSize: rem(13) },
      description: { fontSize: rem(13) },
    }),
    icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
    color: "red",
  });
};

// export const openNotificationSuccess = (message: string) => {
//   notifications.show({
//     id: "notificationSuccess",
//     message: message,
//     autoClose: false,
//     withCloseButton: true,
//     styles: (theme) => ({
//       root: {
//         backgroundColor: theme.colors.green[5],
//         borderColor: theme.white[5],
//         "&::before": { backgroundColor: theme.white },
//       },

//       title: { color: theme.white },
//       description: { color: theme.white },
//       closeButton: {
//         color: theme.white,
//         "&:hover": {
//           backgroundColor: theme.colors.green[7],
//           borderColor: theme.colors.green[7],
//         },
//       },
//     }),
//   });
// };
// export const openNotificationError = (message: string) => {
//   notifications.show({
//     id: "notificationError",
//     message: message,
//     autoClose: false,
//     withCloseButton: true,
//     styles: (theme) => ({
//       root: {
//         backgroundColor: theme.colors.red[5],
//         borderColor: theme.white[5],
//         "&::before": { backgroundColor: theme.white },
//       },

//       title: { color: theme.white },
//       description: { color: theme.white },
//       closeButton: {
//         color: theme.white,
//         "&:hover": {
//           backgroundColor: theme.colors.red[7],
//           borderColor: theme.colors.red[7],
//         },
//       },
//     }),
//   });
// };
