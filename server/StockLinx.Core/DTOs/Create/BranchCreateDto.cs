namespace StockLinx.Core.DTOs.Create
{
    public class BranchCreateDto : BaseCreateDto
    {
        public Guid CompanyId { get; set; }
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
    }
}
