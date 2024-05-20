namespace StockLinx.Core.DTOs.Create
{
    public class BranchCreateDto : BaseCreateDto
    {
        public Guid CompanyId { get; init; }
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
    }
}
