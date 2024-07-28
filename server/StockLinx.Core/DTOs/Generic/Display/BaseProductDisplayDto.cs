namespace StockLinx.Core.DTOs.Generic.Display
{
    public class BaseProductDisplayDto
    {
        public string Company { get; set; }
        public string? Supplier { get; set; }
        public string Tag { get; init; }
        public string Name { get; set; }
        public string? OrderNo { get; set; }
        public string? Notes { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
    }
}
