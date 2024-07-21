using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Create
{
    public class CustomFieldCreateDto : BaseCreateDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public bool IsRequired { get; set; }
        public List<Guid> FieldSets { get; set; }
    }
}
