import { useColumns } from "./columns";
import { useProduct } from "@queryhooks";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const CompanyProductCounts = () => {
  const { data, isRefetching, refetch } = useProduct.GetCompanyCounts();
  const { companyProductColumns } = useColumns();

  return (
    <BaseMantineTable
      data={data}
      columns={companyProductColumns}
      isLoading={isRefetching}
      wrapperStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      refetch={refetch}
      disableSelection
      disablePagination
    />
  );
};

export default CompanyProductCounts;
