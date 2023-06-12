using StockLinx.Core.Entities;

namespace StockLinx.Core.Models
{
    public class User : BaseEntity
    {
        public Guid? ImageId { get; set; }
        public Guid? CompanyId { get; set; }
        public Guid? ManagerId { get; set; }
        public Guid? DepartmentId { get; set; }
        public Guid? LocationId { get; set; }
        public User? Manager { get; set; }
        public Image? Image { get; set; }
        public Company? Company { get; set; }
        public Department? Department { get; set; }
        public Location? Location { get; set; }  
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string? AdminLvl { get; set; }
        public string? Email { get; set; }
        public string? Language { get; set; }
        public string EmployeeNo { get; set; }
        public string? JobTitle { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? PhoneNo { get; set; }
        public string? Website { get; set; }
        public string? Notes { get; set; }
    }
}
