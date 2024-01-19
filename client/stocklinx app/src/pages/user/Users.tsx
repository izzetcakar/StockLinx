import { IUser } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useColumns } from "./columns";
import Gridtable from "../../components/gridTable/GridTable";
import { userActions } from "../../redux/user/actions";
import { companyActions } from "../../redux/company/actions";
import { locationActions } from "../../redux/location/actions";
import { branchActions } from "../../redux/branch/actions";
import { departmentActions } from "../../redux/department/actions";
import { openUserModal } from "../../modals/modals";
import GenericContext from "../../context/GenericContext";
import { useContext } from "react";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const { drawerBadge } = useContext(GenericContext);

  const refreshData = () => {
    dispatch(userActions.getAll());
    dispatch(locationActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
    dispatch(departmentActions.getAll());
  };

  return (
    <>
      <div className="page__content__header">
        <div className="page__content__header__title">Users</div>
        {drawerBadge()}
      </div>
      <Gridtable
        data={users}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(user) => openUserModal(user as IUser)}
        onRowInsert={() => openUserModal()}
        onRowRemove={(id) => dispatch(userActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(userActions.removeRange({ ids: ids }))
        }
        enableToolbar
        enableEditActions
        enableExcelActions
        enableSelectActions
      />
    </>
  );
};

export default User;
