import { IManufacturer } from "../../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useColumns } from "./columns";
import { companyActions } from "../../redux/company/actions";
import Gridtable from "../../components/gridTable/Gridtable";
import { openManufacturerModal } from "../../modals/manufacturer/modals";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { branchActions } from "../../redux/branch/actions";

const Manufacturer = () => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(
    (state: RootState) => state.manufacturer.manufacturers
  );

  const refreshData = () => {
    dispatch(manufacturerActions.getAll());
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };

  return (
    <>
      <div className="page-content-header">
        <div className="page-content-header-title">Manufacturers</div>
      </div>
      <Gridtable
        data={manufacturers}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(manufacturer) => openManufacturerModal(manufacturer as IManufacturer)}
        onRowInsert={() => openManufacturerModal()}
        onRowRemove={(id) => dispatch(manufacturerActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(manufacturerActions.removeRange({ ids: ids }))
        }
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableExcelActions
        enableSelectActions
      />
    </>
  );
};

export default Manufacturer;
