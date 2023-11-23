namespace StockLinx.Core.DTOs.Update
{
    public class CustomFieldUpdateDto : BaseUpdateDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string? HelpText { get; set; }
        public string? DefaultValue { get; set; }
        public bool IsRequired { get; set; }
        public string? ValidationRegex { get; set; }
        public string? ValidationText { get; set; }
    }
}
