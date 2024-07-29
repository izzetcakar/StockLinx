import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NavigationItem,
  NavigationSubItem,
} from "@/interfaces/clientInterfaces";
import { IconChevronDown } from "@tabler/icons-react";
import GenericContext from "@/context/GenericContext";
import "./sidebar.scss";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSidebarCollapsed, navigationList, setNavigationList } =
    useContext(GenericContext);

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
            {item.subItems && item?.subItems?.length > 0 ? (
              <IconChevronDown
                className={item.isExpanded ? "iconNav expanded" : "iconNav"}
                size={18}
              />
            ) : null}
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
      <div
        className="navigation__item logout"
        onClick={() => localStorage.removeItem("token")}
      >
        <div className="title">Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
