using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Generic
{
    public class AssetDto : BaseProductDto
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? ModelId { get; set; }
        public string? TagNo { get; set; }
    }
}
