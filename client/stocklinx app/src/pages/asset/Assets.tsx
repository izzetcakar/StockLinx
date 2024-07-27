import { useAsset } from "@/hooks/query";
import { useColumns } from "./columns";
import { openAssetModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import PageHeader from "@/components/generic/PageHeader";

const Assets = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useAsset.GetAll();
  const { mutate: remove } = useAsset.Remove();
  const { mutate: removeRange } = useAsset.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/asset", { state: { assets: values } });
  };

  return (
    <>
      <PageHeader title="Assets" />
      <BaseMantineTable
        data={data}
        columns={columns}
        isLoading={isRefetching}
        refetch={refetch}
        onAdd={() => openAssetModal()}
        onCopy={(value: any) => openAssetModal({ ...value, id: "" })}
        onUpdate={(value: any) => openAssetModal(value)}
        onRemove={(id: string) => remove(id)}
        onRemoveRange={(ids: string[]) => removeRange(ids)}
        onDetails={(values: any[]) => onDetails(values)}
      />
    </>
  );
};

export default Assets;
