namespace StockLinx.Core.Entities
{
    public abstract class BaseProduct : BaseEntity
    {
        public Guid BranchId { get; set; }
        public string Name { get; set; }
        public string? OrderNo { get; set; }
        public string? Notes { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public int? CheckinCounter { get; set; }
        public int? CheckoutCounter { get; set; }

        //Relates
        public Branch Branch { get; set; }
    }
}
