using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public class AssetTag : BaseEntity
    {
        public Guid AssetId { get; set; }
        public Asset Asset { get; set; }
        public int Tag { get; set; }
        public string Serial { get; set; }
    }
}
