namespace StockLinx.Core.DTOs.Create
{
    public class BaseProductCreateDto : BaseCreateDto
    {
        public Guid? CategoryId { get; set; }
        public Guid? LocationId { get; set; }
        public Guid? CompanyId { get; set; }
        public string Name { get; set; }
        public string? SerialNo { get; set; }
        public string? OrderNo { get; set; }
        public string? Notes { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
    }
}
