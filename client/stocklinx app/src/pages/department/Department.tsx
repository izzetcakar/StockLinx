import { useCallback, useEffect, useState } from "react";
import { modals } from "@mantine/modals";
import TestForm from "../../components/form/TestForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { ApiStatus, IDepartment } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearDepartment, getAllDepartments, setDepartment } from "../../redux/departmentReducer";
import { RootState } from "../../redux/store";
import DepartmentForm from "../../components/form/department/DepartmentForm";
import { getNameFromArray } from "../../functions/getNameFromArray";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { LoadingOverlay } from "@mantine/core";
import { getAllCompanies } from "../../redux/companyReducer";

const Department = () => {
    const dispatch = useAppDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const departments = useAppSelector(
        (state: RootState) => state.department.departments
    );
    const departmentStatus = useAppSelector(
        (state: RootState) => state.department.status
    );
    const companies = useAppSelector(
        (state: RootState) => state.company.companies
    );
    const locations = useAppSelector(
        (state: RootState) => state.location.locations
    );
    const users = useAppSelector(
        (state: RootState) => state.user.users
    );
    const NameComponent: React.FC<{ value: string }> = ({ value }) => {
        return <div style={{ fontWeight: "bold" }}>{getNameFromArray(companies, value)}</div>;
    };

    const columns: Column[] = [
        {
            dataField: "companyId",
            caption: "Company",
            dataType: "string",
            renderComponent: NameComponent,
        },
        {
            dataField: "locationId",
            caption: "Location",
            dataType: "string",
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
        dispatch(setDepartment(row as IDepartment));
    };
    const onRowInsert = () => {
        console.log("insert");
        clearDepartment();
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

    const fetchData = useCallback(async () => {
        await dispatch(getAllDepartments());
        await dispatch(getAllCompanies());
    }, [dispatch])

    useEffect(() => {
        fetchData();
        return () => {
            return;
        };
    }, [fetchData]);


    return (
        <div
            className="datagrid-wrapper"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
            <GridTable
                data={departments}
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

export default Department;
