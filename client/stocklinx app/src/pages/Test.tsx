import { testData } from "../baseData/MOCK_DATA";
import GridTable from "../components/gridTable/GridTable";
import "./test.scss";

const Test = () => {
  return <GridTable data={testData} keyfield={"id"} />;
};

export default Test;
