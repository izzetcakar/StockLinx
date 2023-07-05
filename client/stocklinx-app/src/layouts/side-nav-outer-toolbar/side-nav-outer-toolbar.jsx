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

  const toggleMenu = useCallback(({ event }) => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.Opened
        : MenuStatus.Closed
    );
    event.stopPropagation();
  }, []);

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
