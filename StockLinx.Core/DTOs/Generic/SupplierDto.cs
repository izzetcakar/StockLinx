namespace StockLinx.Core.DTOs.Generic
{
    public class SupplierDto : BaseDto
    {
        public string Name { get; set; }
        public Guid? ImageId { get; set; }
        public Guid? LocationId { get; set; }
        public string? ContactName { get; set; }
        public string? Phone { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public string? Url { get; set; }
        public string? Notes { get; set; }
    }
}
