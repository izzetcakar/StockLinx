namespace StockLinx.Core.Entities
{
    public class Generic
    {
        public static string AddHyphenIfNotEmpty(string input)
        {
            return !string.IsNullOrEmpty(input) ? $"{input} - " : "";
        }
    }
}
