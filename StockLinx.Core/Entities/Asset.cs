using StockLinx.Core.Entities;

namespace StockLinx.Core.Models
{
    public class Asset : BaseEntity
    {
        public Guid ModelId { get; set; }
        public Guid? CompanyId { get; set; }
        public Guid? LocationId { get; set; }
        public Guid? ImageId { get; set; }
        public Guid? SupplierId { get; set; }
        public Model Model { get; set; }
        public Company? Company { get; set; }
        public Location? Location { get; set; }
        public Image? Image { get; set; }
        public Supplier? Supplier { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public int? WarrantyMonths { get; set; }
        public bool? Physical { get; set; }
        public DateTime? LastCheckout { get; set; }
        public DateTime? ExpectedCheckin { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public string SerialNo { get; set; }
        public double? PurchaseCost { get; set; }
        public string? Notes { get; set; }
        public DateTime? EolDate { get; set; }
    }
}
