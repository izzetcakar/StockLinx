using System.Text;

namespace StockLinx.Core.Entities
{
    public static class FilterExpression
    {
        public static List<Filter> ParseFilterExpression(string filterExpression)
        {
            List<Filter> filters = new List<Filter>();

            if (string.IsNullOrEmpty(filterExpression)) return filters;

            var conditions = filterExpression.Split("and");

            foreach (var condition in conditions)
            {
                var parts = condition.Trim().Split(",");
                if (parts.Length != 3) continue;
                Filter filter = new Filter
                {
                    Operator = parts[0],
                    PropertyName = parts[1],
                    Value = parts[2]
                };
                filters.Add(filter);
            }
            return filters;
        }
        private static string UpperFirstLetter(string value)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return char.ToUpper(value[0]) + value.Substring(1);
        }
        public static string BuildQuery(Filter filter)
        {
            switch (filter.Operator)
            {
                case "contains":
                    return $" AND \"{UpperFirstLetter(filter.PropertyName)}\" LIKE '%{filter.Value}%'";
                case "equals":
                    return $" AND \"{UpperFirstLetter(filter.PropertyName)}\" = '{filter.Value}'";
                case "lessthan":
                    return $" AND \"{UpperFirstLetter(filter.PropertyName)}\" < '{filter.Value}'";
                case "greaterthan":
                    return $" AND \"{UpperFirstLetter(filter.PropertyName)}\" > '{filter.Value}'";
                case "lessthanorequal":
                    return $" AND \"{UpperFirstLetter(filter.PropertyName)}\" <= '{filter.Value}'";
                case "greaterthanorequal":
                    return $" AND \"{UpperFirstLetter(filter.PropertyName)}\" >= '{filter.Value}'";
                case "notequal":
                    return $" AND \"{UpperFirstLetter(filter.PropertyName)}\" != '{filter.Value}'";
                case "startswith":
                    return $" AND \"{UpperFirstLetter(filter.PropertyName)}\" LIKE '{filter.Value}%'";
                case "endswith":
                    return $" AND \"{UpperFirstLetter(filter.PropertyName)}\" LIKE '%{filter.Value}'";
                default:
                    return $" AND \"{UpperFirstLetter(filter.PropertyName)}\" LIKE '%{filter.Value}%'";
            }
        }
        public static string GetTableNameByClass(string className)
        {
            return className switch
            {
                "Accessory" => "Accessories",
                "Customer" => "Customers",
                "Asset" => "Assets",
                "Branch" => "Branches",
                "Category" => "Categories",
                "Company" => "Companies",
                "Component" => "Components",
                "Consumable" => "Consumables",
                "CustomField" => "CustomFields",
                "Department" => "Departments",
                "FieldSet" => "FieldSets",
                "FieldSetCustomField" => "FieldSetCustomFields",
                "License" => "Licenses",
                "Location" => "Locations",
                "Manufacturer" => "Manufacturers",
                "Model" => "Models",
                "ModelFieldData" => "ModelFieldDatas",
                "Permission" => "Permissions",
                "ProductStatus" => "ProductStatuses",
                "Supplier" => "Suppliers",
                "User" => "Users",
                "AssetProduct" => "AssetProducts",
                "UserProduct" => "UserProducts",
            };
        }
    }
}
