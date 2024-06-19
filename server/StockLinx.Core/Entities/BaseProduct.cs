namespace StockLinx.Core.Entities
{
    public abstract class BaseProduct : BaseEntity
    {
        public Guid CompanyId { get; set; }
        public Guid? SupplierId { get; set; }
        public string Tag { get; init; }
        public string Name { get; set; }
        public string? OrderNo { get; set; }
        public string? Notes { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }

        //Relates
        public Company Company { get; set; }
        public Supplier? Supplier { get; set; }
    }
}
