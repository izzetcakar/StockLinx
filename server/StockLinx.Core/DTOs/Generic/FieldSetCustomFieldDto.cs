using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Generic
{
    public class FieldSetCustomFieldDto : BaseEntity
    {
        public Guid FieldSetId { get; set; }
        public Guid CustomFieldId { get; set; }
    }
}
