import React, { useState } from "react";
import "./sidebar.scss";
import logo from "/logo.png";
import icon_barcode from "@assets/icon_barcode.png";
import icon_home from "@assets/icon_home.png";
import icon_keybord from "@assets/icon_keyboard.png";
import icon_drop from "@assets/icon_drop.png";
import icon_disk from "@assets/icon_disk.png";
import icon_harddisk from "@assets/icon_harddisk.png";
import icon_settings from "@assets/icon_setting.png";
import icon_group from "@assets/icon_group.png";
import { useLocation, useNavigate } from "react-router-dom";
interface NavigationSubItem {
  title: string;
  target: string;
}
interface NavigationItem {
  title: string;
  icon: string;
  subItems?: NavigationSubItem[];
  isExpanded?: boolean;
  target: string;
  onClick?: () => void;
}

const Sidebar: React.FC = () => {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
  };

  const [navigationList, setNavigationList] = useState<NavigationItem[]>([
    {
      title: "Home",
      icon: icon_home,
      target: "/",
    },
    {
      title: "Test",
      target: "/test",
      icon: icon_home,
    },
    {
      title: "Assets",
      icon: icon_barcode,
      target: "/*",
      subItems: [
        {
          title: "Assets",
          target: "/assets",
        },
        {
          title: "Asset",
          target: "/asset",
        },
      ],
    },
    {
      title: "Licenses",
      icon: icon_disk,
      target: "/*",
      subItems: [
        {
          title: "Licenses",
          target: "/licenses",
        },
        {
          title: "License",
          target: "/license",
        },
      ],
    },
    {
      title: "Accessories",
      icon: icon_keybord,
      target: "/*",
      subItems: [
        {
          title: "Accessories",
          target: "/accessories",
        },
        {
          title: "Accessory",
          target: "/accessory",
        },
      ],
    },
    {
      title: "Consumables",
      icon: icon_drop,
      target: "/*",
      subItems: [
        {
          title: "Consumables",
          target: "/consumables",
        },
        {
          title: "Consumable",
          target: "/consumable",
        },
      ],
    },
    {
      title: "Components",
      icon: icon_harddisk,
      target: "/*",
      subItems: [
        {
          title: "Components",
          target: "/components",
        },
        {
          title: "Component",
          target: "/component",
        },
      ],
    },
    {
      title: "Users",
      icon: icon_group,
      target: "/users",
    },
    {
      title: "Settings",
      icon: icon_settings,

      subItems: [
        {
          title: "Custom Fields",
          target: "/customfields",
        },
        {
          title: "Status Labels",
          target: "/productstatuses",
        },
        {
          title: "Asset Models",
          target: "/models",
        },
        {
          title: "Categories",
          target: "/categories",
        },
        {
          title: "Manufacturers",
          target: "/manufacturers",
        },
        {
          title: "Suppliers",
          target: "/suppliers",
        },
        {
          title: "Companies",
          target: "/companies",
        },
        {
          title: "Departments",
          target: "/departments",
        },
        {
          title: "Locations",
          target: "/locations",
        },
        {
          title: "Users",
          target: "/users",
        },
        {
          title: "Permissions",
          target: "/permissions",
        },
      ],
      isExpanded: false,
      target: "/*",
    },
    {
      title: "Logout",
      icon: "log-out",
      target: "/logout",
      onClick: () => logout(),
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
    if (item.subItems && item.subItems.length > 0) {
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
  };

  const checkIfActive = (item: NavigationItem | NavigationSubItem) => {
    return item.target === location.pathname;
  };

  const getSelectedClass = (
    item: NavigationItem | NavigationSubItem,
    className: string
  ) => {
    return checkIfActive(item) ? className + " selected" : className;
  };

  return (
    <div
      className={`sidebar__container ${isSidebarCollapsed ? "collapsed" : ""}`}
    >
      <div className="navigation__item" onClick={() => handleLogoClick()}>
        <div className="icon">
          <img src={logo} className="logo" alt="Logo" />
        </div>
        <div className="title">Stocklinx</div>
      </div>
      {navigationList.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={getSelectedClass(item, "navigation__item")}
            onClick={
              item.onClick ? item.onClick : () => navigateUser(item, index)
            }
          >
            <img src={item.icon} className={getSelectedClass(item, "icon")} />
            <div className="title">{item.title}</div>
          </div>
          {item?.isExpanded && item.subItems ? (
            <div className="navigation__element__container">
              {item.subItems.map((subItem, nestedIndex) => (
                <div
                  className={getSelectedClass(subItem, "navigation__element")}
                  key={`${index}-${nestedIndex}`}
                  onClick={() => navigate(subItem.target)}
                >
                  <div className="title">{subItem.title}</div>
                </div>
              ))}
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sidebar;
