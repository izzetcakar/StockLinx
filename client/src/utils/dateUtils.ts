import moment from "moment";

export const formatDate = (input: string | null | Date | undefined) => {
  if (!input || input === "") return "";
  const date = moment(input).format("DD.MM.YYYY HH:mm");
  return date;
};
