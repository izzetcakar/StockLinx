namespace StockLinx.Core.Entities
{
    public class License : BaseProduct
    {
        public string? LicenseName { get; set; }
        public string? LicenseEmail { get; set; }
        public Guid? SupplierId { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? TerminationDate { get; set; }
        public bool? Maintained { get; set; }
        public bool? Reassignable { get; set; }
        public string ProductKey { get; set; }
        public Supplier? Supplier { get; set; }

        //Relates
        public ICollection<DeployedProduct> DeployedProducts { get; set; }
    }
}
