import icon_barcode from "@assets/icon_barcode.png";
import icon_home from "@assets/icon_home.png";
import icon_keybord from "@assets/icon_keyboard.png";
import icon_drop from "@assets/icon_drop.png";
import icon_disk from "@assets/icon_disk.png";
import icon_harddisk from "@assets/icon_harddisk.png";
import icon_settings from "@assets/icon_setting.png";
import icon_group from "@assets/icon_group.png";
import { NavigationItem } from "@/interfaces/clientInterfaces";

export const baseNavigationList: NavigationItem[] = [
  {
    title: "Test",
    target: "/test",
    icon: icon_home,
  },
  {
    title: "Assets",
    icon: icon_barcode,
    target: "/assets",
  },
  {
    title: "Licenses",
    icon: icon_disk,
    target: "/licenses",
  },
  {
    title: "Accessories",
    icon: icon_keybord,
    target: "/accessories",
  },
  {
    title: "Consumables",
    icon: icon_drop,
    target: "/consumables",
  },
  {
    title: "Components",
    icon: icon_harddisk,
    target: "/components",
  },
  {
    title: "Employees",
    icon: icon_group,
    target: "/employees",
  },
  {
    title: "Settings",
    icon: icon_settings,
    subItems: [
      {
        title: "Status Labels",
        target: "/productstatuses",
      },
      {
        title: "Asset Models",
        target: "/models",
      },
      {
        title: "Categories",
        target: "/categories",
      },
      {
        title: "Manufacturers",
        target: "/manufacturers",
      },
      {
        title: "Suppliers",
        target: "/suppliers",
      },
      {
        title: "Companies",
        target: "/companies",
      },
      {
        title: "Departments",
        target: "/departments",
      },
      {
        title: "Locations",
        target: "/locations",
      },
      {
        title: "Users",
        target: "/users",
      },
    ],
    isExpanded: false,
    target: "/*",
  },
];

const adminNavigationItems: NavigationItem[] = [
  {
    title: "Users",
    icon: icon_group,
    target: "/users",
  },
  {
    icon: "",
    title: "Permissions",
    target: "/permissions",
  },
];

export const adminNavigationList: NavigationItem[] = [
  ...baseNavigationList,
  ...adminNavigationItems,
];
