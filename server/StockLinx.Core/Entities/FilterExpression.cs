using LinqKit;
using StockLinx.Core.Utils;
using System.Linq.Expressions;

namespace StockLinx.Core.Entities
{
    public static class FilterExpression
    {
        private static List<string> appliedFilters = new List<string>();
        public static IQueryable<T> ApplyFilters<T>(this IQueryable<T> query, string filterExpression)
        {
            List<Filter> filters = ParseFilterExpression(filterExpression);
            var predicate = PredicateBuilder.New<T>(true);

            foreach (var filter in filters)
            {
                if (appliedFilters.Contains(filter.PropertyName))
                {
                    predicate = predicate.Or(UpdatePredicate<T>(filter, predicate));
                }
                else
                {
                    predicate = predicate.And(BuildPredicate<T>(filter));
                    appliedFilters.Add(filter.PropertyName);
                }
            }
            appliedFilters.Clear();
            return query.Where(predicate);
        }

        private static List<Filter> ParseFilterExpression(string filterExpression)
        {
            List<Filter> filters = new List<Filter>();

            if (string.IsNullOrEmpty(filterExpression))
                return filters;

            var conditions = filterExpression.Split("and");

            foreach (var condition in conditions)
            {
                var parts = condition.Trim().Split(",");
                if (parts.Length != 3)
                    continue;
                Filter filter = new Filter
                {
                    Operator = parts[0].ToLower(),
                    PropertyName = parts[1],
                    Value = parts[2]
                };
                filters.Add(filter);
            }
            return filters;
        }

        private static readonly Dictionary<string, Func<Expression, Expression, Expression>> OperatorMap = new Dictionary<string, Func<Expression, Expression, Expression>>
        {
            { "contains", (prop, val) => Expression.Call(prop, "Contains", null, val) },
            { "equals", (prop, val) => Expression.Equal(prop, val) },
            { "lessthan", (prop, val) => Expression.LessThan(prop, val) },
            { "greaterthan", (prop, val) => Expression.GreaterThan(prop, val) },
            { "lessthanorequal", (prop, val) => Expression.LessThanOrEqual(prop, val) },
            { "greaterthanorequal", (prop, val) => Expression.GreaterThanOrEqual(prop, val) },
            { "notequal", (prop, val) => Expression.NotEqual(prop, val) },
            { "startswith", (prop, val) => Expression.Call(prop, "StartsWith", null, val) },
            { "endswith", (prop, val) => Expression.Call(prop, "EndsWith", null, val) },
        };

        private static Expression<Func<T, bool>> BuildPredicate<T>(Filter filter)
        {
            var parameterExpr = Expression.Parameter(typeof(T), typeof(T).Name.ToLower());
            var propertyExpr = Expression.Property(parameterExpr, filter.PropertyName);
            var targetType = propertyExpr.Type;
            var convertedValue = TypeUtils.ConvertValueToType(filter.Value, targetType);
            var valueExpr = Expression.Constant(convertedValue, targetType);

            Func<Expression, Expression, Expression> conditionExprBuilder;

            if (!OperatorMap.TryGetValue(filter.Operator, out conditionExprBuilder))
            {
                conditionExprBuilder = OperatorMap["contains"];
            }

            var conditionExpr = conditionExprBuilder(propertyExpr, valueExpr);
            return Expression.Lambda<Func<T, bool>>(conditionExpr, parameterExpr);
        }

        private static Expression<Func<T, bool>> UpdatePredicate<T>(Filter filter, Expression<Func<T, bool>> predicate)
        {
            var parameterExpr = Expression.Parameter(typeof(T), typeof(T).Name.ToLower());
            var propertyExpr = Expression.Property(parameterExpr, filter.PropertyName);
            var targetType = propertyExpr.Type;
            var convertedValue = TypeUtils.ConvertValueToType(filter.Value, targetType);
            var valueExpr = Expression.Constant(convertedValue, targetType);

            Func<Expression, Expression, Expression> conditionExprBuilder;

            if (!OperatorMap.TryGetValue(filter.Operator, out conditionExprBuilder))
            {
                conditionExprBuilder = OperatorMap["contains"];
            }

            var conditionExpr = conditionExprBuilder(propertyExpr, valueExpr);
            var newPredicateBody = Expression.AndAlso(predicate.Body, conditionExpr);
            return Expression.Lambda<Func<T, bool>>(newPredicateBody, parameterExpr);
        }
    }
}
