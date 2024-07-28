namespace StockLinx.Core.DTOs.Generic.Display
{
    public class EmployeeDisplayDto
    {
        public string? Company { get; set; }
        public string Department { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? JobTitle { get; set; }
        public string? PhoneNo { get; set; }
        public string? Notes { get; set; }
        public DateTime StartDate { get; init; }
        public DateTime? EndDate { get; set; }
    }
}
