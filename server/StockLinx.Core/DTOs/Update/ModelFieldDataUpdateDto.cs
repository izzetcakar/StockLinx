namespace StockLinx.Core.DTOs.Update
{
    public class ModelFieldDataUpdateDto : BaseUpdateDto
    {
        public Guid ModelId { get; set; }
        public Guid CustomFieldId { get; set; }
        public string Value { get; set; }
    }
}
