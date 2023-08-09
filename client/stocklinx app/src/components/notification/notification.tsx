import { notifications } from "@mantine/notifications"

export const openNotification = (message: string, loading: boolean) => {
    notifications.show({
        id: "notification",
        loading: loading,
        message: message,
        autoClose: !loading,
        withCloseButton: !loading,
    });
};
export const closeNotification = () => {
    notifications.hide("notification");
}