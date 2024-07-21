namespace StockLinx.Core.DTOs.Generic
{
    public class CustomFieldDto : BaseDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public bool IsRequired { get; set; }
        public List<Guid> FieldSets { get; set; }
    }
}
