import { IManufacturer } from "@interfaces/serverInterfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useColumns } from "./columns";
import { companyActions } from "../../redux/company/actions";
import Gridtable from "../../components/gridTable/GridTable";
import { manufacturerActions } from "../../redux/manufacturer/actions";
import { branchActions } from "../../redux/branch/actions";
import { openManufacturerModal } from "../../modals/modals";

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
      <div className="page__content__header">
        <div className="page__content__header__title">Manufacturers</div>
      </div>
      <Gridtable
        data={manufacturers}
        itemKey="id"
        columns={useColumns().columns}
        refreshData={refreshData}
        onRowUpdate={(manufacturer) =>
          openManufacturerModal(manufacturer as IManufacturer)
        }
        onRowInsert={() => openManufacturerModal()}
        onRowRemove={(id) => dispatch(manufacturerActions.remove({ id: id }))}
        onRowRemoveRange={(ids) =>
          dispatch(manufacturerActions.removeRange({ ids: ids }))
        }
        onApplyFilters={(filters) =>
          dispatch(manufacturerActions.filter(filters))
        }
        excelColumns={useColumns().excelColumns}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Manufacturer;
