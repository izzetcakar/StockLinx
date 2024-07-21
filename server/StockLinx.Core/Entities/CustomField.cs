namespace StockLinx.Core.Entities
{
    public class CustomField : BaseEntity
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public bool IsRequired { get; set; }

        //Relates
        public ICollection<FieldSetCustomField>? FieldSetCustomFields { get; set; }
        public ICollection<ModelFieldData>? ModelFieldData { get; set; }
    }
}
