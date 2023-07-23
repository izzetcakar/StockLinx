import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import "boxicons";
import logo from "../../images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { checkEmpty } from "../../functions/checkEmpty";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";
import { getMenuItemsByDomain } from "../../redux/menuItemReducer";
import { notifyError } from "../../functions/notifyError";
import { setSelectedDomain } from "../../redux/domainReducer";
import { IMenuItem } from "../../interfaces/interfaces";
import { getPageAllDataById } from "../../redux/pageReducer";

interface NavigationItem {
  title: string;
  icon: string;
  color: string;
  subItems?: NavigationItem[];
  isExpanded?: boolean;
  target: string;
}
const rootNavigationList: NavigationItem[] = [
  {
    title: "Home",
    icon: "home-alt",
    color: "#737373",
    target: "/"
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
    target: "/",
  },
]
const Sidebar: React.FC = () => {
  const [navigationList, setNavigationList] = useState<NavigationItem[]>(rootNavigationList);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const selectedDomain = useAppSelector((state: RootState) => state.domain.selectedDomain);
  const menuItems = useAppSelector((state: RootState) => state.menuItem.menuItems);
  const menuItemErr = useAppSelector((state: RootState) => state.menuItem.error);
  const page = useAppSelector((state: RootState) => state.page.page);
  const pageErr = useAppSelector((state: RootState) => state.page.error);

  useEffect(() => {
    handleMenuItems();
  }, [selectedDomain])

  const handleMenuItems = async () => {
    await dispatch(getMenuItemsByDomain(selectedDomain));
    if (menuItemErr) {
      notifyError(menuItemErr);
      dispatch(setSelectedDomain(""));
    }
    else {
      let newNavigationList = generateNavigationItems(menuItems);
      setNavigationList(prev => newNavigationList);
    }
  }
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
  const navigateUser = async (item: NavigationItem, index: number) => {
    if (checkEmpty(item.subItems)) {
      handleNavElements(index);
    }
    if (item.target.split("/")[0] === "page") {
      await dispatch(getPageAllDataById(item.target.split("/")[1]));
      if (pageErr) {
        notifyError(pageErr);
      }
      else {
        navigate("/page");
      }
    }
    else {
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
  const generateNavigationItems = (
    data: IMenuItem[],
    languageState: number = 0,
    targetIndex: number = 1
  ): NavigationItem[] => {
    const getLanguageText = (title: any[]): string => {
      const languageTitle = title.find((item: any) => item.lngType === languageState);
      return languageTitle ? languageTitle.text : '';
    };

    const createNavigationItem = (item: any): NavigationItem => {
      const title = getLanguageText(item.title);
      const subItems = data
        .filter((subItem: any) => subItem.parentId === item.id)
        .map(createNavigationItem);

      return {
        title,
        icon: "pie-chart-alt",
        color: "#737373",
        subItems,
        isExpanded: false,
        target: `page/${item.pageId}`,
      };
    };

    const rootItems = data.filter((item: any) => item.parentId === null);
    const navigationItems = rootItems.map(createNavigationItem);

    const modifiedNavigationList = rootNavigationList.slice();
    modifiedNavigationList.splice(targetIndex, 0, ...navigationItems);
    return modifiedNavigationList;
  };

  const checkIfSelected = (item: NavigationItem) => {
    return (item.target === location.pathname) || ((location.pathname === "/page") && (item.target.split("/")[1] === page.id));
  }
  return (
    <div
      className={`sidebar-container ${isSidebarCollapsed ? "collapsed" : ""}`}
    >
      <div className="navigation-item" onClick={() => handleLogoClick()}>
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
