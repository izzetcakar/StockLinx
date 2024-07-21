import { useLicense } from "@/hooks/query";
import { useColumns } from "./columns";
import { openLicenseModal } from "@/utils/modalUtils";
import { useNavigate } from "react-router-dom";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";

const Licenses = () => {
  const navigate = useNavigate();
  const { columns } = useColumns();
  const { data, isRefetching, refetch } = useLicense.GetAll();
  const { mutate: remove } = useLicense.Remove();
  const { mutate: removeRange } = useLicense.RemoveRange();

  const onDetails = (values: any[]) => {
    navigate("/license", { state: { licenses: values } });
  };

  return (
    <BaseMantineTable
      data={data}
      columns={columns}
      isLoading={isRefetching}
      refetch={refetch}
      onAdd={() => openLicenseModal()}
      onCopy={(value: any) => openLicenseModal({ ...value, id: "" })}
      onUpdate={(value: any) => openLicenseModal(value)}
      onRemove={(id: string) => remove(id)}
      onRemoveRange={(ids: string[]) => removeRange(ids)}
      onDetails={(values: any[]) => onDetails(values)}
    />
  );
};

export default Licenses;
