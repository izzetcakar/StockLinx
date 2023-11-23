namespace StockLinx.Core.Entities
{
    public class FieldSetCustomField : BaseEntity
    {
        public Guid FieldSetId { get; set; }
        public Guid CustomFieldId { get; set; }

        //Relates
        public FieldSet FieldSet { get; set; }
        public CustomField CustomField { get; set; }
    }

}
