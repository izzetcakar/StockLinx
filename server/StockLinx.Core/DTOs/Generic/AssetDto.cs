namespace StockLinx.Core.DTOs.Generic
{
    public class AssetDto : BaseProductDto
    {
        public Guid? ModelId { get; set; }
        public string? ImagePath { get; set; }
        public string? TagNo { get; set; }
        public string? SerialNo { get; set; }
    }
}
