namespace StockLinx.Core.DTOs.Create
{
    public class AssetCreateDto : BaseProductCreateDto
    {
        public Guid? ModelId { get; set; }
        public string? ImagePath { get; set; }
        public string? TagNo { get; set; }
        public string? SerialNo { get; set; }
        public List<OverageAssetDto>? OverageAssets { get; set; }
    }
}
