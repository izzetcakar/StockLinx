using System.ComponentModel.DataAnnotations;

namespace StockLinx.Core.DTOs.Update
{
    public abstract class BaseUpdateDto
    {
        [Key]
        public Guid Id { get; init; }
        public DateTime CreatedDate { get; init; }
        public DateTime? UpdatedDate { get; set; }
    }
}
