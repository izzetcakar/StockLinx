import { useDispatch, useSelector } from "react-redux";
import { useColumns } from "./columns";
import { RootState } from "../../../redux/rootReducer";
import { useEffect } from "react";
import { productActions } from "../../../redux/product/actions";
import Gridtable from "../../gridTable/GridTable";
import { userActions } from "../../../redux/user/actions";

interface HistoryLogsProps {
  id: string;
}
const HistoryLogs: React.FC<HistoryLogsProps> = ({ id }) => {
  const dispatch = useDispatch();
  const customLogs = useSelector(
    (state: RootState) => state.product.customLogs
  );

  const refreshData = () => {
    dispatch(productActions.getCustomLogs());
    dispatch(userActions.getAll());
  };

  useEffect(() => {
    refreshData();
  }, [id]);

  return (
    <Gridtable
      itemKey="id"
      data={customLogs.filter((cl) => cl.itemId === id || cl.targetId === id)}
      columns={useColumns()}
    />
  );
};

export default HistoryLogs;
