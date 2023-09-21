import GridTable from "../../components/gridTable/GridTable";
import { ISupplier } from "../../interfaces/interfaces";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { supplierActions } from "../../redux/supplier/actions";
import { openSupplierModal } from "../../modals/supplier/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { locationActions } from "../../redux/location/actions";
import { NameComponent } from "../../components/customComponents/TableComponents";

const Supplier = () => {
    const dispatch = useDispatch();
    const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
    const locations = useSelector((state: RootState) => state.location.locations);

    const columns: Column[] = [
        {
            dataField: "locationId",
            caption: "Location",
            renderComponent: (value: string) => NameComponent(value, locations)
        },
        {
            dataField: "name",
            caption: "Name",
        },
        {
            dataField: "contactName",
            caption: "Contact Name",
        },
        {
            dataField: "contactPhone",
            caption: "Contact Phone",
        },
        {
            dataField: "contactEmail",
            caption: "Contact Email",
        },
        {
            dataField: "website",
            caption: "Website",
        },
        {
            dataField: "fax",
            caption: "Fax",
        },
        {
            dataField: "notes",
            caption: "Notes",
        },
    ];

    const onRowInsert = () => {
        openSupplierModal();
    };
    const onRowUpdate = (row: object) => {
        const data = row as ISupplier;
        openSupplierModal(data);
    };
    const onRowRemove = (row: object) => {
        const id: string = (row as ISupplier).id as string;
        genericConfirmModal(() => dispatch(supplierActions.remove({ id: id })));
    };
    const refreshData = () => {
        dispatch(supplierActions.getAll());
        dispatch(locationActions.getAll());
    };

    return (
        <div>
            <GridTable
                data={suppliers}
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

export default Supplier;
