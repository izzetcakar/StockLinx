import Drawer from "devextreme-react/drawer";
import ScrollView from "devextreme-react/scroll-view";
import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { Header, SideNavigationMenu, Footer } from "../../components";
import "./side-nav-outer-toolbar.scss";
import { useScreenSize } from "../../utils/media-query";
import { Template } from "devextreme-react/core/template";
import { useMenuPatch } from "../../utils/patches";
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

  const handleNavElements = (target) => {
    let newList = navigationList.map((item, index) => {
      if (item?.elements && target === index) {
        return { ...item, displayElements: !item.displayElements };
      } else {
        return item;
      }
    });
    setNavigationList(newList);
  };

  const navigateUser = (item, index) => {
    if (item?.elements) {
      handleNavElements(index);
    } else {
      handleNavElements(-1);
      //Navigate User
    }
  };

  return (
    <div className={"side-nav-outer-toolbar"}>
      <Header menuToggleEnabled toggleMenu={toggleMenu} title={title} />
      {/* <Drawer
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
      </Drawer> */}
      <div className="sidebar-container">
        <div className="navigation-item">
          <img src={logo} className="icon" />
          <div className="title">Stocklinx</div>
        </div>
        {navigationList.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className="navigation-item"
              onClick={() => navigateUser(item, index)}
            >
              <div className="icon">
                <box-icon name={item.icon} size="1.4rem" color={item.color} />
              </div>
              <div className="title">{item.title}</div>
              {item?.elements ? (
                <div
                  className={
                    item?.displayElements ? "arrow-down-open" : "arrow-down"
                  }
                >
                  <box-icon name="chevron-down" size="1.4rem" color="#737373" />
                </div>
              ) : null}
            </div>
            {item?.displayElements ? (
              item.elements.map((el, nestedIndex) => (
                <div
                  className="navigation-element"
                  key={`${index}-${nestedIndex}`}
                >
                  <div className="icon">
                    <box-icon name={el.icon} size="1.4rem" color={el.color} />
                  </div>
                  <div className="title">{el.title}</div>
                </div>
              ))
            ) : (
              <></>
            )}
          </React.Fragment>
        ))}
      </div>
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
