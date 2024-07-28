namespace StockLinx.Core.DTOs.Generic.Display
{
    public class AssetDisplayDto : BaseProductDisplayDto
    {
        public string? Model { get; set; }
        public string ProductStatus { get; set; }
        public string? SerialNo { get; set; }
    }
}
