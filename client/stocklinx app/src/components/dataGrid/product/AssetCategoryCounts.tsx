import { useColumns } from "./columns";
import { useProduct } from "@queryhooks";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const AssetCategoryCounts = () => {
  const { data, refetch, isRefetching } = useProduct.GetCategoryCounts();
  const { assetCategoryColumns } = useColumns();

  return (
    <BaseMantineTable
      data={data}
      columns={assetCategoryColumns}
      isLoading={isRefetching}
      wrapperStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      refetch={refetch}
      disableSelection
      disablePagination
    />
  );
};

export default AssetCategoryCounts;
