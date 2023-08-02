import { getNameFromArray } from "../../functions/getNameFromArray";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";


export const CategoryNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const categories = useAppSelector((state: RootState) => state.category.categories);
    const name = getNameFromArray(categories, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const LocationNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const locations = useAppSelector((state: RootState) => state.location.locations);
    const name = getNameFromArray(locations, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const CompanyNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const companies = useAppSelector((state: RootState) => state.company.companies);
    const name = getNameFromArray(companies, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const ManufacturerNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const manufacturers = useAppSelector((state: RootState) => state.manufacturer.manufacturers);
    const name = getNameFromArray(manufacturers, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const SupplierNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const suppliers = useAppSelector((state: RootState) => state.supplier.suppliers);
    const name = getNameFromArray(suppliers, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const StatusNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const productStatuses = useAppSelector((state: RootState) => state.productStatus.productStatuses);
    const name = getNameFromArray(productStatuses, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
export const ModelNameComponent: React.FC<{ value: string | number | boolean | null }> = ({ value = "" }) => {
    const models = useAppSelector((state: RootState) => state.model.models);
    const name = getNameFromArray(models, value?.toString() as string);
    return (
        <div>
            {name}
        </div>
    );
};
