import { useState } from "react";
import { modals } from "@mantine/modals";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { ISupplier } from "../../interfaces/interfaces";
import SupplierForm from "../../components/form/supplier/SupplierForm";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { LocationNameComponent } from "../../components/customComponents/TableComponents";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { supplierActions } from "../../redux/supplier/actions";

const Supplier = () => {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const suppliers = useSelector((state: RootState) => state.supplier.suppliers);

    const columns: Column[] = [
        {
            dataField: "locationId",
            caption: "Location",
            dataType: "string",
            renderComponent: LocationNameComponent
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
        dispatch(supplierActions.setSupplier(row as ISupplier));
    };
    const onRowInsert = () => {
        console.log("insert");
        dispatch(supplierActions.clearSupplier());
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
        <div>
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
                onRowRemove={onRowDelete}
                onStartEdit={onStartEdit}
            />
        </div>
    );
};

export default Supplier;
