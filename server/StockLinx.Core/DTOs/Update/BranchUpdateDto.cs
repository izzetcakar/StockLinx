namespace StockLinx.Core.DTOs.Update
{
    public class BranchUpdateDto : BaseUpdateDto
    {
        public Guid CompanyId { get; set; }
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
    }
}
