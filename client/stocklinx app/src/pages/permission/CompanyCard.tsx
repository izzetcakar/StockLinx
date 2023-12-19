import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { companyActions } from "../../redux/company/actions";
import "./permission.scss";

interface CompanyCardProps {
  companyId: string;
  companyName: string;
  userCount: number;
  permissionCount: number;
  branchCount: number;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  companyId,
  branchCount,
  companyName,
  permissionCount,
  userCount,
}) => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);

  return (
    <div
      className="company__card"
      onClick={() =>
        dispatch(
          companyActions.setCompany(
            companies.find((company) => company.id === companyId) || null
          )
        )
      }
    >
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
