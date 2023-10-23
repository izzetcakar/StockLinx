namespace StockLinx.Core.DTOs.Create
{
    public class ModelCreateDto
    {
        public Guid BranchId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? ModelNo { get; set; }
        public string? Notes { get; set; }
    }
}
