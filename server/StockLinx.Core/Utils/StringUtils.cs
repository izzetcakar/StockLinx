namespace StockLinx.Core.Entities
{
    public class TextUtils
    {
        public static string AddHyphenIfNotEmpty(string input)
        {
            return !string.IsNullOrEmpty(input) ? $"{input} - " : "";
        }
    }
}
