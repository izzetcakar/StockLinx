import React, { ReactNode, useEffect } from "react";
import { Badge, Drawer, LoadingOverlay, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createContext } from "react";
import { RootState } from "../redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { branchActions } from "../redux/branch/actions";
import { companyActions } from "../redux/company/actions";
import filterClasses from "../mantineModules/baseFilter.module.scss";

interface GenericProviderProps {
  children: ReactNode;
}
interface GenericContextValues {
  drawerBadge: () => React.ReactNode;
  drawerOpened: boolean;
}

const GenericContext = createContext<GenericContextValues>({
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
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.generic.loading);
  const companies = useSelector((state: RootState) => state.company.companies);
  const branches = useSelector((state: RootState) => state.branch.branches);
  const branch = useSelector((state: RootState) => state.branch.branch);
  const [company, setCompany] = React.useState<string | null>(null);
  const [drawerOpened, { open, close }] = useDisclosure(false);

  const refreshData = () => {
    dispatch(companyActions.getAll());
    dispatch(branchActions.getAll());
  };
  useEffect(() => {
    if (drawerOpened) {
      refreshData();
    }
  }, [drawerOpened]);

  const getCompanyAndBranch = () => {
    if (branch) {
      const company = companies.find(
        (company) => company.id === branch.companyId
      );
      if (company) {
        return company.name + "-" + branch.name;
      }
    }
  };

  const drawerBadge = () => {
    const findBranchById = (id: string) => {
      const branch = branches.find((branch) => branch.id === id);
      if (!branch) {
        return null;
      }
      return branch;
    };
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
            data={companies.map((company) => ({
              value: company.id,
              label: company.name,
            }))}
            label="Company"
            placeholder="Select Company"
            value={company}
            onChange={(value) => setCompany(value)}
            classNames={filterClasses}
            comboboxProps={{ position: "bottom" }}
            nothingFoundMessage="No company found"
            required
            withAsterisk
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
            value={branch?.id}
            onChange={(value) =>
              dispatch(branchActions.setBranch(findBranchById(value as string)))
            }
            classNames={filterClasses}
            comboboxProps={{ position: "bottom" }}
            nothingFoundMessage={
              company ? "No branch found" : "Select company first"
            }
            required
            withAsterisk
          />
          <LoadingOverlay visible={loading > 0} zIndex={1000} />
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
    drawerOpened,
    drawerBadge,
  };

  return (
    <GenericContext.Provider value={values}>{children}</GenericContext.Provider>
  );
};
export default GenericContext;
