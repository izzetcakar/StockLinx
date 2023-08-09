
import { IProductStatus } from "../../interfaces/interfaces";
import { modals } from "@mantine/modals";
import ProductStatusForm from "../../forms/productStatus/ProductStatusForm";

export const closeModal = (modal: string) => modals.close(modal);
export const openProductStatusModal = (
    productStatus?: IProductStatus,
) =>
    modals.open({
        modalId: "productStatus-modal",
        title: "Update",
        children: <ProductStatusForm productStatus={productStatus} />,
        xOffset: "auto",
    });

