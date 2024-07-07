namespace StockLinx.Core.Entities
{
    public class Employee : BaseEntity
    {
        public Guid DepartmentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? JobTitle { get; set; }
        public string? PhoneNo { get; set; }
        public string? Notes { get; set; }
        public DateTime StartDate { get; init; }
        public DateTime? EndDate { get; set; }

        //Relates
        public Department Department { get; set; }
        public ICollection<EmployeeProduct>? EmployeeProducts { get; set; }
    }
}
