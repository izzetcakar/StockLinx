import { useState } from "react";
import { modals } from "@mantine/modals";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { ICategory } from "../../interfaces/interfaces";
import CategoryForm from "../../components/form/category/CategoryForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../redux/category/actions";

const Category = () => {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const categories = useSelector((state: RootState) => state.category.categories);

    const columns = [
        {
            dataField: "name",
            caption: "Name",
            dataType: "string",
        },
    ];

    const handleFormVisible = () => {
        setFormVisible((prevFormVisible) => !prevFormVisible);
    };
    const onStartEdit = (row: object) => {
        dispatch(categoryActions.setCategory(row as ICategory));
    };
    const onRowInsert = () => {
        console.log("insert");
        dispatch(categoryActions.clearCategory());
        openCategoryModal();
    };
    const onRowUpdate = (row: object) => {
        console.log(row);
        openCategoryModal(row as ICategory);
    };
    const onRowDelete = (row: object) => {
        console.log("delete", row);
    };
    const handleUpdate = (data: object) => {
        console.log("updateSubmit", data);
    };

    const openCategoryModal = (category?: ICategory) =>
        modals.open({
            modalId: "category-modal",
            title: "Update",
            children: (
                <CategoryForm category={category} submitFunc={handleUpdate} />
            ),
        });

    return (
        <div>
            <GridTable
                data={categories}
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
        </div>
    );
};

export default Category;
