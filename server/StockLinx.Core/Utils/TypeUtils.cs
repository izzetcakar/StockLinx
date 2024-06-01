using System;
using System.Globalization;

namespace StockLinx.Core.Utils
{
    public static class TypeUtils
    {
        public static object ConvertValueToType(string value, Type targetType)
        {
            targetType = Nullable.GetUnderlyingType(targetType) ?? targetType;

            if (targetType == typeof(string))
            {
                return value;
            }
            else if (targetType.IsEnum)
            {
                return Enum.Parse(targetType, value, ignoreCase: true);
            }
            else if (targetType == typeof(Guid))
            {
                return Guid.Parse(value);
            }
            else if (targetType == typeof(bool))
            {
                return bool.Parse(value);
            }
            else if (targetType == typeof(byte))
            {
                return byte.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(sbyte))
            {
                return sbyte.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(short))
            {
                return short.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(ushort))
            {
                return ushort.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(int))
            {
                return int.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(uint))
            {
                return uint.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(long))
            {
                return long.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(ulong))
            {
                return ulong.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(float))
            {
                return float.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(double))
            {
                return double.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(decimal))
            {
                return decimal.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(DateTime))
            {
                return DateTime.Parse(value, CultureInfo.InvariantCulture);
            }
            else if (targetType == typeof(TimeSpan))
            {
                return TimeSpan.Parse(value);
            }
            else
            {
                throw new NotSupportedException($"Conversion to type {targetType.Name} is not supported.");
            }
        }
    }

}
