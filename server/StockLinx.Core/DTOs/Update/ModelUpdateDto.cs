namespace StockLinx.Core.DTOs.Update
{
    public class ModelUpdateDto : BaseUpdateDto
    {
        public string Name { get; set; }
        public string? ModelNo { get; set; }
        public Guid? ManufacturerId { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? ImageId { get; set; }
        public string? Notes { get; set; }
    }
}
