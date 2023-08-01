import { useState } from "react";
import { modals } from "@mantine/modals";
import TestForm from "../../components/form/TestForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { ISupplier } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearSupplier, setSupplier } from "../../redux/supplierReducer";
import { RootState } from "../../redux/store";
import SupplierForm from "../../components/form/supplier/SupplierForm";

const Supplier = () => {
    const dispatch = useAppDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const suppliers = useAppSelector(
        (state: RootState) => state.supplier.suppliers
    );

    const columns = [
        {
            dataField: "locationId",
            caption: "Location",
            dataType: "string",
        },
        {
            dataField: "name",
            caption: "Name",
            dataType: "string",
        },
        {
            dataField: "contactName",
            caption: "Contact Name",
            dataType: "string",
        },
        {
            dataField: "contactPhone",
            caption: "Contact Phone",
            dataType: "string",
        },
        {
            dataField: "contactEmail",
            caption: "Contact Email",
            dataType: "string",
        },
        {
            dataField: "website",
            caption: "Website",
            dataType: "string",
        },
        {
            dataField: "fax",
            caption: "Fax",
            dataType: "string",
        },
        {
            dataField: "notes",
            caption: "Notes",
            dataType: "string",
        },
    ];

    const handleFormVisible = () => {
        setFormVisible((prevFormVisible) => !prevFormVisible);
    };
    const onStartEdit = (row: object) => {
        dispatch(setSupplier(row as ISupplier));
    };
    const onRowInsert = () => {
        console.log("insert");
        clearSupplier();
        openSupplierModal();
    };
    const onRowUpdate = (row: object) => {
        console.log(row);
        openSupplierModal(row as ISupplier);
    };
    const onRowDelete = (row: object) => {
        console.log("delete", row);
    };
    const handleUpdate = (data: object) => {
        console.log("updateSubmit", data);
    };

    const openSupplierModal = (supplier?: ISupplier) =>
        modals.open({
            modalId: "supplier-modal",
            title: "Update",
            children: (
                <SupplierForm supplier={supplier} submitFunc={handleUpdate} />
            ),
        });

    return (
        <div
            className="datagrid-wrapper"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
            <GridTable
                data={suppliers}
                columns={columns}
                hasColumnLines={false}
                cellCssClass="testClass"
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

export default Supplier;
