using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Create
{
    public class LicenseCreateDto : BaseProductCreateDto
    {
        public Guid? ManufacturerId { get; set; }
        public string Name { get; set; }
        public string LicenseKey { get; set; }
        public string? LicenseEmail { get; set; }
        public int Quantity { get; set; }
        public bool Maintained { get; set; }
        public bool Reassignable { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? TerminationDate { get; set; }
    }
}
