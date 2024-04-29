namespace StockLinx.Core.DTOs.Generic
{
    public class ComponentDto : BaseProductDto
    {
        public Guid? CategoryId { get; set; }
        public string? SerialNo { get; set; }
        public int Quantity { get; set; }
        public int AvailableQuantity { get; set; }
    }
}
