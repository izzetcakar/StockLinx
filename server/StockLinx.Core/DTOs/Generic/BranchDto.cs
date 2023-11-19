namespace StockLinx.Core.DTOs.Generic
{
    public class BranchDto : BaseDto
    {
        public Guid CompanyId { get; set; }
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
    }
}
