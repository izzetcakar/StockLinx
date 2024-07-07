import icon_barcode from "@assets/icon_barcode.png";
import icon_home from "@assets/icon_home.png";
import icon_keybord from "@assets/icon_keyboard.png";
import icon_drop from "@assets/icon_drop.png";
import icon_disk from "@assets/icon_disk.png";
import icon_harddisk from "@assets/icon_harddisk.png";
import icon_settings from "@assets/icon_setting.png";
import icon_group from "@assets/icon_group.png";

export const baseNavigationList = [
  {
    title: "Test",
    target: "/test",
    icon: icon_home,
  },
  {
    title: "Assets",
    icon: icon_barcode,
    target: "/*",
    subItems: [
      {
        title: "Assets",
        target: "/assets",
      },
      {
        title: "Asset",
        target: "/asset",
      },
    ],
  },
  {
    title: "Licenses",
    icon: icon_disk,
    target: "/*",
    subItems: [
      {
        title: "Licenses",
        target: "/licenses",
      },
      {
        title: "License",
        target: "/license",
      },
    ],
  },
  {
    title: "Accessories",
    icon: icon_keybord,
    target: "/*",
    subItems: [
      {
        title: "Accessories",
        target: "/accessories",
      },
      {
        title: "Accessory",
        target: "/accessory",
      },
    ],
  },
  {
    title: "Consumables",
    icon: icon_drop,
    target: "/*",
    subItems: [
      {
        title: "Consumables",
        target: "/consumables",
      },
      {
        title: "Consumable",
        target: "/consumable",
      },
    ],
  },
  {
    title: "Components",
    icon: icon_harddisk,
    target: "/*",
    subItems: [
      {
        title: "Components",
        target: "/components",
      },
      {
        title: "Component",
        target: "/component",
      },
    ],
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
        title: "Custom Fields",
        target: "/customfields",
      },
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

export const adminNavigationList = [
  ...baseNavigationList,
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
