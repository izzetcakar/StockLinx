import React, { useState } from "react";
import "./sidebar.scss";
import "boxicons";
import logo from "/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { checkEmpty } from "../../functions/checkEmpty";

interface NavigationItem {
  title: string;
  icon: string;
  color: string;
  subItems?: NavigationItem[];
  isExpanded?: boolean;
  target: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [navigationList, setNavigationList] = useState<NavigationItem[]>([
    {
      title: "Home",
      icon: "home-alt",
      color: "#737373",
      subItems: [
        {
          title: "Test",
          icon: "bar-chart-alt-2",
          target: "",
          color: "#737373",
        },
      ],
      isExpanded: false,
      target: "/"
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
      title: "Company",
      icon: "pie-chart-alt",
      color: "#737373",
      target: "/company",
    },
    {
      title: "Department",
      icon: "pie-chart-alt",
      color: "#737373",
      target: "/department",
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
      if (item?.subItems && target === index) {
        return { ...item, isExpanded: !item.isExpanded };
      } else {
        return item;
      }
    });
    setNavigationList(newList);
  };
  const navigateUser = (item: NavigationItem, index: number) => {
    if (checkEmpty(item.subItems)) {
      handleNavElements(index);
    } else {
      handleNavElements(-1);
      navigate(item.target);
    }
  };


  const hideAllDisplayElements = () => {
    setNavigationList((prev) =>
      prev.map((item) => {
        if (item?.isExpanded && item?.subItems) {
          return { ...item, isExpanded: false };
        } else {
          return item;
        }
      })
    );
  }
  const checkIfSelected = (item: NavigationItem) => {
    return (item.target === location.pathname);
  }
  return (
    <div
      className={`sidebar-container ${isSidebarCollapsed ? "collapsed" : ""}`}
    >
      <div className="navigation-item logo" onClick={() => handleLogoClick()}>
        <img src={logo} className="icon" alt="Logo" />
        <div className="title">Stocklinx</div>
      </div>
      {navigationList.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={checkIfSelected(item) ? "navigation-item selected" : "navigation-item"}
            onClick={() => navigateUser(item, index)}
          >
            <div className="icon">
              <i className={`bx bx-${item.icon}`} style={{ fontSize: "1.4rem", color: item.target === location.pathname ? "white" : item.color }}></i>
            </div>
            <div className="title">{item.title}</div>
            {checkEmpty(item?.subItems) ? (
              <div
                className={
                  item?.isExpanded
                    ? "arrow-down arrow-down-open"
                    : "arrow-down"
                }
              >
                <i className='bx bx-chevron-down' style={{ fontSize: "1.4rem", color: "#737373" }}></i>
              </div>
            ) : null}
          </div>
          {item?.isExpanded && item.subItems
            ? item.subItems.map((subItem, nestedIndex) => (
              <div
                className={checkIfSelected(subItem) ? "navigation-element selected" : "navigation-element"}
                key={`${index}-${nestedIndex}`}
                onClick={() => navigateUser(subItem, nestedIndex)}
              >
                <div className="icon">
                  <i className={`bx bx-${subItem.icon}`} style={{ fontSize: "1.4rem", color: checkIfSelected(subItem) ? "white" : subItem.color }}></i>
                </div>
                <div className="title">{subItem.title}</div>
              </div>
            ))
            : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sidebar;
