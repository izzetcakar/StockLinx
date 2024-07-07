import { Menu, Select } from "@mantine/core";
import { useContext } from "react";
import iconSetting from "@assets/icon_setting.png";
import logo from "@assets/logo.png";
import GenericContext from "@/context/GenericContext";
import "./header.scss";

const Header = () => {
  const { isSidebarCollapsed, setIsSidebarCollapsed, hideAllDisplayElements } =
    useContext(GenericContext);
  const profileSettings = [
    { id: 1, name: "Profile", icon: "user" },
    {
      id: 2,
      name: "Messages",
      icon: "email",
      badge: "5",
    },
    { id: 3, name: "Friends", icon: "group" },
    { id: 4, name: "Exit", icon: "runner" },
  ];

  const handleLogoClick = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    hideAllDisplayElements();
  };

  return (
    <div className="page__header">
      <div className="page__header__item">
        <div className="navigation__item" onClick={() => handleLogoClick()}>
          <div className="icon">
            <img src={logo} className="logo" alt="Logo" />
          </div>
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
      <Menu
        transitionProps={{ transition: "pop-top-right" }}
        position="bottom-end"
        width="auto"
      >
        <Menu.Target>
          <img src={iconSetting} />
        </Menu.Target>
        <Menu.Dropdown>
          {profileSettings.map((item) => (
            <Menu.Item key={item.id}>{item.name}</Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default Header;
