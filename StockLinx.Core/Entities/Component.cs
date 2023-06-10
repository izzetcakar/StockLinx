using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public class Component : BaseEntity
    {
        public Guid CategoryId { get; set; }
        public Guid? CompanyId { get; set; }
        public Guid? SupplierId { get; set; }
        public Guid LocationId { get; set; }
        public Guid ImageId { get; set; }
        public Category Category { get; set; }
        public Company? Company { get; set; }
        public Supplier? Supplier { get; set; }
        public Location Location { get; set; }
        public Image Image { get; set; }
        public string Name { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public string OrderNo { get; set; }
        public int Quantity { get; set; }
        public string Serial { get; set; }
        public string? Notes { get; set; }
    }
}
