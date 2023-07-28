using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Update
{
    public class AssetUpdateDto : BaseProductUpdateDto
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? ModelId { get; set; }
        public string? TagNo { get; set; }
    }
}
