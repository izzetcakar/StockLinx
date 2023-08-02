import { useEffect, useState } from "react";
import { modals } from "@mantine/modals";
import TestForm from "../../components/form/TestForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { ICompany } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearCompany, getAllCompanies, setCompany } from "../../redux/companyReducer";
import { RootState } from "../../redux/store";
import CompanyForm from "../../components/form/company/CompanyForm";

const Company = () => {
    const dispatch = useAppDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const companies = useAppSelector(
        (state: RootState) => state.company.companies
    );

    const columns = [
        {
            dataField: "name",
            caption: "Name",
            dataType: "string",
        },
    ];

    useEffect(() => {
        dispatch(getAllCompanies());
    }, []);

    const handleFormVisible = () => {
        setFormVisible((prevFormVisible) => !prevFormVisible);
    };
    const onStartEdit = (row: object) => {
        dispatch(setCompany(row as ICompany));
    };
    const onRowInsert = () => {
        console.log("insert");
        clearCompany();
        openCompanyModal();
    };
    const onRowUpdate = (row: object) => {
        console.log(row);
        openCompanyModal(row as ICompany);
    };
    const onRowDelete = (row: object) => {
        console.log("delete", row);
    };
    const handleUpdate = (data: object) => {
        console.log("updateSubmit", data);
    };
    const openCompanyModal = (company?: ICompany) =>
        modals.open({
            modalId: "company-modal",
            title: "Update",
            children: (
                <CompanyForm company={company} submitFunc={handleUpdate} />
            ),
        });

    return (
        <div
            className="datagrid-wrapper"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
            <GridTable
                data={companies}
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

export default Company;
