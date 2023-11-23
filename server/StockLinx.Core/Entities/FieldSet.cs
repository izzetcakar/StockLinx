namespace StockLinx.Core.Entities
{
    public class FieldSet : BaseEntity
    {
        public string Name { get; set; }
        //Relates
        public ICollection<Model>? Models { get; set; }
        public ICollection<FieldSetCustomField>? FieldSetCustomFields { get; set; }
    }
}
