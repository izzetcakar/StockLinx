namespace StockLinx.Core.DTOs.Update
{
    public class FieldSetUpdateDto : BaseUpdateDto
    {
        public Guid ModelId { get; set; }
        public string Name { get; set; }
    }
}
