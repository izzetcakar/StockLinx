import { useState } from "react";
import { modals } from "@mantine/modals";
import TestForm from "../../components/form/TestForm";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { IProductStatus } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearProductStatus, setProductStatus } from "../../redux/productStatusReducer";
import { RootState } from "../../redux/store";
import ProductStatusForm from "../../components/form/productStatus/ProductStatusForm";
import { Column } from "../../components/gridTable/interfaces/interfaces";

const ProductStatus = () => {
    const dispatch = useAppDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const productStatuses = useAppSelector(
        (state: RootState) => state.productStatus.productStatuses
    );

    const columns: Column[] = [
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
        dispatch(setProductStatus(row as IProductStatus));
    };
    const onRowInsert = () => {
        console.log("insert");
        clearProductStatus();
        openProductStatusModal();
    };
    const onRowUpdate = (row: object) => {
        console.log(row);
        openProductStatusModal(row as IProductStatus);
    };
    const onRowDelete = (row: object) => {
        console.log("delete", row);
    };
    const handleUpdate = (data: object) => {
        console.log("updateSubmit", data);
    };

    const openProductStatusModal = (productStatus?: IProductStatus) =>
        modals.open({
            modalId: "productStatus-modal",
            title: "Update",
            children: (
                <ProductStatusForm productStatus={productStatus} submitFunc={handleUpdate} />
            ),
        });

    return (
        <div
            className="datagrid-wrapper"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
            <GridTable
                data={productStatuses}
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

export default ProductStatus;
