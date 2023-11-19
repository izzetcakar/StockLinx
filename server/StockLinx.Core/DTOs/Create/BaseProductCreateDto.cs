namespace StockLinx.Core.DTOs.Create
{
    public class BaseProductCreateDto : BaseCreateDto
    {
        public Guid BranchId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? OrderNo { get; set; }
        public string? Notes { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
    }
}
