import { IBranch } from "../../interfaces/serverInterfaces";
import { openPermissionModal } from "../../modals/modals";
import "./permission.scss";

interface BranchCardProps {
  branch: IBranch;
  userCount: number;
  permissionCount: number;
}

const BranchCard: React.FC<BranchCardProps> = ({
  branch,
  userCount,
  permissionCount,
}) => {
  return (
    <div className="branch__card" onClick={() => openPermissionModal(branch)}>
      <div className="branch__card__header">
        <h3>{branch.name}</h3>
      </div>
      <div className="branch__card__content">
        <p className="branch__card__info">User Count: {userCount}</p>
        <p className="branch__card__info">
          Permission Count: {permissionCount}
        </p>
      </div>
    </div>
  );
};

export default BranchCard;
