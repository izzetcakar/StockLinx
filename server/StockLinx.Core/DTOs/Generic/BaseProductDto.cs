namespace StockLinx.Core.DTOs.Generic
{
    public abstract class BaseProductDto : BaseDto
    {
        public Guid? CategoryId { get; set; }
        public Guid? LocationId { get; set; }
        public Guid? CompanyId { get; set; }
        public Guid? Status { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? SerialNo { get; set; }
        public string? OrderNo { get; set; }
        public string? Notes { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
    }
}
