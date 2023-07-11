import React, { useState } from "react";
import "./sidebar.scss";
import "boxicons";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

interface NavigationItem {
  title: string;
  icon: string;
  color: string;
  elements?: NavigationItem[];
  displayElements?: boolean;
  target?: string;
}

const Sidebar: React.FC = () => {
  const [navigationList, setNavigationList] = useState<NavigationItem[]>([
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
      title: "Test",
      icon: "pie-chart-alt",
      color: "#737373",
      target: "/test",
    },
    {
      title: "Logout",
      icon: "log-out",
      color: "#737373",
      target: "",
    },
  ]);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    hideAllDisplayElements();
  };
  const handleNavElements = (target: number) => {
    const newList = navigationList.map((item, index) => {
      if (item?.elements && target === index) {
        return { ...item, displayElements: !item.displayElements };
      } else {
        return item;
      }
    });
    setNavigationList(newList);
  };
  const navigateUser = (item: NavigationItem, index: number) => {
    if (item?.elements) {
      handleNavElements(index);
    } else {
      handleNavElements(-1);
      navigate(item.target!);
    }
  };
  const hideAllDisplayElements = () => {
    setNavigationList((prev) =>
      prev.map((item) => {
        if (item?.displayElements && item?.elements) {
          return { ...item, displayElements: false };
        } else {
          return item;
        }
      })
    );
  }

  return (
    <div
      className={`sidebar-container ${isSidebarCollapsed ? "collapsed" : ""}`}
    >
      <div className="navigation-item" onClick={handleLogoClick}>
        <img src={logo} className="icon" alt="Logo" />
        <div className="title">Stocklinx</div>
      </div>
      {navigationList.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className="navigation-item"
            onClick={() => navigateUser(item, index)}
          >
            <div className="icon">
              <i className={`bx bx-${item.icon}`} style={{ fontSize: "1.4rem", color: item.color }}></i>
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
                <i className='bx bx-chevron-down' style={{ fontSize: "1.4rem", color: "#737373" }}></i>
              </div>
            ) : null}
          </div>
          {item?.displayElements && item.elements
            ? item.elements.map((el, nestedIndex) => (
              <div
                className="navigation-element"
                key={`${index}-${nestedIndex}`}
              >
                <div className="icon">
                  <i className={`bx bx-${el.icon}`} style={{ fontSize: "1.4rem", color: el.color }}></i>
                </div>
                <div className="title">{el.title}</div>
              </div>
            ))
            : null}

        </React.Fragment>
      ))}
    </div>
  );
};

export default Sidebar;
