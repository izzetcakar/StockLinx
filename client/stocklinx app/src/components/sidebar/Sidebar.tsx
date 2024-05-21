import React, { useState } from "react";
import "./sidebar.scss";
import "boxicons";
import logo from "/logo.png";
import icon_barcode from "../../assets/icon_barcode.png";
import icon_home from "../../assets/icon_home.png";
import icon_keybord from "../../assets/icon_keyboard.png";
import icon_drop from "../../assets/icon_drop.png";
import icon_disk from "../../assets/icon_disk.png";
import icon_harddisk from "../../assets/icon_harddisk.png";
import icon_settings from "../../assets/icon_setting.png";
import icon_group from "../../assets/icon_group.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/user/actions";
import { checkEmpty } from "../../functions/checkEmpty";

interface NavigationSubItem {
  title: string;
  color: string;
  target: string;
}
interface NavigationItem {
  title: string;
  icon: string;
  color: string;
  subItems?: NavigationSubItem[];
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
      title: "Assets",
      icon: icon_barcode,
      color: "#737373",
      target: "/assets",
    },
    {
      title: "Licenses",
      icon: icon_disk,
      color: "#737373",
      target: "/licenses",
    },
    {
      title: "Accessories",
      icon: icon_keybord,
      color: "#737373",
      target: "/accessories",
    },
    {
      title: "Consumables",
      icon: icon_drop,
      color: "#737373",
      target: "/consumables",
    },
    {
      title: "Components",
      icon: icon_harddisk,
      color: "#737373",
      target: "/components",
    },
    {
      title: "Users",
      icon: icon_group,
      color: "#737373",
      target: "/users",
    },
    {
      title: "Settings",
      icon: icon_settings,
      color: "#737373",
      subItems: [
        {
          title: "Custom Fields",
          color: "#737373",
          target: "/customfields",
        },
        {
          title: "Status Labels",
          color: "#737373",
          target: "/productstatuses",
        },
        {
          title: "Asset Models",
          color: "#737373",
          target: "/models",
        },
        {
          title: "Categories",
          color: "#737373",
          target: "/categories",
        },
        {
          title: "Manufacturers",
          color: "#737373",
          target: "/manufacturers",
        },
        {
          title: "Suppliers",
          color: "#737373",
          target: "/suppliers",
        },
        {
          title: "Companies",
          color: "#737373",
          target: "/companies",
        },
        {
          title: "Branches",
          color: "#737373",
          target: "/branches",
        },
        {
          title: "Departments",
          color: "#737373",
          target: "/departments",
        },
        {
          title: "Locations",
          color: "#737373",
          target: "/locations",
        },
        {
          title: "Users",
          color: "#737373",
          target: "/users",
        },
        {
          title: "Permissions",
          color: "#737373",
          target: "/permissions",
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
