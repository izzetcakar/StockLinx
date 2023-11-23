namespace StockLinx.Core.DTOs.Update
{
    public class ModelUpdateDto : BaseUpdateDto
    {
        public Guid? ManufacturerId { get; set; }
        public Guid CategoryId { get; set; }
        public Guid? FieldSetId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? ModelNo { get; set; }
        public string? Notes { get; set; }
    }
}
