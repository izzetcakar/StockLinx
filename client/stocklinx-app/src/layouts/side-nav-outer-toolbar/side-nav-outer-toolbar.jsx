import React, { useState, useCallback, useRef } from "react";
import { Header, SideNavigationMenu, Footer } from "../../components";
import "./side-nav-outer-toolbar.scss";
import "boxicons";
import logo from "../../images/logo.png";
import { useScreenSize } from "../../utils/media-query";
import { useMenuPatch } from "../../utils/patches";

import Button from "devextreme-react/button";
import Drawer from "devextreme-react/drawer";
import ScrollView from "devextreme-react/scroll-view";
import Toolbar, { Item } from "devextreme-react/toolbar";
import { useNavigate } from "react-router";
import { Template } from "devextreme-react/core/template";

export default function SideNavOuterToolbar({ title, children }) {
  const scrollViewRef = useRef(null);
  const navigate = useNavigate();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(
    isLarge ? MenuStatus.Opened : MenuStatus.Closed
  );

  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.TemporaryOpened
        : prevMenuStatus
    );
  }, []);

  const onOutsideClick = useCallback(() => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus !== MenuStatus.Closed && !isLarge
        ? MenuStatus.Closed
        : prevMenuStatus
    );
    return menuStatus === MenuStatus.Closed ? true : false;
  }, [isLarge]);

  const onNavigationChanged = useCallback(
    ({ itemData, event, node }) => {
      if (menuStatus === MenuStatus.Closed || !itemData.path || node.selected) {
        event.preventDefault();
        return;
      }

      navigate(itemData.path);
      scrollViewRef.current.instance.scrollTo(0);

      if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
        setMenuStatus(MenuStatus.Closed);
        event.stopPropagation();
      }
    },
    [navigate, menuStatus, isLarge]
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
{
  /* <box-icon name='search'></box-icon> */
}
const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3,
};
