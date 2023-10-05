import "./header.scss";
import iconSetting from "../../assets/icon_setting.png";
import iconPower from "../../assets/icon_power.png";
import DropDownButton from "devextreme-react/drop-down-button";
import { ItemClickEvent } from "devextreme/ui/drop_down_button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const buttonDropDownOptions = { width: 150 };
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

  const onItemClick = (e: ItemClickEvent) => {
    console.log(e.itemData);
  };
  const onItemClick2 = (e: ItemClickEvent) => {
    console.log(e.itemData);
  };
  return (
    <div className="page-header">
      <div className="page-header-title">Header</div>
      <div className="page-header-actions">
        <div className="page-header-action-button">
          <DropDownButton
            useSelectMode={false}
            text="Create New"
            items={profileSettings}
            displayExpr="name"
            keyExpr="id"
            onItemClick={onItemClick2}
            stylingMode="text"
            height={40}
          />
        </div>
        <div className="page-header-action-button">
          <DropDownButton
            text={user?.firstName + " " + user?.lastName}
            icon={iconPower}
            items={downloads}
            onItemClick={onItemClick}
            dropDownOptions={buttonDropDownOptions}
            height={40}
            stylingMode="text"
          />
        </div>
        <div className="page-header-action">
          <img src={iconSetting} />
        </div>
      </div>
    </div>
  );
};

export default Header;
