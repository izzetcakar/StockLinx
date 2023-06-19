import notify from "devextreme/ui/notify";
export const notifyError = (res) => {
  if (res?.payload) {
    notify({
      message: res.payload,
      type: "error",
      displayTime: 2000,
      position: "top center",
      width: "auto",
    });
  }
};
