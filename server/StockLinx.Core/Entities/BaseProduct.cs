namespace StockLinx.Core.Entities
{
    public abstract class BaseProduct : BaseEntity
    {
        public Guid? CategoryId { get; set; }
        public Guid? LocationId { get; set; }
        public Guid CompanyId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? SerialNo { get; set; }
        public string? OrderNo { get; set; }
        public string? Notes { get; set; }
        public int? CheckinCounter { get; set; }
        public int? CheckoutCounter { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public ProductStatus? ProductStatus { get; set; }
        public Category? Category { get; set; }
        public Location? Location { get; set; }
        public Company? Company { get; set; }
    }
}
