namespace StockLinx.Core.DTOs.Create
{
    public abstract class BaseCreateDto
    {
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
