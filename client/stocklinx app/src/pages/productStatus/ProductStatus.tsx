import GridTable from "../../components/gridTable/GridTable";
import { IProductStatus } from "../../interfaces/interfaces";
import { Column } from "../../components/gridTable/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { productStatusActions } from "../../redux/productStatus/actions";
import { openProductStatusModal } from "../../modals/productStatus/modals";
import { genericConfirmModal } from "../../modals/generic/GenericModals";

const ProductStatus = () => {
    const dispatch = useDispatch();
    const productStatuses = useSelector((state: RootState) => state.productStatus.productStatuses);

    const columns: Column[] = [
        {
            dataField: "name",
            caption: "Name",
        },
    ];

    const onRowInsert = () => {
        openProductStatusModal();
    };
    const onRowUpdate = (row: object) => {
        const data = row as IProductStatus;
        openProductStatusModal(data);
    };
    const onRowRemove = (row: object) => {
        const id: string = (row as IProductStatus).id as string;
        genericConfirmModal(() => dispatch(productStatusActions.remove({ id: id })));
    };

    const refreshData = () => {
        dispatch(productStatusActions.getAll());
    };

    return (
        <div>
            <GridTable
                data={productStatuses}
                columns={columns}
                hasColumnLines={false}
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

export default ProductStatus;
