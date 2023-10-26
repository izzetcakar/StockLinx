export interface SuiteColumn {
  header: string;
  dataKey: string;
  render?: (data: any) => string | JSX.Element;
}
