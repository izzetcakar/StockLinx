import { IUser } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { userActions } from "../../redux/user/actions";
import { locationActions } from "../../redux/location/actions";
import { useColumns } from "./columns";
import { companyActions } from "../../redux/company/actions";
import { branchActions } from "../../redux/branch/actions";
import Gridtable from "../../components/gridTable/Gridtable";
import { openUserModal } from "../../modals/user/modals";
import { departmentActions } from "../../redux/department/actions";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);

  const refreshData = () => {
    dispatch(userActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(departmentActions.getAll());
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Users</div>
      </div>
      <Gridtable
        data={users}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowInsert={() => openUserModal()}
        onRowUpdate={(user) => openUserModal(user as IUser)}
      />
    </>
  );
};

export default User;
