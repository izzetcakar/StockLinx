using System.ComponentModel.DataAnnotations;

namespace StockLinx.Core.Entities
{
    public abstract class BaseEntity
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; init; } = Guid.NewGuid();
        public DateTime CreatedDate { get; init; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
    }
}
