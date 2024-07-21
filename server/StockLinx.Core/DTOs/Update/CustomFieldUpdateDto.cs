namespace StockLinx.Core.DTOs.Update
{
    public class CustomFieldUpdateDto : BaseUpdateDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public bool IsRequired { get; set; }
        public List<Guid> FieldSets { get; set; }
    }
}
