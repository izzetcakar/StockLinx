namespace StockLinx.Core.DTOs.Create
{
    public class ComponentCreateDto : BaseProductCreateDto
    {
        public Guid? CategoryId { get; set; }
        public Guid? SupplierId { get; set; }
        public string? SerialNo { get; set; }
        public int Quantity { get; set; }
    }
}
