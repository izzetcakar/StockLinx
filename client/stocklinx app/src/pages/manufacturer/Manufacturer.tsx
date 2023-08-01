import { useState } from "react";
import { modals } from "@mantine/modals";
import TestForm from "../../components/form/TestForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { IManufacturer } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearManufacturer, setManufacturer } from "../../redux/manufacturerReducer";
import { RootState } from "../../redux/store";
import ManufacturerForm from "../../components/form/manufacturer/ManufacturerForm";

const Manufacturer = () => {
    const dispatch = useAppDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const manufacturers = useAppSelector(
        (state: RootState) => state.manufacturer.manufacturers
    );

    const columns = [
        {
            dataField: "name",
            caption: "Name",
            dataType: "string",
        },
        {
            dataField: "supportPhone",
            caption: "Support Phone",
            dataType: "string",
        },
        {
            dataField: "supportEmail",
            caption: "Support Email",
            dataType: "string",
        },
        {
            dataField: "website",
            caption: "Website",
            dataType: "string",
        },
    ];

    const handleFormVisible = () => {
        setFormVisible((prevFormVisible) => !prevFormVisible);
    };
    const onStartEdit = (row: object) => {
        dispatch(setManufacturer(row as IManufacturer));
    };
    const onRowInsert = () => {
        console.log("insert");
        clearManufacturer();
        openManufacturerModal();
    };
    const onRowUpdate = (row: object) => {
        console.log(row);
        openManufacturerModal(row as IManufacturer);
    };
    const onRowDelete = (row: object) => {
        console.log("delete", row);
    };
    const handleUpdate = (data: object) => {
        console.log("updateSubmit", data);
    };

    const openManufacturerModal = (manufacturer?: IManufacturer) =>
        modals.open({
            modalId: "manufacturer-modal",
            title: "Update",
            children: (
                <ManufacturerForm manufacturer={manufacturer} submitFunc={handleUpdate} />
            ),
        });

    return (
        <div
            className="datagrid-wrapper"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
            <GridTable
                data={manufacturers}
                columns={columns}
                hasColumnLines={false}
                pageSizes={[1, 2, 5]}
                enableEdit={true}
                showPageSize={true}
                onRowInsert={onRowInsert}
                onRowUpdate={onRowUpdate}
                onRowDelete={onRowDelete}
                onStartEdit={onStartEdit}
            />
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
                renderContent={() => (
                    <TestForm submitFunc={handleUpdate} columns={columns} />
                )}
            />
        </div>
    );
};

export default Manufacturer;
