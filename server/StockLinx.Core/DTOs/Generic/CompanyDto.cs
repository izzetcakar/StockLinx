namespace StockLinx.Core.DTOs.Generic
{
    public class CompanyDto : BaseDto
    {
        public Guid? LocationId { get; set; }
        public string Tag { get; set; }
        public string Name { get; set; }
        public string? Email { get; set; }
    }
}
