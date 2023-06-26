import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ContextMenu, { Position } from "devextreme-react/context-menu";
import List from "devextreme-react/list";
import { useAuth } from "../../contexts/auth";
import "./UserPanel.scss";
import { useSelector } from "react-redux";

export default function UserPanel({ menuMode }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  function navigateToProfile() {
    navigate("/profile");
  }
  const menuItems = useMemo(
    () => [
      {
        text: "Profile",
        icon: "user",
        onClick: navigateToProfile,
      },
      {
        text: "Logout",
        icon: "runner",
        onClick: signOut,
      },
    ],
    [signOut]
  );
  return (
    <div className={"user-panel"}>
      <div className={"user-info"}>
        <div className={"user-name"}>{user?.email}</div>
        {/* <div>-</div>
        <div className="user-name">{user?.email}</div> */}
      </div>
      {menuMode === "context" && (
        <ContextMenu
          items={menuItems}
          target={".user-button"}
          showEvent={"dxclick"}
          width={210}
          cssClass={"user-menu"}
        >
          <Position my={"top center"} at={"bottom center"} />
        </ContextMenu>
      )}
      {menuMode === "list" && (
        <List className={"dx-toolbar-menu-action"} items={menuItems} />
      )}
    </div>
  );
}
