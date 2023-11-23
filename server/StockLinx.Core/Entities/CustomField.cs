﻿namespace StockLinx.Core.Entities
{
    public class CustomField : BaseEntity
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string? HelpText { get; set; }
        public string? DefaultValue { get; set; }
        public bool IsRequired { get; set; }
        public string? ValidationRegex { get; set; }
        public string? ValidationText { get; set; }

        //Relates
        public ICollection<FieldSetCustomField>? FieldSetCustomFields { get; set; }
        public ICollection<ModelFieldData>? ModelFieldData { get; set; }
    }
}