namespace StockLinx.Core.Entities
{
    public class FieldSet : BaseEntity
    {
        public Guid ModelId { get; set; }
        public string Name { get; set; }

        //Relates
        public Model Model { get; set; }
        public ICollection<CustomField>? CustomFields { get; set; }
    }
}
