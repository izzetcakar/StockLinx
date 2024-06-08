interface CompanyCardProps {
  companyId: string;
  companyName: string;
  userCount: number;
  permissionCount: number;
  branchCount: number;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  branchCount,
  companyName,
  permissionCount,
  userCount,
}) => {
  return (
    <div className="company__card">
      <div className="company__card__header">
        <h3>{companyName}</h3>
      </div>
      <div className="company__card__content">
        <p className="company__card__info">User Count: {userCount}</p>
        <p className="company__card__info">
          Permission Count: {permissionCount}
        </p>
        <p className="company__card__info">Branch Count: {branchCount}</p>
      </div>
    </div>
  );
};
export default CompanyCard;
