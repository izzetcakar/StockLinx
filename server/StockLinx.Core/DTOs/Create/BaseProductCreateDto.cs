namespace StockLinx.Core.DTOs.Create
{
    public abstract class BaseProductCreateDto : BaseCreateDto
    {
        public Guid CompanyId { get; set; }
        public Guid? SupplierId { get; set; }
        public string Tag { get; init; }
        public string Name { get; set; }
        public string? OrderNo { get; set; }
        public string? Notes { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
    }
}
