namespace StockLinx.Core.Entities
{
    public class ModelFieldData : BaseEntity
    {
        public Guid ModelId { get; set; }
        public Guid CustomFieldId { get; set; }
        public string Value { get; set; }

        // Relates
        public Model Model { get; set; }
        public CustomField CustomField { get; set; }
    }
}
