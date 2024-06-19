import { ICompany } from "@interfaces/serverInterfaces";
import { openPermissionModal } from "../../modals/modals";
import "./permission.scss";

interface CompanyCardDetailProps {
  company: ICompany;
  userCount: number;
  permissionCount: number;
}

const CompanyCardDetail: React.FC<CompanyCardDetailProps> = ({
  company,
  userCount,
  permissionCount,
}) => {
  return (
    <div className="company__card" onClick={() => openPermissionModal(company)}>
      <div className="company__card__header">
        <h3>{company.name}</h3>
      </div>
      <div className="company__card__content">
        <p className="company__card__info">User Count: {userCount}</p>
        <p className="company__card__info">
          Permission Count: {permissionCount}
        </p>
      </div>
    </div>
  );
};

export default CompanyCardDetail;
