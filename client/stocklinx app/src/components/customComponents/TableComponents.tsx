import { useSelector } from "react-redux";
import { getNameFromArray } from "../../functions/getNameFromArray";
import { RootState } from "../../redux/rootReducer";


export const CategoryNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const categories = useSelector((state: RootState) => state.category.categories);
    const name = getNameFromArray(categories, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const LocationNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const locations = useSelector((state: RootState) => state.location.locations);
    const name = getNameFromArray(locations, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const CompanyNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const companies = useSelector((state: RootState) => state.company.companies);
    const name = getNameFromArray(companies, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const ManufacturerNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const manufacturers = useSelector((state: RootState) => state.manufacturer.manufacturers);
    const name = getNameFromArray(manufacturers, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const SupplierNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
    const name = getNameFromArray(suppliers, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const StatusNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const productStatuses = useSelector((state: RootState) => state.productStatus.productStatuses);
    const name = getNameFromArray(productStatuses, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const ModelNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const models = useSelector((state: RootState) => state.model.models);
    const name = getNameFromArray(models, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
