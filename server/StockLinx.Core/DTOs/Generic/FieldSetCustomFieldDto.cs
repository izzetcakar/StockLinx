using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Generic
{
    public class FieldSetCustomFieldDto : BaseEntity
    {
        public int FieldSetId { get; set; }
        public int CustomFieldId { get; set; }
    }
}
