namespace StockLinx.Core.DTOs.Generic
{
    public abstract class BaseProductDto : BaseDto
    {
        public Guid CompanyId { get; set; }
        public Guid? SupplierId { get; set; }
        public string Tag { get; init; }
        public string Name { get; set; }
        public string? OrderNo { get; set; }
        public string? Notes { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public int? CheckinCounter { get; set; }
        public int? CheckoutCounter { get; set; }
    }
}
