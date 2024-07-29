import { useColumns } from "./columns";
import { useLicense } from "@queryhooks";
import { useParams, useLocation as useRouterLocation } from "react-router-dom";
import EntityPanel from "@/components/entity/EntityPanel";
import CenterLoader from "@/components/mantine/CenterLoader";

const License = () => {
  const { cardColumns } = useColumns();
  const { data: licenses } = useLicense.GetAll();
  const { state } = useRouterLocation();

  return (
    <EntityPanel
      data={
        licenses?.filter((license) =>
          state?.licenses?.map((e: any) => e.id).includes(license.id)
        ) ||
        licenses ||
        []
      }
      cardColumns={cardColumns}
    />
  );
};

const SingleLicense = () => {
  const { id } = useParams();
  const { cardColumns } = useColumns();
  const { data: license, isRefetching } = useLicense.Get(id as string);

  if (isRefetching) return <CenterLoader />;

  return <EntityPanel data={[license]} cardColumns={cardColumns} />;
};

export { License, SingleLicense };
