import React, { useState } from "react";
import "./sidebar.scss";
import "boxicons";
import logo from "/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { checkEmpty } from "../../functions/checkEmpty";
import icon_barcode from "../../assets/icon_barcode.png";
import icon_home from "../../assets/icon_home.png";
import icon_keybord from "../../assets/icon_keyboard.png";
import icon_drop from "../../assets/icon_drop.png";
import icon_disk from "../../assets/icon_disk.png";
import icon_harddisk from "../../assets/icon_harddisk.png";
import icon_settings from "../../assets/icon_setting.png";
import icon_group from "../../assets/icon_group.png";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/user/actions";

interface NavigationItem {
  title: string;
  icon: string;
  color: string;
  subItems?: NavigationItem[];
  isExpanded?: boolean;
  target: string;
  onClick?: () => void;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(userActions.logoutUser());
    navigate("/login");
  };

  const [navigationList, setNavigationList] = useState<NavigationItem[]>([
    {
      title: "Home",
      icon: icon_home,
      color: "#737373",
      target: "/",
    },
    {
      title: "Asset",
      icon: icon_barcode,
      color: "#737373",
      target: "/asset",
    },
    {
      title: "License",
      icon: icon_disk,
      color: "#737373",
      target: "/license",
    },
    {
      title: "Accessory",
      icon: icon_keybord,
      color: "#737373",
      target: "/accessory",
    },
    {
      title: "Consumable",
      icon: icon_drop,
      color: "#737373",
      target: "/consumable",
    },
    {
      title: "Component",
      icon: icon_harddisk,
      color: "#737373",
      target: "/component",
    },
    {
      title: "User",
      icon: icon_group,
      color: "#737373",
      target: "/user",
    },
    {
      title: "Test",
      icon: icon_harddisk,
      color: "#737373",
      target: "/test",
    },
    {
      title: "Generic",
      icon: icon_harddisk,
      color: "#737373",
      target: "/generic",
    },
    {
      title: "Settings",
      icon: icon_settings,
      color: "#737373",
      subItems: [
        {
          title: "Custom Fields",
          icon: icon_harddisk,
          color: "#737373",
          target: "/customfields",
        },
        {
          title: "Status Labels",
          icon: icon_harddisk,
          color: "#737373",
          target: "/productstatus",
        },
        {
          title: "Asset Models",
          icon: icon_harddisk,
          color: "#737373",
          target: "/model",
        },
        {
          title: "Categories",
          icon: icon_harddisk,
          color: "#737373",
          target: "/category",
        },
        {
          title: "Manufacturers",
          icon: icon_harddisk,
          color: "#737373",
          target: "/manufacturer",
        },
        {
          title: "Suppliers",
          icon: icon_harddisk,
          color: "#737373",
          target: "/supplier",
        },
        {
          title: "Companies",
          icon: icon_harddisk,
          color: "#737373",
          target: "/company",
        },
        {
          title: "Branches",
          icon: icon_harddisk,
          color: "#737373",
          target: "/branch",
        },
        {
          title: "Departments",
          icon: icon_harddisk,
          color: "#737373",
          target: "/department",
        },
        {
          title: "Locations",
          icon: icon_harddisk,
          color: "#737373",
          target: "/location",
        },
      ],
      isExpanded: false,
      target: "/*",
    },
    {
      title: "Logout",
      icon: "log-out",
      color: "#737373",
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
  };
  const checkIfSelected = (item: NavigationItem) => {
    return item.target === location.pathname;
  };

  return (
    <div
      className={`sidebar-container ${isSidebarCollapsed ? "collapsed" : ""}`}
    >
      <div className="navigation-item" onClick={() => handleLogoClick()}>
        <div className="icon">
          <img src={logo} className="logo" alt="Logo" />
        </div>
        <div className="title">Stocklinx</div>
      </div>
      {navigationList.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={
              checkIfSelected(item)
                ? "navigation-item selected"
                : "navigation-item"
            }
            onClick={
              item.onClick ? item.onClick : () => navigateUser(item, index)
            }
          >
            <div className="icon">
              <img
                src={item.icon}
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                }}
              />
            </div>
            <div className="title">{item.title}</div>
            {checkEmpty(item?.subItems) ? (
              <div
                className={
                  item?.isExpanded ? "arrow-down arrow-down-open" : "arrow-down"
                }
              >
                <i
                  className="bx bx-chevron-down"
                  style={{ fontSize: "1.4rem", color: "#737373" }}
                />
              </div>
            ) : null}
          </div>
          {item?.isExpanded && item.subItems
            ? item.subItems.map((subItem, nestedIndex) => (
                <div
                  className={
                    checkIfSelected(subItem)
                      ? "navigation-element selected"
                      : "navigation-element"
                  }
                  key={`${index}-${nestedIndex}`}
                  onClick={() => navigate(subItem.target)}
                >
                  <div className="icon">
                    <i
                      className={`bx bx-${subItem.icon}`}
                      style={{
                        fontSize: "1.4rem",
                        color: checkIfSelected(subItem)
                          ? "white"
                          : subItem.color,
                      }}
                    />
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
