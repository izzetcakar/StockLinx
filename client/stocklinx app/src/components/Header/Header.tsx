import { Select } from "@mantine/core";
import { useContext } from "react";
import { useUser } from "@/hooks/query";
import logo from "@assets/logo.png";
import GenericContext from "@/context/GenericContext";
import "./header.scss";

const Header = () => {
  const { isSidebarCollapsed, setIsSidebarCollapsed, hideAllDisplayElements } =
    useContext(GenericContext);

  const { data: user } = useUser.GetWithToken();

  const handleLogoClick = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    hideAllDisplayElements();
  };

  return (
    <div className="page__header">
      <div className="page__header__item">
        <div className="icon" onClick={() => handleLogoClick()}>
          <img src={logo} className="logo" alt="Logo" />
        </div>
        <Select
          data={[
            { value: "en", label: "English" },
            { value: "ru", label: "Russian" },
          ]}
          placeholder="Search"
          searchable
          clearable
          style={{ width: 300 }}
        />
      </div>
      <div className="page__header__item">
        {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()}
      </div>
    </div>
  );
};

export default Header;
