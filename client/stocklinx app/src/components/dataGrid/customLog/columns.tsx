import { BaseColumn } from "../../gridTable/interfaces/interfaces";
import icon_delete from "../../../assets/customLog/Delete.png";
import icon_update from "../../../assets/customLog/Update.png";
import icon_create from "../../../assets/customLog/Create.png";
import icon_checkIn from "../../../assets/customLog/CheckIn.png";
import icon_checkOut from "../../../assets/customLog/CheckOut.png";
import { ICustomLog } from "../../../interfaces/serverInterfaces";
import { RootState } from "../../../redux/rootReducer";
import { useSelector } from "react-redux";
import { Anchor, Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.user.users);
  const columns: BaseColumn[] = [
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
      dataField: "action",
      caption: "Action",
      dataType: "string",
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
        return (
          <Anchor
            onClick={() => navigate(`/user/${user.id}`)}
            target="_blank"
            underline="always"
          >
            {user.firstName} {user.lastName}
          </Anchor>
        );
      },
    },
    {
      dataField: "date",
      caption: "Date",
      dataType: "date",
    },
    {
      dataField: "itemName",
      caption: "Item",
      dataType: "action",
      renderComponent(e) {
        const route = (e as ICustomLog).itemRoute;
        return (
          <Tooltip label={(e as ICustomLog).itemController}>
            <Anchor onClick={() => navigate(`/${route}`)}>
              {(e as ICustomLog).itemName}
            </Anchor>
          </Tooltip>
        );
      },
      selectable: false,
    },
    {
      dataField: "targetName",
      caption: "Target",
      dataType: "action",
      renderComponent(e) {
        const route = (e as ICustomLog).targetRoute;
        return (
          <Tooltip label={(e as ICustomLog).targetController}>
            <Anchor onClick={() => navigate(route ? `/${route}` : "")}>
              {(e as ICustomLog).targetName}
            </Anchor>
          </Tooltip>
        );
      },
      selectable: false,
    },
  ];

  return columns;
};
