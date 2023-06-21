using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Create
{
    public class LicenseCreateDto : BaseProductCreateDto
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
