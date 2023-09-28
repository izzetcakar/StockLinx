import { testData } from "../baseData/MOCK_DATA";
import GridTable from "../components/gridTable/GridTable";
// import { Column } from "../components/gridTable/interfaces/interfaces";
import "./test.scss";

const Test = () => {
  // const columns: Column[] = [
  //   {
  //     caption: "Company",
  //     dataField: "company",
  //   },
  //   {
  //     caption: "Contact",
  //     dataField: "contact",
  //   },
  //   {
  //     caption: "Country",
  //     dataField: "country",
  //   },
  // ];
  // const data = [
  //   {
  //     company: "Alfreds Futterkiste",
  //     contact: "Maria Anders",
  //     country: "Germany",
  //   },
  //   {
  //     company: "Berglunds snabbköp",
  //     contact: "Christina Berglund",
  //     country: "Sweden",
  //   },
  //   {
  //     company: "Centro comercial Moctezuma",
  //     contact: "Francisco Chang",
  //     country: "Mexico",
  //   },
  //   {
  //     company: "Ernst Handel",
  //     contact: "Roland Mendel",
  //     country: "Austria",
  //   },
  //   {
  //     company: "Island Trading",
  //     contact: "Helen Bennett",
  //     country: "UK",
  //   },
  //   {
  //     company: "Königlich Essen",
  //     contact: "Philip Cramer",
  //     country: "Germany",
  //   },
  //   {
  //     company: "Laughing Bacchus Winecellars",
  //     contact: "Yoshi Tannamuri",
  //     country: "Canada",
  //   },
  //   {
  //     company: "Magazzini Alimentari Riuniti",
  //     contact: "Giovanni Rovelli",
  //     country: "Italy",
  //   },
  //   {
  //     company: "North/South",
  //     contact: "Simon Crowther",
  //     country: "UK",
  //   },
  //   {
  //     company: "Paris spécialités",
  //     contact: "Marie Bertrand",
  //     country: "France",
  //   },
  //   {
  //     company: "Ernst Handel",
  //     contact: "Roland Mendel",
  //     country: "Austria",
  //   },
  //   {
  //     company: "Island Trading",
  //     contact: "Helen Bennett",
  //     country: "UK",
  //   },
  //   {
  //     company: "Königlich Essen",
  //     contact: "Philip Cramer",
  //     country: "Germany",
  //   },
  //   {
  //     company: "Laughing Bacchus Winecellars",
  //     contact: "Yoshi Tannamuri",
  //     country: "Canada",
  //   },
  //   {
  //     company: "Magazzini Alimentari Riuniti",
  //     contact: "Giovanni Rovelli",
  //     country: "Italy",
  //   },
  //   {
  //     company: "North/South",
  //     contact: "Simon Crowther",
  //     country: "UK",
  //   },
  //   {
  //     company: "Paris spécialités",
  //     contact: "Marie Bertrand",
  //     country: "France",
  //   },
  //   {
  //     company: "Ernst Handel",
  //     contact: "Roland Mendel",
  //     country: "Austria",
  //   },
  //   {
  //     company: "Island Trading",
  //     contact: "Helen Bennett",
  //     country: "UK",
  //   },
  //   {
  //     company: "Königlich Essen",
  //     contact: "Philip Cramer",
  //     country: "Germany",
  //   },
  //   {
  //     company: "Laughing Bacchus Winecellars",
  //     contact: "Yoshi Tannamuri",
  //     country: "Canada",
  //   },
  //   {
  //     company: "Magazzini Alimentari Riuniti",
  //     contact: "Giovanni Rovelli",
  //     country: "Italy",
  //   },
  //   {
  //     company: "North/South",
  //     contact: "Simon Crowther",
  //     country: "UK",
  //   },
  //   {
  //     company: "Paris spécialités",
  //     contact: "Marie Bertrand",
  //     country: "France",
  //   },
  //   {
  //     company: "Ernst Handel",
  //     contact: "Roland Mendel",
  //     country: "Austria",
  //   },
  //   {
  //     company: "Island Trading",
  //     contact: "Helen Bennett",
  //     country: "UK",
  //   },
  //   {
  //     company: "Königlich Essen",
  //     contact: "Philip Cramer",
  //     country: "Germany",
  //   },
  //   {
  //     company: "Laughing Bacchus Winecellars",
  //     contact: "Yoshi Tannamuri",
  //     country: "Canada",
  //   },
  //   {
  //     company: "Magazzini Alimentari Riuniti",
  //     contact: "Giovanni Rovelli",
  //     country: "Italy",
  //   },
  //   {
  //     company: "North/South",
  //     contact: "Simon Crowther",
  //     country: "UK",
  //   },
  //   {
  //     company: "Paris spécialités",
  //     contact: "Marie Bertrand",
  //     country: "France",
  //   },
  // ];
  return <GridTable data={testData} />;
};

export default Test;
