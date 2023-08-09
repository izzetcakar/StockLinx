import GridTable from "../../components/gridTable/GridTable";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { openCompanyModal } from "../../modals/company/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";
import { companyActions } from "../../redux/company/actions";
import { ICompany } from "../../interfaces/interfaces";

const Company = () => {
    const dispatch = useDispatch();
    const companies = useSelector((state: RootState) => state.company.companies);

    const columns = [
        {
            dataField: "name",
            caption: "Name",
            dataType: "string",
        },
    ];

    const onRowInsert = () => {
        openCompanyModal();
    };
    const onRowUpdate = (row: object) => {
        const data = row as ICompany;
        openCompanyModal(data);
    };
    const onRowRemove = (row: object) => {
        const id: string = (row as ICompany).id as string;
        genericConfirmModal(() => dispatch(companyActions.remove({ id: id })));
    };
    const refreshData = () => {
        dispatch(companyActions.getAll());
    };

    return (
        <div>
            <GridTable
                data={companies}
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

export default Company;
