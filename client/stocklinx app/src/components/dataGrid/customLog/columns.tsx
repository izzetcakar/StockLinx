import { DataColumn } from "@interfaces/gridTableInterfaces";
import icon_delete from "@assets/customLog/Delete.png";
import icon_update from "@assets/customLog/Update.png";
import icon_create from "@assets/customLog/Create.png";
import icon_checkIn from "@assets/customLog/CheckIn.png";
import icon_checkOut from "@assets/customLog/CheckOut.png";
import { ICustomLog } from "../../../interfaces/serverInterfaces";
import { Anchor } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/query/user";

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
  const columns: DataColumn[] = [
    {
      dataField: "action",
      caption: "Action",
      dataType: "action",
      renderComponent(e) {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={getActionIcon((e as ICustomLog).action)}
              height={16}
              width={16}
            />
          </div>
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
        const customLog = e as ICustomLog;
        const { data: user } = useUser.Get(customLog.userId);
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
      dataField: "itemController",
      caption: "Item Controller",
      dataType: "string",
    },
    {
      dataField: "item",
      caption: "Item",
      dataType: "string",
    },
    {
      dataField: "targetController",
      caption: "Target Controller",
      dataType: "string",
    },
    {
      dataField: "target",
      caption: "Target",
      dataType: "string",
    },
  ];

  return columns;
};
