namespace StockLinx.Core.DTOs.Generic
{
    public class DepartmentDto : BaseDto
    {
        public string Name { get; set; }
        public Guid? CompanyId { get; set; }
        public Guid? LocationId { get; set; }
        public Guid? ManagerId { get; set; }
        public Guid? ImageId { get; set; }
        public string? Notes { get; set; }
    }
}
