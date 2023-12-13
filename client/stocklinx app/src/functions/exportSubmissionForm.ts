import { pdf } from "@react-pdf/renderer";
import SubmissionForm from "../forms/SubmissionForm";

export const handlePdf = async () => {
  const blob = await pdf(SubmissionForm()).toBlob();
  const fileURL = URL.createObjectURL(blob);
  const pdfWindow = window.open();
  if (pdfWindow) {
    pdfWindow.location.href = fileURL;
  } else {
    console.error("Window could not be opened.");
  }
};
