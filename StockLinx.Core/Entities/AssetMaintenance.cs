using StockLinx.Core.Entities;

namespace StockLinx.Core.Models
{
    public class AssetMaintenance : BaseEntity
    {
        public Guid AssetId { get; set; }
        public Guid SupplierId { get; set; }
        public Asset Asset { get; set; }
        public Supplier Supplier { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public bool IsWarranty { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime CompletionDate { get; set; }
        public string? Notes { get; set; }
        public double? Cost { get; set; }
    }
}
