import { SubmissionFormProps } from "@/forms/submission/SubmissionForm";
import { openSubmissionForm } from "@/utils/submissionUtils";
import { Flex, Select } from "@mantine/core";
import { useState } from "react";
import { Editor, exportToBlob, Tldraw, TLUiComponents } from "tldraw";
import "tldraw/tldraw.css";

const SignCanva = ({ formProps }: { formProps: SubmissionFormProps }) => {
  const [userEditor, setUserEditor] = useState<Editor>();
  const [employeeEditor, setEmployeeEditor] = useState<Editor>();
  const [checkType, setCheckType] = useState<string>("CHECKIN");

  const handleSignImages = async () => {
    if (!userEditor || !employeeEditor) return;
    const userShapeIds = userEditor.getCurrentPageShapeIds();
    const employeeShapeIds = employeeEditor.getCurrentPageShapeIds();
    const userSign = await exportToBlob({
      editor: userEditor,
      ids: [...userShapeIds],
      format: "png",
      opts: { background: false },
    });
    const employeeSign = await exportToBlob({
      editor: employeeEditor,
      ids: [...employeeShapeIds],
      format: "png",
      opts: { background: false },
    });
    openSubmissionForm({
      ...formProps,
      userSign,
      employeeSign,
      checkType,
    });
  };

  const components: TLUiComponents = {
    DebugMenu: null,
    DebugPanel: null,
    MenuPanel: null,
    StylePanel: null,
    ZoomMenu: null,
    Minimap: null,
  };
  return (
    <Flex
      style={{ minHeight: "500px", height: "100vh", width: "100%" }}
      gap="lg"
      direction="column"
    >
      <div className="canvas__title">User Sign</div>
      <div className="canvas">
        <Tldraw
          onMount={(editor) => {
            setEmployeeEditor(editor);
          }}
          components={components}
        />
      </div>
      <div className="canvas__title">Employee Sign</div>
      <div className="canvas">
        <Tldraw
          onMount={(editor) => {
            setUserEditor(editor);
          }}
          components={components}
        />
      </div>
      <Flex align="center" gap="sm" w="100%">
        <Select
          value={checkType}
          data={[
            { value: "CHECKIN", label: "Check In" },
            { value: "CHECKOUT", label: "Check Out" },
          ]}
          color="gray"
          variant="filled"
          onChange={(value) => setCheckType(value as string)}
          style={{
            width: "50%",
          }}
        />
        <button
          className="sign__submit__btn"
          onClick={() => handleSignImages()}
        >
          Submit
        </button>
      </Flex>
    </Flex>
  );
};

export default SignCanva;
