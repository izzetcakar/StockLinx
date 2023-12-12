import React, { ReactNode } from "react";
import { Badge, Drawer, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createContext } from "react";
import { RootState } from "../redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import filterClasses from "../mantineModules/baseFilter.module.scss";
import { branchActions } from "../redux/branch/actions";

interface GenericProviderProps {
  children: ReactNode;
}
interface GenericContextValues {
  drawerBadge: () => React.ReactNode;
}

const GenericContext = createContext<GenericContextValues>({
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
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.generic.loading);
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const branch = useSelector((state: RootState) => state.branch.branch);
  const [company, setCompany] = React.useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const drawerBadge = () => {
    const findBranchById = (id: string) => {
      const branch = branches.find((branch) => branch.id === id);
      if (!branch) {
        return null;
      }
      return branch;
    };
    if (loading > 0) return null;
    return (
      <>
        <Drawer
          position="right"
          opened={opened}
          onClose={close}
          title="Company - Branch"
        >
          <Select
            data={companies.map((company) => ({
              value: company.id,
              label: company.name,
            }))}
            label="Company"
            placeholder="Select Company"
            value={company}
            onChange={(value) => setCompany(value)}
            classNames={filterClasses}
            dropdownPosition="bottom"
            nothingFound="No company found"
            withAsterisk
            withinPortal
          />
          <Select
            data={branches
              .filter((branch) => branch.companyId == company)
              .map((branch) => ({
                value: branch.id,
                label: branch.name,
              }))}
            label="Branch"
            placeholder="Select Branch"
            value={branch?.id || ""}
            onChange={(value) =>
              dispatch(branchActions.setBranch(findBranchById(value as string)))
            }
            classNames={filterClasses}
            dropdownPosition="bottom"
            nothingFound="No company found"
            withAsterisk
            withinPortal
          />
        </Drawer>
        <Badge
          onClick={open}
          style={{ userSelect: "none", cursor: "pointer" }}
          variant="outline"
          color="blue"
          radius={10}
        >
          Login
        </Badge>
      </>
    );
  };

  const values = {
    drawerBadge,
  };

  return (
    <GenericContext.Provider value={values}>{children}</GenericContext.Provider>
  );
};
export default GenericContext;
