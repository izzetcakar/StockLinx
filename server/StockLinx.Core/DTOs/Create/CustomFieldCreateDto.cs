using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Create
{
    public class CustomFieldCreateDto : BaseCreateDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string? HelpText { get; set; }
        public string? DefaultValue { get; set; }
        public bool IsRequired { get; set; }
        public string? ValidationRegex { get; set; }
        public string? ValidationText { get; set; }
        public IEnumerable<FieldSetCustomFieldDto> FieldSetCustomFields { get; set; }
    }
}
