namespace StockLinx.Core.DTOs.Generic
{
    public class CompanyDto : BaseDto
    {
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
        public string? Email { get; set; }
        public string? ImagePath { get; set; }
        public int UserCount { get; set; }
        public int AssetCount { get; set; }
        public int LicenseCount { get; set; }
        public int AccessoryCount { get; set; }
        public int ConsumableCount { get; set; }
        public int ComponentCount { get; set; }
    }
}
