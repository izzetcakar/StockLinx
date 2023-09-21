import GridTable from "../../components/gridTable/GridTable";
import { IDepartment } from "../../interfaces/interfaces";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { departmentActions } from "../../redux/department/actions";
import { companyActions } from "../../redux/company/actions";
import { openDepartmentModal } from "../../modals/department/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { locationActions } from "../../redux/location/actions";
import { userActions } from "../../redux/user/actions";
import { NameComponent } from "../../components/customComponents/TableComponents";

const Department = () => {
    const dispatch = useDispatch();
    const departments = useSelector((state: RootState) => state.department.departments);
    const companies = useSelector((state: RootState) => state.company.companies);
    const locations = useSelector((state: RootState) => state.location.locations);

    const columns: Column[] = [
        {
            dataField: "companyId",
            caption: "Company",
            renderComponent: (value: string) => NameComponent(value, companies)
        },
        {
            dataField: "locationId",
            caption: "Location",
            renderComponent: (value: string) => NameComponent(value, locations)
        },
        {
            dataField: "managerId",
            caption: "Manager",
        },
        {
            dataField: "name",
            caption: "Name",
        },
        {
            dataField: "notes",
            caption: "Notes",
        },
    ];

    const onRowInsert = () => {
        openDepartmentModal();
    };
    const onRowUpdate = (row: object) => {
        const data = row as IDepartment;
        openDepartmentModal(data);
    };
    const onRowRemove = (row: object) => {
        const id: string = (row as IDepartment).id;
        genericConfirmModal(() => dispatch(departmentActions.remove({ id: id })));
    };

    const refreshData = () => {
        dispatch(departmentActions.getAll());
        dispatch(companyActions.getAll());
        dispatch(locationActions.getAll());
        dispatch(userActions.getAll());
    };

    return (
        <div>
            <GridTable
                data={departments}
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

export default Department;
