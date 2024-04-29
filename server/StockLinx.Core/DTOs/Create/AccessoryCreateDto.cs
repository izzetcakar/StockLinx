namespace StockLinx.Core.DTOs.Create
{
    public class AccessoryCreateDto : BaseProductCreateDto
    {
        public Guid? CategoryId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public string? ImagePath { get; set; }
        public string ModelNo { get; set; }
        public int Quantity { get; set; }
    }
}
