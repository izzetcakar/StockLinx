namespace StockLinx.Core.DTOs.Generic
{
    public abstract class BaseDto
    {
        public Guid Id { get; init; }
        public DateTime CreatedDate { get; init; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
    }
}
