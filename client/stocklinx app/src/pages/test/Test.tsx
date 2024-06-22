import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@/components/gridTable/GridTable";
import { testColumns, testData } from "./MOCK_DATA";

const Test = () => {
  return (
    <>
      <PageHeader title="Test" enableCompanyDrawer />
      <Gridtable
        data={testData}
        itemKey="id"
        columns={testColumns}
        enableToolbar
        enableEditActions
        enableSelectActions
      />
    </>
  );
};

export default Test;
