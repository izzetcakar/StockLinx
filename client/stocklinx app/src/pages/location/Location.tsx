import GridTable from "../../components/gridTable/GridTable";
import { ILocation } from "../../interfaces/interfaces";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { locationActions } from "../../redux/location/actions";
import { openLocationModal } from "../../modals/location/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";

const Location = () => {
    const dispatch = useDispatch();
    const locations = useSelector((state: RootState) => state.location.locations);

    const columns: Column[] = [
        {
            dataField: "name",
            caption: "Name",
        },
        {
            dataField: "country",
            caption: "Country",
        },
        {
            dataField: "state",
            caption: "State",
        },
        {
            dataField: "city",
            caption: "City",
        },
        {
            dataField: "address",
            caption: "Address",
        },
        {
            dataField: "address2",
            caption: "Address2",
        },
        {
            dataField: "zipCode",
            caption: "Zip Code",
        },
        {
            dataField: "currency",
            caption: "Currency",
        },
        {
            dataField: "notes",
            caption: "Notes",
        },
    ];

    const onRowInsert = () => {
        openLocationModal();
    };
    const onRowUpdate = (row: object) => {
        const data = row as ILocation;
        openLocationModal(data);
    };
    const onRowRemove = (row: object) => {
        const id: string = (row as ILocation).id as string;
        genericConfirmModal(() => dispatch(locationActions.remove({ id: id })));
    };

    const refreshData = () => {
        dispatch(locationActions.getAll());
    };
    return (
        <div>
            <GridTable
                data={locations}
                columns={columns}
                hasColumnLines={false}
                enableEdit={true}
                showPageSize={true}
                refreshData={refreshData}
                onRowInsert={onRowInsert}
                onRowUpdate={onRowUpdate}
                onRowRemove={onRowRemove}
            />
        </div>
    );
};

export default Location;
