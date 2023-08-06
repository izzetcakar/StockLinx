import { useState } from "react";
import { modals } from "@mantine/modals";
import TestForm from "../../components/form/TestForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { ILocation } from "../../interfaces/interfaces";
import LocationForm from "../../components/form/location/LocationForm";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { locationActions } from "../../redux/location/actions";

const Location = () => {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const locations = useSelector((state: RootState) => state.location.locations);

    const columns: Column[] = [
        {
            dataField: "name",
            caption: "Name",
            dataType: "string",
        },
        {
            dataField: "country",
            caption: "Country",
            dataType: "string",
        },
        {
            dataField: "state",
            caption: "State",
            dataType: "string",
        },
        {
            dataField: "city",
            caption: "City",
            dataType: "string",
        },
        {
            dataField: "address",
            caption: "Address",
            dataType: "string",
        },
        {
            dataField: "address2",
            caption: "Address2",
            dataType: "string",
        },
        {
            dataField: "zipCode",
            caption: "Zip Code",
            dataType: "string",
        },
        {
            dataField: "currency",
            caption: "Currency",
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
        dispatch(locationActions.setLocation(row as ILocation));
    };
    const onRowInsert = () => {
        console.log("insert");
        dispatch(locationActions.clearLocation());
        openLocationModal();
    };
    const onRowUpdate = (row: object) => {
        console.log(row);
        openLocationModal(row as ILocation);
    };
    const onRowDelete = (row: object) => {
        console.log("delete", row);
    };
    const handleUpdate = (data: object) => {
        console.log("updateSubmit", data);
    };

    const openLocationModal = (location?: ILocation) =>
        modals.open({
            modalId: "location-modal",
            title: "Update",
            children: (
                <LocationForm location={location} submitFunc={handleUpdate} />
            ),
        });

    return (
        <div
            className="datagrid-wrapper"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
            <GridTable
                data={locations}
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

export default Location;
