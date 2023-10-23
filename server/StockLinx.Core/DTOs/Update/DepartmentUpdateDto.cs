namespace StockLinx.Core.DTOs.Update
{
    public class DepartmentUpdateDto : BaseUpdateDto
    {
        public Guid BranchId { get; set; }
        public Guid? LocationId { get; set; }
        public Guid? ManagerId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? Notes { get; set; }
    }
}
