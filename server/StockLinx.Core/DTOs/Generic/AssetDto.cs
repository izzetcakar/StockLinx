namespace StockLinx.Core.DTOs.Generic
{
    public class AssetDto : BaseProductDto
    {
        public Guid? ModelId { get; set; }
        public Guid ProductStatusId { get; set; }
        public string? ImagePath { get; set; }
        public string? SerialNo { get; set; }
        public int? CheckinCounter { get; set; }
        public int? CheckoutCounter { get; set; }
    }
}
