namespace StockLinx.Core.DTOs.Generic
{
    public class UserDto : BaseDto
    {
        public Guid CompanyId { get; set; }
        public Guid DepartmentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? Language { get; set; }
        public string EmployeeNo { get; init; }
        public string? JobTitle { get; set; }
        public string? PhoneNo { get; set; }
        public string? Website { get; set; }
        public string? Notes { get; set; }
        public bool? IsAdmin { get; init; } = false;
        public DateTime StartDate { get; init; }
        public DateTime? EndDate { get; set; }
    }
}
