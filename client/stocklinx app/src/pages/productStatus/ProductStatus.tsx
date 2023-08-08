import { useState } from "react";
import { modals } from "@mantine/modals";
import GridTable from "../../components/gridTable/GridTable";
import CustomPopup from "../../components/popup/CustomPopup";
import { IProductStatus } from "../../interfaces/interfaces";
import ProductStatusForm from "../../components/form/productStatus/ProductStatusForm";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { productStatusActions } from "../../redux/productStatus/actions";

const ProductStatus = () => {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const productStatuses = useSelector((state: RootState) => state.productStatus.productStatuses);

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
        dispatch(productStatusActions.setProductStatus(row as IProductStatus));
    };
    const onRowInsert = () => {
        console.log("insert");
        dispatch(productStatusActions.clearProductStatus());
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
        <div>
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
                onRowRemove={onRowDelete}
                onStartEdit={onStartEdit}
            />
        </div>
    );
};

export default ProductStatus;
