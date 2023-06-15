namespace StockLinx.Core.DTOs.Generic
{
    public class LicenseDto : BaseProductDto
    {
        public string? LicenseName { get; set; }
        public string? LicenseEmail { get; set; }
        public Guid? SupplierId { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? TerminationDate { get; set; }
        public bool? Maintained { get; set; }
        public bool? Reassignable { get; set; }
        public string ProductKey { get; set; }
    }
}
