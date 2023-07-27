import React, { useRef, useState } from "react";
import "./accessory.scss";
import { modals } from '@mantine/modals';
import TestForm from "../../components/form/TestForm";
import AccessoryForm from "../../components/form/AccessoryEditForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { IAccessory } from "../../interfaces/interfaces";
import { useAppDispatch } from "../../hooks";
import { clearAccessory, setAccessory } from "../../redux/accessoryReducer";

const Accessory = () => {
  const dispatch = useAppDispatch();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [showColumnLines, setShowColumnLines] = useState<boolean>(false);
  const TitleComponent: React.FC<{ value: string }> = ({ value }) => {
    return <div style={{ fontWeight: "bold" }}>{value}</div>;
  };
  const AppComponent: React.FC<{ value: number }> = ({ value }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {value}
      </div>
    );
  };
  const columns = [
    {
      dataField: "Owner",
      caption: "Owner",
      dataType: "string",
      renderComponent: TitleComponent,
    },
    { dataField: "LastCheck", caption: "Last Check", dataType: "string" },
    { dataField: "OSversion", caption: "OS Version", dataType: "string" },
    {
      dataField: "PasswordManager",
      caption: "Password Manager",
      dataType: "boolean",
    },
    { dataField: "HDencrypted", caption: "HD Encrypted", dataType: "boolean" },
    { dataField: "AVinstalled", caption: "AV Installed", dataType: "boolean" },
    {
      dataField: "Apllications",
      caption: "Apllications",
      dataType: "number",
      renderComponent: AppComponent,
    },
  ];
  const data = [
    {
      Owner: "Madison Carter",
      LastCheck: null,
      OSversion: "Mac OS X 10.14.4",
      PasswordManager: true,
      HDencrypted: true,
      AVinstalled: true,
      Apllications: 675,
    },
    {
      Owner: "Madison Carter",
      LastCheck: "2 hours ago",
      OSversion: "Mac OS X 10.16",
      PasswordManager: false,
      HDencrypted: true,
      AVinstalled: true,
      Apllications: 275,
    },
    {
      Owner: "Madison Carter",
      LastCheck: "3 hours ago",
      OSversion: "Mac OS X 10.16",
      PasswordManager: false,
      HDencrypted: true,
      AVinstalled: true,
      Apllications: 265,
    },
  ];
  const handleFormVisible = () => {
    setFormVisible((prevFormVisible) => !prevFormVisible);
  };
  const onStartEdit = (row: object) => {
    dispatch(setAccessory(row as IAccessory));
  };
  const onRowInsert = () => {
    console.log("insert");
    clearAccessory();
    openEditModel();
  };
  const onRowUpdate = (row: object) => {
    console.log(row);
    openEditModel();
  };
  const onRowDelete = (row: object) => {
    console.log("delete", row);
  };
  const handleUpdate = (data: object) => {
    console.log("updateSubmit", data);
  };

  const openEditModel = () => modals.open({
    modalId: 'edit-modal',
    title: 'Update',
    children: (
      <AccessoryForm submitFunc={handleUpdate} columns={columns} />
    ),
  });

  return (
    <div
      className="datagrid-wrapper"
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <GridTable
        data={data}
        columns={columns}
        hasColumnLines={showColumnLines}
        cellCssClass="testClass"
        pageSizes={[1, 2, 5]}
        enableEdit={true}
        showPageSize={true}
        onRowInsert={onRowInsert}
        onRowUpdate={onRowUpdate}
        onRowDelete={onRowDelete}
        onStartEdit={onStartEdit}
      />
      <div
        className="button-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <button
          onClick={() => setShowColumnLines(prev => !prev)}
          style={{
            width: "220px",
          }}
        >
          hasColumnLines: {showColumnLines ? "true" : "false"}
        </button>
      </div>
      <CustomPopup
        visible={formVisible}
        title="Custom Form"
        showTitle={true}
        showCloseButton={true}
        dragEnabled={false}
        height={"fit-content"}
        width={300}
        hideOnOutsideClick={false}
        handleClose={handleFormVisible}
        renderContent={() => <TestForm submitFunc={handleUpdate} columns={columns} />}
      />
    </div>
  );
};

export default Accessory;
