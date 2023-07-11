import notify from "devextreme/ui/notify";

export const notifyError = (res: any): void => {
  if (res?.payload) {
    notify({
      message: res.payload,
      type: "error",
      displayTime: 2000,
      position: { at: "top center", my: "top center" },
      width: "auto",
    });
  }
};
