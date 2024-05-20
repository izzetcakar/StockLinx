namespace StockLinx.Core.DTOs.Update
{
    public class UserUpdateDto : BaseUpdateDto
    {
        public Guid DepartmentId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Language { get; set; }
        public string EmployeeNo { get; init; }
        public string? JobTitle { get; set; }
        public string? PhoneNo { get; set; }
        public string? Website { get; set; }
        public string? Notes { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
