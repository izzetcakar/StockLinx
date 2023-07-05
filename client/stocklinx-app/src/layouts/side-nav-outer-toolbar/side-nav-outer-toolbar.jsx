import React, { useState, useCallback } from "react";
import { Header } from "../../components";
import "./side-nav-outer-toolbar.scss";
import "boxicons";
import logo from "../../images/logo.png";

export default function SideNavOuterToolbar({ title, children }) {
  const [navigationList, setNavigationList] = useState([
    {
      title: "Home",
      icon: "home-alt",
      color: "#737373",
      elements: [{ title: "Test", icon: "bar-chart-alt-2", color: "#737373" }],
      displayElements: false,
    },
    {
      title: "Renevue",
      icon: "bar-chart-alt-2",
      color: "#737373",
      elements: [{ title: "Test2", icon: "bar-chart-alt-2", color: "#737373" }],
      displayElements: false,
    },
    {
      title: "Notification",
      icon: "bell",
      color: "#737373",
    },
    {
      title: "Analytics",
      icon: "pie-chart-alt",
      color: "#737373",
    },
    {
      title: "Logout",
      icon: "log-out",
      color: "#737373",
    },
  ]);
  const scrollViewRef = useRef(null);
  const navigate = useNavigate();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(
    isLarge ? MenuStatus.Opened : MenuStatus.Closed
  );

  const toggleMenu = useCallback(({ event }) => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.Opened
        : MenuStatus.Closed
    );
    event.stopPropagation();
  }, []);

  return (
    <div className={"side-nav-outer-toolbar"}>
      <Header menuToggleEnabled toggleMenu={toggleMenu} title={title} />
      <Drawer
        className={["drawer", patchCssClass].join(" ")}
        position={"before"}
        closeOnOutsideClick={onOutsideClick}
        openedStateMode={isLarge ? "shrink" : "overlap"}
        revealMode={isXSmall ? "slide" : "expand"}
        minSize={isXSmall ? 0 : 60}
        maxSize={250}
        shading={isLarge ? false : true}
        opened={menuStatus === MenuStatus.Closed ? false : true}
        template={"menu"}
      >
        <div className={"container"}>
          <ScrollView ref={scrollViewRef} className={"layout-body with-footer"}>
            <div className={"content"}>
              {React.Children.map(children, (item) => {
                return item.type !== Footer && item;
              })}
            </div>
            <div className={"content-block"}>
              {React.Children.map(children, (item) => {
                return item.type === Footer && item;
              })}
            </div>
          </ScrollView>
        </div>
        <Template name={"menu"}>
          <SideNavigationMenu
            compactMode={menuStatus === MenuStatus.Closed}
            selectedItemChanged={onNavigationChanged}
            openMenu={temporaryOpenMenu}
            onMenuReady={onMenuReady}
          ></SideNavigationMenu>
        </Template>
      </Drawer>
    </div>
  );
}

const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3,
};
