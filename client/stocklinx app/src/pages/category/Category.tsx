import GridTable from "../../components/gridTable/GridTable";
import { ICategory } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../redux/category/actions";
import { openCategoryModal } from "../../modals/category/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";

const Category = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.category.categories);

    const columns = [
        {
            dataField: "name",
            caption: "Name",
            dataType: "string",
        },
    ];

    const onRowInsert = () => {
        openCategoryModal();
    };
    const onRowUpdate = (row: object) => {
        const data = row as ICategory;
        openCategoryModal(data);
    };
    const onRowRemove = (row: object) => {
        const id: string = (row as ICategory).id as string;
        genericConfirmModal(() => dispatch(categoryActions.remove({ id: id })));
    };
    const refreshData = () => {
        dispatch(categoryActions.getAll());
    };

    return (
        <div>
            <GridTable
                data={categories}
                columns={columns}
                hasColumnLines={false}
                pageSizes={[1, 2, 5]}
                enableEdit={true}
                showPageSize={true}
                onRowInsert={onRowInsert}
                onRowUpdate={onRowUpdate}
                onRowRemove={onRowRemove}
                refreshData={refreshData}
            />
        </div>
    );
};

export default Category;
