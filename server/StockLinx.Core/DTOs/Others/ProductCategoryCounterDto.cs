namespace StockLinx.Core.DTOs.Others
{
    public class ProductCategoryCounterDto
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int AssetCount { get; set; }
        public int LicenseCount { get; set; }
        public int AccessoryCount { get; set; }
        public int ConsumableCount { get; set; }
        public int ComponentCount { get; set; }

    }
}
