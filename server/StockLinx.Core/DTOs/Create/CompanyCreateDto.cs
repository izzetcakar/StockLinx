namespace StockLinx.Core.DTOs.Create
{
    public class CompanyCreateDto : BaseCreateDto
    {
        public Guid? LocationId { get; set; }
        public string Tag { get; set; }
        public string Name { get; set; }
        public string? Email { get; set; }
    }
}
