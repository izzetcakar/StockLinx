import { useState } from "react";
import { modals } from "@mantine/modals";
import TestForm from "../../components/form/TestForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { ICategory } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearCategory, setCategory } from "../../redux/categoryReducer";
import { RootState } from "../../redux/store";
import CategoryForm from "../../components/form/category/CategoryForm";

const Category = () => {
    const dispatch = useAppDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const categories = useAppSelector(
        (state: RootState) => state.category.categories
    );

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
        dispatch(setCategory(row as ICategory));
    };
    const onRowInsert = () => {
        console.log("insert");
        clearCategory();
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
        <div
            className="datagrid-wrapper"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
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

export default Category;
