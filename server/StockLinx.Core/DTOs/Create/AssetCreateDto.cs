namespace StockLinx.Core.DTOs.Create
{
    public class AssetCreateDto : BaseProductCreateDto
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? ModelId { get; set; }
        public string? TagNo { get; set; }
        public List<ExtraAssetDto>? ExtraAsset { get; set; }
    }
}
