import {
  adminNavigationList,
  baseNavigationList,
} from "@/utils/navigationUtils";
import { Select } from "@mantine/core";
import { useContext } from "react";
import { useUser } from "@/hooks/query";
import { useNavigate } from "react-router-dom";
import logo from "@assets/logo.png";
import GenericContext from "@/context/GenericContext";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const { isSidebarCollapsed, setIsSidebarCollapsed, hideAllDisplayElements } =
    useContext(GenericContext);

  const { data: user } = useUser.GetWithToken();

  const handleLogoClick = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    hideAllDisplayElements();
  };

  const getNavigationMenu = () => {
    return user?.isAdmin ? adminNavigationList : baseNavigationList;
  };

  const navigateTo = (target: string | null) => {
    if (!target) return;
    navigate(target);
  };

  return (
    <div className="page__header">
      <div className="page__header__item">
        <div className="icon" onClick={() => handleLogoClick()}>
          <img src={logo} className="logo" alt="Logo" />
        </div>
        <Select
          data={getNavigationMenu().map((item) => {
            return { value: item.target, label: item.title };
          })}
          onChange={(value) => navigateTo(value)}
          placeholder="Search"
          className="header__search"
          styles={{
            section: {
              display: "none",
            },
          }}
          searchable
          clearable
        />
      </div>
      <div className="page__header__item">
        {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()}
      </div>
    </div>
  );
};

export default Header;
