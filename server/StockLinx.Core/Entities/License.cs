namespace StockLinx.Core.Entities
{
    public class License : BaseProduct
    {
        public Guid? SupplierId { get; set; }
        public string Name { get; set; }
        public string LicenseKey { get; set; }
        public string? LicenseEmail { get; set; }
        public bool Maintained { get; set; }
        public bool Reassignable { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? TerminationDate { get; set; }
        public int Quantity { get; set; }
        public Supplier? Supplier { get; set; }

        //Relates
        public ICollection<DeployedProduct> DeployedProducts { get; set; }
    }
}
