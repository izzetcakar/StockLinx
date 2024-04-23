namespace StockLinx.Core.DTOs.Update
{
    public class AssetUpdateDto : BaseProductUpdateDto
    {
        public Guid? ModelId { get; set; }
        public string? ImagePath { get; set; }
        public string? TagNo { get; set; }
        public string? SerialNo { get; set; }
    }
}
