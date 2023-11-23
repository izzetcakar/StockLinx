namespace StockLinx.Core.DTOs.Create
{
    public class FieldSetCreateDto : BaseCreateDto
    {
        public Guid ModelId { get; set; }
        public string Name { get; set; }
    }
}
