using System.ComponentModel.DataAnnotations;

namespace StockLinx.Core.Entities
{
    public record BaseRecord
    {
        [Key]
        public Guid Id { get; init; }
        public DateTime CreatedDate { get; init; } = DateTime.UtcNow;
    }
}
