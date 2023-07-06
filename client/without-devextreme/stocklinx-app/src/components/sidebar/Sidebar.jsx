import React, { useState, useCallback, useEffect } from "react";
import "./sidebar.scss";
import "boxicons";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [navigationList, setNavigationList] = useState([
    {
      title: "Home",
      icon: "home-alt",
      color: "#737373",
      elements: [
        {
          title: "Test",
          icon: "bar-chart-alt-2",
          target: "",
          color: "#737373",
        },
      ],
      displayElements: false,
    },
    {
      title: "Accessory",
      icon: "bell",
      color: "#737373",
      target: "/accessory",
    },
    {
      title: "Asset",
      icon: "pie-chart-alt",
      color: "#737373",
      target: "/asset",
    },
    {
      title: "Component",
      icon: "pie-chart-alt",
      color: "#737373",
      target: "/component",
    },
    {
      title: "Consumable",
      icon: "pie-chart-alt",
      color: "#737373",
      target: "/consumable",
    },
    {
      title: "License",
      icon: "pie-chart-alt",
      color: "#737373",
      target: "/license",
    },
    {
      title: "Model",
      icon: "pie-chart-alt",
      color: "#737373",
      target: "/model",
    },
    {
      title: "Logout",
      icon: "log-out",
      color: "#737373",
      target: "",
    },
  ]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogoClick = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const navigate = useNavigate();

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
      navigate(item.target);
    }
  };
  useEffect(() => {
    console.log(`sidebar-container ${isSidebarCollapsed ? "collapsed" : ""}`);
  }, [isSidebarCollapsed]);

  return (
    <div
      className={`sidebar-container ${isSidebarCollapsed ? "collapsed" : ""}`}
    >
      <div className="navigation-item" onClick={() => handleLogoClick()}>
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
                  item?.displayElements
                    ? "arrow-down arrow-down-open"
                    : "arrow-down"
                }
              >
                <box-icon name="chevron-down" size="1.4rem" color="#737373" />
              </div>
            ) : null}
          </div>
          {item?.displayElements
            ? item.elements.map((el, nestedIndex) => (
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
            : null}
        </React.Fragment>
      ))}
    </div>
  );
}
