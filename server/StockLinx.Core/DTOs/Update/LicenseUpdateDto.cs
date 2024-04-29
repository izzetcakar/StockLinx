namespace StockLinx.Core.DTOs.Update
{
    public class LicenseUpdateDto : BaseProductUpdateDto
    {
        public Guid? CategoryId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public string Name { get; set; }
        public string LicenseKey { get; set; }
        public string? LicenseEmail { get; set; }
        public string? LicensedTo { get; set; }
        public bool Maintained { get; set; }
        public bool Reassignable { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? TerminationDate { get; set; }
        public int Quantity { get; set; }
    }
}
