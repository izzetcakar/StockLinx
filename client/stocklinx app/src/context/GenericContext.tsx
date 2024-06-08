import React, { ReactNode } from "react";
import { Badge, Drawer, Select } from "@mantine/core";
import { createContext } from "react";
import { useBranch } from "@/queryhooks/branch";
import { useCompany } from "@/queryhooks/company";
import { IBranch, ICompany } from "@/interfaces/serverInterfaces";
import { useDisclosure } from "@mantine/hooks";

interface GenericProviderProps {
  children: ReactNode;
}
interface GenericContextValues {
  branch: IBranch | null;
  company: ICompany | null;
  drawerBadge: () => React.ReactNode;
  drawerOpened: boolean;
}

const GenericContext = createContext<GenericContextValues>({
  company: null,
  branch: null,
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
  const [branch, setBranch] = React.useState<IBranch | null>(null);
  const [company, setCompany] = React.useState<ICompany | null>(null);
  const { data: branches } = useBranch.GetAll();
  const { data: companies } = useCompany.GetAll();
  const [drawerOpened, { open, close }] = useDisclosure(false);

  const getCompanyAndBranch = () => {
    if (branch) {
      const company = companies?.find(
        (company) => company.id === branch.companyId
      );
      if (company) {
        return company.name + "-" + branch.name;
      }
    }
  };

  const drawerBadge = () => {
    return (
      <>
        <Drawer
          id="company_drawer"
          position="right"
          opened={drawerOpened}
          onClose={close}
          title="Company - Branch"
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
          <Select
            data={branches
              ?.filter((branch) => branch.companyId == company?.id)
              .map((branch) => ({
                value: branch.id,
                label: branch.name,
              }))}
            label="Branch"
            placeholder="Select Branch"
            value={branch?.id}
            onChange={(value) =>
              setBranch(branches?.find((b) => b.id === value) || null)
            }
            comboboxProps={{ position: "bottom" }}
            nothingFoundMessage={
              company ? "No branch found" : "Select company first"
            }
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
          {getCompanyAndBranch() || "Select Branch"}
        </Badge>
      </>
    );
  };

  const values = {
    branch,
    company,
    drawerOpened,
    drawerBadge,
  };

  return (
    <GenericContext.Provider value={values}>{children}</GenericContext.Provider>
  );
};
export default GenericContext;
