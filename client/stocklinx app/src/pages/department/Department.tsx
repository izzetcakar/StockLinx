import GridTable from "../../components/gridTable/GridTable";
import { IDepartment } from "../../interfaces/interfaces";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { CompanyNameComponent, LocationNameComponent } from "../../components/customComponents/TableComponents";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { departmentActions } from "../../redux/department/actions";
import { companyActions } from "../../redux/company/actions";
import { openDepartmentModal } from "../../modals/department/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { locationActions } from "../../redux/location/actions";
import { userActions } from "../../redux/user/actions";

const Department = () => {
    const dispatch = useDispatch();
    const departments = useSelector((state: RootState) => state.department.departments);

    const columns: Column[] = [
        {
            dataField: "companyId",
            caption: "Company",
            dataType: "string",
            renderComponent: CompanyNameComponent,
        },
        {
            dataField: "locationId",
            caption: "Location",
            dataType: "string",
            renderComponent: LocationNameComponent
        },
        {
            dataField: "managerId",
            caption: "Manager",
            dataType: "string",
        },
        {
            dataField: "name",
            caption: "Name",
            dataType: "string",
        },
        {
            dataField: "notes",
            caption: "Notes",
            dataType: "string",
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
        const id: string = (row as IDepartment).id as string;
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
                pageSizes={[1, 2, 5]}
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
