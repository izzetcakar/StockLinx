namespace StockLinx.Core.DTOs.Create
{
    public abstract class BaseCreateDto
    {
        public DateTime CreatedDate { get; init; } = DateTime.UtcNow;
    }
}
