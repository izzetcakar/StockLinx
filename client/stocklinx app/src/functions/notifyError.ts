import notify from "devextreme/ui/notify";

export const notifyError = (message: string): void => {
  if (message) {
    notify({
      message: message,
      type: "error",
      displayTime: 2000,
      position: { at: "top center", my: "top center" },
      width: "auto",
    });
  }
};
