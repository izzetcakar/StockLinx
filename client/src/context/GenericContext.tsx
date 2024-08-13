import React, { ReactNode, useLayoutEffect, useState } from "react";
import { createContext } from "react";
import { NavigationItem } from "@/interfaces/clientInterfaces";
import {
  adminNavigationList,
  baseNavigationList,
} from "@/utils/navigationUtils";
import { useUser } from "@/hooks/query";

interface GenericProviderProps {
  children: ReactNode;
}
interface GenericContextValues {
  navigationList: NavigationItem[];
  isSidebarCollapsed: boolean;
  setNavigationList: React.Dispatch<React.SetStateAction<NavigationItem[]>>;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  hideAllDisplayElements: () => void;
}

const GenericContext = createContext<GenericContextValues>({
  navigationList: [],
  isSidebarCollapsed: false,
  setNavigationList: () => {},
  setIsSidebarCollapsed: () => {},
  hideAllDisplayElements: () => {},
});
export const GenericProvider: React.FC<GenericProviderProps> = ({
  children,
}) => {
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

  const values = {
    navigationList,
    isSidebarCollapsed,
    setNavigationList,
    setIsSidebarCollapsed,
    hideAllDisplayElements,
  };

  return (
    <GenericContext.Provider value={values}>{children}</GenericContext.Provider>
  );
};
export default GenericContext;
