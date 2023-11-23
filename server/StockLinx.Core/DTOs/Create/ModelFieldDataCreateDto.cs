namespace StockLinx.Core.DTOs.Create
{
    public class ModelFieldDataCreateDto : BaseCreateDto
    {
        public Guid ModelId { get; set; }
        public Guid CustomFieldId { get; set; }
        public string Value { get; set; }
    }
}
