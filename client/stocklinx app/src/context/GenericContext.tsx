import React, { ReactNode } from "react";
import { Badge, Drawer, Select } from "@mantine/core";
import { createContext } from "react";
import { useCompany } from "@/hooks/company";
import { ICompany } from "@/interfaces/serverInterfaces";
import { useDisclosure } from "@mantine/hooks";

interface GenericProviderProps {
  children: ReactNode;
}
interface GenericContextValues {
  company: ICompany | null;
  drawerBadge: () => React.ReactNode;
  drawerOpened: boolean;
}

const GenericContext = createContext<GenericContextValues>({
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

  const getCompany = () => {
    if (company) {
      return company.name;
    }
    return "Select Company"
  };

  const drawerBadge = () => {
    return (
      <>
        <Drawer
          id="company_drawer"
          position="right"
          opened={drawerOpened}
          onClose={close}
          title="Companies"
        >
          <Select
            data={companies?.map((company) => ({
              value: company.id,
              label: company.name,
            }))}
            label="Company"
            placeholder="Select Company"
            value={company?.id || ""}
            onChange={(value) =>
              setCompany(companies?.find((c) => c.id === value) || null)
            }
            comboboxProps={{ position: "bottom" }}
            nothingFoundMessage="No company found"
            required
            withAsterisk
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
    company,
    drawerOpened,
    drawerBadge,
  };

  return (
    <GenericContext.Provider value={values}>{children}</GenericContext.Provider>
  );
};
export default GenericContext;
