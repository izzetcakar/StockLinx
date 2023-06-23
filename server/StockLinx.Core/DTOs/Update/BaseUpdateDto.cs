using System.ComponentModel.DataAnnotations;

namespace StockLinx.Core.DTOs.Update
{
    public abstract class BaseUpdateDto
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
    }
}
