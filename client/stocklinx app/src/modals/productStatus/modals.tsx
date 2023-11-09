
import { IProductStatus } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import ProductStatusForm from "../../forms/productStatus/ProductStatusForm";

export const openProductStatusModal = (
    productStatus?: IProductStatus,
) =>
    modals.open({
        modalId: "productStatus-modal",
        title: productStatus ? "Update ProductStatus" : "Create ProductStatus",
        children: <ProductStatusForm productStatus={productStatus} />,
        xOffset: "auto",
    });

