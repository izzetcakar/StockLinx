namespace StockLinx.Core.Entities
{
    public static class FilterExpression
    {
        public static Dictionary<string, string> ParseFilterExpression(string filterExpression)
        {
            var filters = new Dictionary<string, string>();

            if (string.IsNullOrEmpty(filterExpression)) return filters;

            var conditions = filterExpression.Split("and");

            foreach (var condition in conditions)
            {
                var parts = condition.Trim().Split(' ');

                if (parts.Length == 3)
                {
                    var propertyName = parts[0];
                    var filterOperator = parts[1];
                    var propertyValue = parts[2].Trim('\'');
                    filters.Add(propertyName, $"{filterOperator} {propertyValue}");
                }
            }

            return filters;
        }
    }
}
