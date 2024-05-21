import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { Button, Menu, rem } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import filterClasses from "../../mantineModules/filter.module.scss";
import iconSetting from "../../assets/icon_setting.png";
import "./header.scss";

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const downloads = [
    "Download Trial For Visual Studio",
    "Download Trial For All Platforms",
    "Package Managers",
  ];
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

  return (
    <div className="page__header">
      <div className="page__header__title">Header</div>
      <div className="page__header__actions">
        <Menu
          transitionProps={{ transition: "pop-top-right" }}
          position="bottom-end"
          width="auto"
          classNames={filterClasses}
        >
          <Menu.Target>
            <Button
              rightSection={
                <IconChevronDown
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              className="test"
              variant="outline"
              size="xs"
              color="gray"
              px={0}
            >
              Create New
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {profileSettings.map((item) => (
              <Menu.Item key={item.id}>{item.name}</Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        <Menu
          transitionProps={{ transition: "pop-top-right" }}
          position="bottom-end"
          width="auto"
          classNames={filterClasses}
        >
          <Menu.Target>
            <Button
              rightSection={
                <IconChevronDown
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              className="test"
              variant="outline"
              size="xs"
              color="gray"
              px={0}
            >
              {user?.firstName + " " + user?.lastName}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {downloads.map((item) => (
              <Menu.Item key={item}>{item}</Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className="page__header__action">
        <img src={iconSetting} />
      </div>
    </div>
  );
};

export default Header;
