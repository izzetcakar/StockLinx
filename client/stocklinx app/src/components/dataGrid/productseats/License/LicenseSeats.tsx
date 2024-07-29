import { useAssetProduct, useEmployeeProduct } from "@queryhooks";
import { ILicense } from "@/interfaces/serverInterfaces";
import { useColumns } from "./LicenseSeatColumns";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import { licenseRequests } from "@/server/requests";

interface LicenseSeatsProps {
  license: ILicense;
}

const LicenseSeats: React.FC<LicenseSeatsProps> = ({ license }) => {
  const columns = useColumns().columns;
  const {
    data: assetProducts,
    isRefetching: assetLoading,
    refetch: getAssetProducts,
  } = useAssetProduct.GetAll();
  const {
    data: employeeProducts,
    isRefetching: employeeLoading,
    refetch: getEmployeeProducts,
  } = useEmployeeProduct.GetAll();

  const getData = () => {
    const filteredEmployeeProducts =
      employeeProducts?.filter((u) => u.licenseId === license.id) || [];
    const filteredAssetProducts =
      assetProducts?.filter((a) => a.licenseId === license.id) || [];
    return [...filteredEmployeeProducts, ...filteredAssetProducts];
  };

  return (
    <BaseMantineTable
      data={getData()}
      columns={columns}
      isLoading={assetLoading || employeeLoading}
      refetch={() => {
        getAssetProducts();
        getEmployeeProducts();
      }}
      getExportData={(ids: string[]) => licenseRequests.getProductDtos(ids)}
    />
  );
};

export default LicenseSeats;
