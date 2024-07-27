import { PDFViewer, pdf } from "@react-pdf/renderer";
import SubmissionForm, {
  SubmissionFormProps,
} from "../forms/submission/SubmissionForm";
import { modals } from "@mantine/modals";

export const openSubmissionForm = async (submissionFormProps: SubmissionFormProps) => {
  const blob = await pdf(SubmissionForm(submissionFormProps)).toBlob();
  const fileURL = URL.createObjectURL(blob);
  const pdfWindow = window.open();
  if (pdfWindow) {
    pdfWindow.location.href = fileURL;
  } else {
    console.error("Window could not be opened.");
  }
};
export const viewSubmissionForm = (
  submissionFormProps: SubmissionFormProps
) => {
  const pdf = SubmissionForm(submissionFormProps);
  return <PDFViewer>{pdf}</PDFViewer>;
};
export const openSubmissionModal = (
  submissionFormProps: SubmissionFormProps
) => {
  const pdf = SubmissionForm(submissionFormProps);
  modals.open({
    modalId: "submission__modal",
    title: "Personel Zimmet Formu",
    children: (
      <PDFViewer style={{ height: "calc(100vh - 80px)" }} width={"100%"}>
        {pdf}
      </PDFViewer>
    ),
    fullScreen: true,
  });
};
