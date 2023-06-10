using StockLinx.Core.Entities;

namespace StockLinx.Core.Models
{
    public class Accessory : BaseEntity
    {
        public Guid CategoryId { get; set; }
        public Guid? CompanyId { get; set; }
        public Guid LocationId { get; set; }
        public Guid ManufacturerId { get; set; }
        public Guid SupplierId { get; set; }
        public Guid ImageId { get; set; }
        public Image Image { get; set; }
        public Supplier Supplier { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public Location Location { get; set; }
        public Company? Company { get; set; }
        public Category Category { get; set; }
        public string Name { get; set; }
        public string OrderNo { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public string ModelNo { get; set; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
