import { useState } from "react";
import { modals } from "@mantine/modals";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { IDepartment } from "../../interfaces/interfaces";
import DepartmentForm from "../../components/form/department/DepartmentForm";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { CompanyNameComponent, LocationNameComponent } from "../../components/customComponents/TableComponents";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { departmentActions } from "../../redux/department/actions";
import { companyActions } from "../../redux/company/actions";

const Department = () => {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
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

    const handleFormVisible = () => {
        setFormVisible((prevFormVisible) => !prevFormVisible);
    };
    const onStartEdit = (row: object) => {
        // dispatch(departmentActions.setDepartment(row as IDepartment));
        openDepartmentModal(row as IDepartment);
    };
    const onRowInsert = () => {
        console.log("insert");
        dispatch(departmentActions.clearDepartment());
        openDepartmentModal();
    };
    const onRowUpdate = (row: object) => {
        console.log(row);
        openDepartmentModal(row as IDepartment);
    };
    const onRowDelete = (row: object) => {
        console.log("delete", row);
    };
    const handleUpdate = (data: object) => {
        console.log("updateSubmit", data);
        dispatch(departmentActions.update({ department: data as IDepartment }));
    };

    const openDepartmentModal = (department?: IDepartment) =>
        modals.open({
            modalId: "department-modal",
            title: "Update",
            children: (
                <DepartmentForm department={department} submitFunc={handleUpdate} />
            ),
            xOffset: "auto",
        });

    const fetchData = () => {
        dispatch(departmentActions.getAll());
        dispatch(companyActions.getAll());
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
                refreshData={fetchData}
                onRowInsert={onRowInsert}
                onRowUpdate={onRowUpdate}
                onRowRemove={onRowDelete}
                onStartEdit={onStartEdit}
            />
        </div>
    );
};

export default Department;
