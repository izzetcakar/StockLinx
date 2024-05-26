import { Anchor, Breadcrumbs, Menu } from "@mantine/core";
import iconSetting from "../../assets/icon_setting.png";
import "./header.scss";

const Header = () => {
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

  const items = [
    { title: "Mantine", href: "" },
    { title: "Mantine hooks", href: "" },
    { title: "use-id", href: "" },
  ];

  return (
    <div className="page__header">
      <div className="page__header__item">
        <div className="page__header__title">Header</div>
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
