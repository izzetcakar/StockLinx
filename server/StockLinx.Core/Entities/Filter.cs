namespace StockLinx.Core.Entities
{
    public record Filter
    {
        public string PropertyName { get; init; }
        public string Operator { get; init; }
        public string Value { get; init; }
    }
}
