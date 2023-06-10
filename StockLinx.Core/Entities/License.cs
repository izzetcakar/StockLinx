using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public class License : BaseEntity
    {
        public Guid CategoryId { get; set; }
        public Guid CompanyId { get; set; }
        public Guid ManufacturerId { get; set; }
        public Guid SupplierId { get; set; }
        public Category Category { get; set; }
        public Company Company { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public Supplier Supplier { get; set; }
        public string Title { get; set; }
        public string ProductKey { get; set; }
        public int Seats { get; set; }
        public string LicensedToName { get; set; }
        public string LicensedToEmail { get; set; }
        public bool Reassignable { get; set; }
        public string OrderNumber { get; set; }
        public DateTime PurchaseDate { get; set; }
        public double PurchaseCost { get; set; }
        public DateTime ExpirationDate { get; set; }
        public DateTime TerminationDate { get; set; }
        public bool Maintained { get; set; }
        public string? Notes { get; set; }
    }
}
