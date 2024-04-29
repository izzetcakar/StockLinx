namespace StockLinx.Core.DTOs.Update
{
    public class ComponentUpdateDto : BaseProductUpdateDto
    {
        public Guid? CategoryId { get; set; }
        public string? SerialNo { get; set; }
        public int Quantity { get; set; }
    }
}
