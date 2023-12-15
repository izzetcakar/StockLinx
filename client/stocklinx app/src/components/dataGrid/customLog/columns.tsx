import { Column } from "../../gridTable/interfaces/interfaces";
import icon_delete from "../../../assets/customLog/Delete.png";
import icon_update from "../../../assets/customLog/Update.png";
import icon_create from "../../../assets/customLog/Create.png";
import icon_checkIn from "../../../assets/customLog/CheckIn.png";
import icon_checkOut from "../../../assets/customLog/CheckOut.png";
import { ICustomLog } from "../../../interfaces/interfaces";
import { RootState } from "../../../redux/rootReducer";
import { useSelector } from "react-redux";
import { Tooltip } from "@mantine/core";

const getActionIcon = (action: string) => {
  switch (action) {
    case "Create":
      return icon_create;
    case "Update":
      return icon_update;
    case "Delete":
      return icon_delete;
    case "CheckIn":
      return icon_checkIn;
    case "CheckOut":
      return icon_checkOut;
    default:
      return icon_create;
  }
};
export const useColumns = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const columns: Column[] = [
    {
      dataField: "action",
      caption: "Action",
      dataType: "action",
      renderComponent(e) {
        return (
          <img
            src={getActionIcon((e as ICustomLog).action)}
            height={16}
            width={16}
          />
        );
      },
    },
    {
      dataField: "userId",
      caption: "User",
      dataType: "string",
      renderComponent(e) {
        const user = users.find((user) => user.id === (e as ICustomLog).userId);
        if (!user) {
          return "Unknown";
        }
        return user.firstName + " " + user.lastName;
      },
    },
    {
      dataField: "date",
      caption: "Date",
      dataType: "date",
    },
    {
      dataField: "action",
      caption: "Action",
      dataType: "string",
    },
    {
      dataField: "itemName",
      caption: "Item",
      dataType: "action",
      renderComponent(e) {
        return (
          <Tooltip label={(e as ICustomLog).itemController}>
            <a href={(e as ICustomLog).itemRoute}>
              {(e as ICustomLog).itemName}
            </a>
          </Tooltip>
        );
      },
    },
    {
      dataField: "targetName",
      caption: "Target",
      dataType: "action",
      renderComponent(e) {
        return (
          <Tooltip label={(e as ICustomLog).targetController}>
            <a href={(e as ICustomLog)?.targetRoute?.toString()}>
              {(e as ICustomLog).targetName}
            </a>
          </Tooltip>
        );
      },
    },
  ];

  return columns;
};
