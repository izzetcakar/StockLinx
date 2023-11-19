namespace StockLinx.Core.DTOs.Generic
{
    public class ModelDto : BaseDto
    {
        public Guid? ManufacturerId { get; set; }
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? ModelNo { get; set; }
        public string? Notes { get; set; }
    }
}
