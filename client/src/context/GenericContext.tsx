import React, { ReactNode, useLayoutEffect, useState } from "react";
import { Badge, Drawer, Select } from "@mantine/core";
import { createContext } from "react";
import { useCompany, useUser } from "@queryhooks";
import { ICompany } from "@/interfaces/serverInterfaces";
import { useDisclosure } from "@mantine/hooks";
import { NavigationItem } from "@/interfaces/clientInterfaces";
import {
  adminNavigationList,
  baseNavigationList,
} from "@/utils/navigationUtils";

interface GenericProviderProps {
  children: ReactNode;
}
interface GenericContextValues {
  navigationList: NavigationItem[];
  isSidebarCollapsed: boolean;
  company: ICompany | null;
  drawerOpened: boolean;
  setNavigationList: React.Dispatch<React.SetStateAction<NavigationItem[]>>;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  hideAllDisplayElements: () => void;
  drawerBadge: () => React.ReactNode;
}

const GenericContext = createContext<GenericContextValues>({
  navigationList: [],
  isSidebarCollapsed: false,
  setNavigationList: () => {},
  setIsSidebarCollapsed: () => {},
  hideAllDisplayElements: () => {},
  company: null,
  drawerOpened: false,
  drawerBadge: () => (
    <Drawer
      position="right"
      opened={false}
      onClose={close}
      title="Select Company"
    />
  ),
});
export const GenericProvider: React.FC<GenericProviderProps> = ({
  children,
}) => {
  const [company, setCompany] = React.useState<ICompany | null>(null);
  const { data: companies } = useCompany.GetAll();
  const [drawerOpened, { open, close }] = useDisclosure(false);
  const { data: user } = useUser.GetWithToken();
  const [navigationList, setNavigationList] = useState<NavigationItem[]>(
    user?.isAdmin ? adminNavigationList : baseNavigationList
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useLayoutEffect(() => {
    if (user?.isAdmin) {
      setNavigationList(adminNavigationList);
    } else {
      setNavigationList(baseNavigationList);
    }
  }, [user?.isAdmin]);

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
  };

  const getCompany = () => {
    if (company) {
      return company.name;
    }
    return "Select Company";
  };

  const drawerBadge = () => {
    return (
      <>
        <Drawer
          id="company_drawer"
          position="right"
          opened={drawerOpened}
          onClose={close}
          title="Select Company"
        >
          <Select
            data={companies?.map((company) => ({
              value: company.id,
              label: company.tag + " - " + company.name,
            }))}
            label="Company"
            placeholder="Company"
            value={company?.id || ""}
            onChange={(value) =>
              setCompany(companies?.find((c) => c.id === value) || null)
            }
            comboboxProps={{ position: "bottom" }}
            nothingFoundMessage="No company found"
          />
        </Drawer>
        <Badge
          onClick={open}
          style={{ userSelect: "none", cursor: "pointer" }}
          variant="outline"
          color="blue"
          radius={10}
          w="fit-content"
        >
          {getCompany()}
        </Badge>
      </>
    );
  };

  const values = {
    navigationList,
    isSidebarCollapsed,
    company,
    drawerOpened,
    setNavigationList,
    setIsSidebarCollapsed,
    hideAllDisplayElements,
    drawerBadge,
  };

  return (
    <GenericContext.Provider value={values}>{children}</GenericContext.Provider>
  );
};
export default GenericContext;
