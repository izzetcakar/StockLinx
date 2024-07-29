namespace StockLinx.Core.DTOs.Generic.Display
{
    public class SubmissionProductDto
    {
        public string Type { get; set; }
        public string Tag { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
    }
    public class SubmissionDto
    {
        public string User { get; set; }
        public string Company { get; set; }
        public string Department { get; set; }
        public string Employee { get; set; }
        public string EmployeeTitle { get; set; }
        public string EmployeeStartDate { get; set; }
        public List<SubmissionProductDto> Products { get; set; }
    }
}
