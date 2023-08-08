import { useState } from "react";
import { modals } from "@mantine/modals";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { IManufacturer } from "../../interfaces/interfaces";
import ManufacturerForm from "../../components/form/manufacturer/ManufacturerForm";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { manufacturerActions } from "../../redux/manufacturer/actions";

const Manufacturer = () => {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const manufacturers = useSelector((state: RootState) => state.manufacturer.manufacturers);

    const columns: Column[] = [
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
        dispatch(manufacturerActions.setManufacturer(row as IManufacturer));
    };
    const onRowInsert = () => {
        console.log("insert");
        dispatch(manufacturerActions.clearManufacturer());
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
        <div>
            <GridTable
                data={manufacturers}
                columns={columns}
                hasColumnLines={false}
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

export default Manufacturer;
