namespace StockLinx.Core.DTOs.Generic
{
    public class UserProductDto : BaseDto
    {
        public Guid UserId { get; init; }
        public Guid ProductId { get; init; }
        public DateTime AssignDate { get; init; }
        public string ProductTag { get; init; }
        public string ProductType { get; init; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
    }
}
