namespace StockLinx.Core.DTOs.Generic
{
    public class DepartmentDto : BaseDto
    {
        public Guid CompanyId { get; init; }
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
        public string? Notes { get; set; }
    }
}
