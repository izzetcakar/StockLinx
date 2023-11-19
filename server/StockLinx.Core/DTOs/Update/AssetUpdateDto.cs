namespace StockLinx.Core.DTOs.Update
{
    public class AssetUpdateDto : BaseProductUpdateDto
    {
        public Guid? ModelId { get; set; }
        public Guid ProductStatusId { get; set; }
        public string? TagNo { get; set; }
        public string? SerialNo { get; set; }
    }
}
