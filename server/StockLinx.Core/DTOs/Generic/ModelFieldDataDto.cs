namespace StockLinx.Core.DTOs.Generic
{
    public class ModelFieldDataDto : BaseDto
    {
        public Guid ModelId { get; set; }
        public Guid CustomFieldId { get; set; }
        public string Value { get; set; }
    }
}
